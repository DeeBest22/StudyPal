/**
 * StudyPal TTS Proxy
 * ------------------
 * Single endpoint: POST /tts
 * - Submits the batch job to Aethex
 * - Polls until completed (server-side, no CORS)
 * - Downloads the S3 audio (server-side, no CORS)
 * - Streams the audio bytes back to the browser
 *
 * The browser never touches api.aethexai.com or S3 directly.
 *
 * Usage:   node tts-proxy.js
 * Requires Node.js 18+ (built-in fetch + streams). No npm install.
 */

import { createServer } from "http";

const AETHEX_KEY  = "ae_live_5a0dd3b03e288f87931d285a9db85aab";
const AETHEX_BASE = "https://api.aethexai.com/api/v1";
const PORT        = 3001;
const POLL_MAX    = 40;   // max seconds to wait for Aethex to finish
const POLL_MS     = 1000; // poll interval

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end",  () => resolve(data));
    req.on("error", reject);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Full TTS flow: submit → poll → download → stream ─────────────────────────
async function handleTts(req, res) {
  let body;
  try {
    body = JSON.parse(await readBody(req));
  } catch {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Invalid JSON body" }));
  }

  const { text, voice_id = "default" } = body;
  if (!text) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Missing 'text' field" }));
  }

  try {
    // 1. Submit batch job
    console.log(`[TTS] Submitting batch (voice=${voice_id}, chars=${text.length})`);
    const submitRes = await fetch(`${AETHEX_BASE}/tts/batch`, {
      method:  "POST",
      headers: { "X-API-Key": AETHEX_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        items:    [{ text: text.slice(0, 3000) }],
        language: "english",
        voice_id,
      }),
    });

    if (!submitRes.ok) {
      const msg = await submitRes.text();
      console.error(`[TTS] Submit failed ${submitRes.status}: ${msg}`);
      res.writeHead(submitRes.status, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: `Aethex submit failed (${submitRes.status})` }));
    }

    const { batch_id } = await submitRes.json();
    console.log(`[TTS] batch_id=${batch_id} — polling...`);

    // 2. Poll for completion
    let audioUrl = null;
    for (let i = 0; i < POLL_MAX; i++) {
      await sleep(POLL_MS);
      const pollRes = await fetch(`${AETHEX_BASE}/tts/batch/${batch_id}`, {
        headers: { "X-API-Key": AETHEX_KEY },
      });
      if (!pollRes.ok) throw new Error(`Poll failed (${pollRes.status})`);
      const pollData = await pollRes.json();

      if (pollData.status === "completed" && pollData.results?.[0]?.audio_url) {
        audioUrl = pollData.results[0].audio_url;
        console.log(`[TTS] Completed after ${i + 1}s`);
        break;
      }
      if (pollData.status === "failed") {
        throw new Error("Aethex synthesis failed: " + (pollData.results?.[0]?.error || "unknown"));
      }
    }

    if (!audioUrl) throw new Error("Timed out waiting for audio");

    // 3. Download audio from S3 (server-side — no CORS issue here)
    console.log(`[TTS] Downloading audio from S3...`);
    const audioRes = await fetch(audioUrl);
    if (!audioRes.ok) throw new Error(`S3 download failed (${audioRes.status})`);

    const contentType = audioRes.headers.get("Content-Type") || "audio/wav";
    const audioBuffer = await audioRes.arrayBuffer();
    console.log(`[TTS] Streaming ${audioBuffer.byteLength} bytes (${contentType}) to browser`);

    // 4. Stream audio bytes back to the browser
    res.writeHead(200, {
      "Content-Type":   contentType,
      "Content-Length": audioBuffer.byteLength,
    });
    res.end(Buffer.from(audioBuffer));

  } catch (err) {
    console.error("[TTS] Error:", err.message);
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────
const server = createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === "POST" && url.pathname === "/tts") {
    return handleTts(req, res);
  }

  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`\n✅  StudyPal TTS Proxy  →  http://localhost:${PORT}`);
  console.log(`   POST /tts  { text, voice_id }  →  streams audio/wav\n`);
});