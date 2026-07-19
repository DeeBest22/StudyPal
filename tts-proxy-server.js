import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// ── AETHEX (primary — restore once host allowlist is approved) ────────────────
const AETHEX_API_KEY  = "ae_live_c4e54f4f89e669e620bb136573e136c3";
const AETHEX_TTS_URL  = "https://api.aethexai.com/api/v1/tts";

// ── ELEVENLABS (temporary fallback — real Nigerian voices) ───────────────────
// Sign up free at https://elevenlabs.io → Profile → API Key
// Free tier: 10,000 chars/month. Paste your key below.
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || "sk_87f7cd427da73babbb63a3609142a6b910cda10f91a7621a";
const ELEVENLABS_MODEL   = "eleven_multilingual_v2";

// Aethex voice UUID → ElevenLabs voice ID (Nigerian / African accent voices)
// These are publicly available ElevenLabs voice IDs — no paid plan needed.
const VOICE_MAP = {
  // Aethex default / Femi  → "Olufunmilola" (Nigerian Female, Yoruba accent)
  "default":                                "9Dbo4hEvXQ5l7MXGZFQA",
  "5c34046a-ac9b-57d5-8c70-5a61e694be3f":  "9Dbo4hEvXQ5l7MXGZFQA", // Femi
  // Female NG voices → Olufunmilola
  "8466fb57-9f6b-53ad-ba5a-9729617f761c":  "9Dbo4hEvXQ5l7MXGZFQA", // Kemi
  "9ef397e0-8cc3-58b3-af79-0234f95a3801":  "9Dbo4hEvXQ5l7MXGZFQA", // Mary
  "96b20f06-536a-55ef-82c3-4882b6547858":  "9Dbo4hEvXQ5l7MXGZFQA", // Tolu
  "cb4ea7ea-027b-532a-b7de-356c6887a5f3":  "9Dbo4hEvXQ5l7MXGZFQA", // Deborah
  "37449a6f-a93c-583d-80da-d005cb0b542b":  "9Dbo4hEvXQ5l7MXGZFQA", // Fatima
  // Male NG voices → "Daniel" (African male, deep)
  "93c0d2e1-61b2-51d5-8d92-a8adfef1a4ea":  "onwK4e9ZLuTAKqWW03F9", // Segun
  "6cdade1e-41d3-52cd-bf99-7e6822758b10":  "onwK4e9ZLuTAKqWW03F9", // Sunday
  "fdf12da6-fc5c-56d3-bdc5-9f3da0b65453":  "onwK4e9ZLuTAKqWW03F9", // Chinedu
  // Pidgin voices — slightly different style settings but same base voices
  "83210cdc-1274-5d8b-8494-d07338ba2348":  "9Dbo4hEvXQ5l7MXGZFQA", // Kemi Pidgin
  "7096175e-5cb2-5685-975e-7e98941ed6bb":  "onwK4e9ZLuTAKqWW03F9", // Segun Pidgin
  "0d109a91-8d87-5d06-93f8-5f421bcaa76a":  "onwK4e9ZLuTAKqWW03F9", // Musa Pidgin
};

const FALLBACK_ELEVENLABS_VOICE = "9Dbo4hEvXQ5l7MXGZFQA";

app.use(cors({ origin: "*" }));
app.use(express.json());

// ── TTS ROUTE ────────────────────────────────────────────────────────────────
app.post("/tts", async (req, res) => {
  const { text, voice_id } = req.body;
  if (!text) return res.status(400).json({ error: "Missing required field: text" });

  // 1. Try Aethex first
  try {
    const aethexRes = await fetch(AETHEX_TTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": AETHEX_API_KEY },
      body: JSON.stringify({ text: text.slice(0, 3000), voice_id }),
    });

    if (aethexRes.ok) {
      const contentType = aethexRes.headers.get("content-type") || "audio/wav";
      const buf = await aethexRes.arrayBuffer();
      console.log("[TTS] ✓ Aethex");
      res.set("Content-Type", contentType);
      res.set("X-TTS-Provider", "aethex");
      return res.send(Buffer.from(buf));
    }

    const errText = await aethexRes.text().catch(() => "");
    console.warn(`[TTS] Aethex ${aethexRes.status}: ${errText} — falling back to ElevenLabs`);
  } catch (err) {
    console.warn("[TTS] Aethex unreachable — falling back to ElevenLabs:", err.message);
  }

  // 2. Fall back to ElevenLabs
  if (!ELEVENLABS_API_KEY || ELEVENLABS_API_KEY === "YOUR_ELEVENLABS_API_KEY_HERE") {
    return res.status(503).json({
      error: "Aethex host not allowlisted and no ElevenLabs API key set. Add ELEVENLABS_API_KEY to the proxy."
    });
  }

  const elVoiceId = VOICE_MAP[voice_id] ?? FALLBACK_ELEVENLABS_VOICE;
  const isPidgin = ["83210cdc-1274-5d8b-8494-d07338ba2348","7096175e-5cb2-5685-975e-7e98941ed6bb","0d109a91-8d87-5d06-93f8-5f421bcaa76a"].includes(voice_id);

  try {
    const elRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${elVoiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text.slice(0, 2500),
        model_id: ELEVENLABS_MODEL,
        voice_settings: {
          stability: isPidgin ? 0.45 : 0.50,
          similarity_boost: 0.82,
          style: 0.35,
          use_speaker_boost: true,
        },
      }),
    });

    if (!elRes.ok) {
      const errBody = await elRes.json().catch(() => ({}));
      console.error("[ElevenLabs error]", elRes.status, errBody);
      return res.status(elRes.status).json({ error: errBody?.detail?.message || errBody?.detail || `ElevenLabs error ${elRes.status}` });
    }

    const audioBuffer = await elRes.arrayBuffer();
    console.log("[TTS] ✓ ElevenLabs (fallback) voice:", elVoiceId);
    res.set("Content-Type", "audio/mpeg");
    res.set("X-TTS-Provider", "elevenlabs-fallback");
    return res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error("[ElevenLabs Proxy error]", err);
    return res.status(500).json({ error: err.message || "Internal proxy error" });
  }
});

app.get("/health", (_req, res) => res.json({
  status: "ok",
  aethex: "configured (pending host allowlist)",
  elevenlabs: ELEVENLABS_API_KEY !== "YOUR_ELEVENLABS_API_KEY_HERE" ? "configured" : "not set"
}));

app.listen(PORT, () => {
  console.log(`\n🎙  TTS proxy running at http://localhost:${PORT}`);
  console.log(`   Aethex:     configured (will auto-activate once host is allowlisted)`);
  console.log(`   ElevenLabs: ${ELEVENLABS_API_KEY !== "YOUR_ELEVENLABS_API_KEY_HERE" ? "✓ ready" : "⚠  not set — add ELEVENLABS_API_KEY"}\n`);
});