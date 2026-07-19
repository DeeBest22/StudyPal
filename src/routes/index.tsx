import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Code2, Palette, Bot, Smartphone, Layers, Database, Sparkles, Users, Zap, Rocket, Megaphone, MessageCircle, Trophy, Heart, Github, Twitter, Mail, Boxes, Shield, Globe2, TrendingUp, LineChart, Wallet, Mic, Languages, CheckCircle2 } from "lucide-react";
import nftCapybag from "@/assets/nft-capybag.jpg";
import nftSkydiver from "@/assets/nft-skydiver.jpg";
import nftStation from "@/assets/nft-station.jpg";
import nftPlanets from "@/assets/nft-planets.jpg";
import discordGoldfish from "@/assets/discord-goldfish.jpeg";
import discordFabric from "@/assets/discord-fabric.jpeg";
import discordZama from "@/assets/discord-zama.jpeg";
import trade3 from "@/assets/trade3.jpeg";
import tradingEth1 from "@/assets/trade1.jpeg";
import tradingEth2 from "@/assets/trade9.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
});

const NFTS = [
  { url: nftCapybag, title: "$CAPYBAG / 001", chain: "ETH · ERC-721" },
  { url: nftSkydiver, title: "AIRDROP / 002", chain: "SOL · METAPLEX" },
  { url: nftStation, title: "APEX STATION / 003", chain: "BASE · ERC-721" },
  { url: nftPlanets, title: "ORBITALS / 004", chain: "ETH · ERC-1155" },
];

const DISCORDS = [
  { img: discordZama, name: "Zama Protocol", members: "232,412", note: "Recognized contributor across announcements and community channels." },
  { img: discordFabric, name: "Fabric", members: "290,337", note: "Active in quests, leaderboards and core community lanes." },
  { img: discordGoldfish, name: "Goldfish", members: "53,963", note: "Event and on-chain leaderboard participation, day one engagement." },
];

const DAOS = ["Zama Protocol", "Fabric Cryptography", "Goldfish", "Capybag", "OpenMind", "Base Builders", "Solana Collective", "Re Network"];

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "ES", label: "Español" },
  { code: "DE", label: "Deutsch" },
  { code: "PT", label: "Português" },
  { code: "RU", label: "Русский" },
  { code: "JA", label: "日本語" },
  { code: "KO", label: "한국어" },
  { code: "ZH", label: "中文" },
  { code: "AR", label: "العربية" },
  { code: "TR", label: "Türkçe" },
  { code: "HI", label: "हिन्दी" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <TickerBar />
      <Nav />
      <Hero />
      <Belief />
      <Builders />
      <NFTGallery />
      <Capabilities />
      <DiscordProof />
      <DAOs />
      <Trading />
      <Spaces />
      <Velocity />
      <LanguagesSection />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}

function TickerBar() {
  const items = ["TEAM APEX // WEB3 STUDIO", "EST. 2024", "SHIPPING ON-CHAIN", "TWO BUILDERS, ONE STACK", "AVAILABLE FOR Q3", "★", "12 LANGUAGES SUPPORTED", "10K+ TRADED 60 DAYS"];
  return (
    <div className="border-b border-border bg-ink overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="px-6 flex items-center gap-6">
            {t} <span className="text-primary">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between backdrop-blur-md bg-background/85 border-b border-border">
      <a href="#" className="flex items-center gap-3 font-display font-bold text-lg tracking-tight">
        <div className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center font-mono text-sm font-bold">A</div>
        TEAM APEX
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-widest">
        <a href="#builders" className="hover:text-primary transition-colors">Crew</a>
        <a href="#work" className="hover:text-primary transition-colors">Work</a>
        <a href="#proof" className="hover:text-primary transition-colors">Proof</a>
        <a href="#services" className="hover:text-primary transition-colors">Services</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </div>
      <a href="#contact" className="text-xs font-mono uppercase tracking-widest px-4 py-2.5 bg-primary text-primary-foreground hover:bg-foreground transition-colors font-semibold">
        Hire Apex →
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative px-6 md:px-10 pt-20 pb-24 border-b border-border grid-lines">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-2 w-2 bg-primary animate-blink" />
          <span>[ ONLINE ]</span>
          <span className="text-border">/</span>
          <span>WEB3 · BLOCKCHAIN · COMMUNITY</span>
        </div>

        <h1 className="font-display font-semibold text-[clamp(2.75rem,9vw,9rem)] leading-[0.88] tracking-[-0.045em] mb-10">
          BUILD ON-CHAIN.
          <br />
          <span className="text-primary">SHIP THE</span> CULTURE.
        </h1>

        <div className="grid md:grid-cols-12 gap-8 items-end">
          <p className="md:col-span-7 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            <span className="text-foreground">Team Apex</span> is a two-builder Web3 studio. We write the smart contracts, design the dApp, mint the art, and run the Discord. One team. End to end execution. No agencies, no bloat, just shipped product and a loud, alive community.
          </p>
          <div className="md:col-span-5 flex flex-col gap-4 md:items-end">
            <a href="#contact" className="group inline-flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest font-bold hover:bg-foreground transition-colors">
              Start a project
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
            </a>
            <a href="#builders" className="inline-flex items-center gap-3 px-6 py-4 border border-border font-mono text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-colors">
              Meet the crew
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-border">
          {[
            { k: "02", v: "Builders" },
            { k: "48H", v: "To launch" },
            { k: "10×", v: "Community lift" },
            { k: "24/7", v: "On-chain ops" },
          ].map((s, i) => (
            <div key={s.v} className={`py-8 px-2 ${i > 0 ? "md:border-l border-border" : ""} ${i === 1 ? "border-l border-border md:border-l" : ""}`}>
              <div className="font-display font-semibold text-5xl md:text-6xl text-primary">{s.k}</div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-3">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Belief() {
  const pillars = [
    { num: "01", tag: "Attention", title: "Turn attention into", accent: "community." },
    { num: "02", tag: "Hype", title: "Turn hype into", accent: "loyalty." },
    { num: "03", tag: "Followers", title: "Turn followers into", accent: "believers." },
  ];
  return (
    <section className="border-b border-border">
      <div className="px-6 md:px-10 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">/ Philosophy</div>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] max-w-4xl mb-16">
          Web3 projects don't just need visibility. They need <span className="text-primary">energy, momentum, and belief.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {pillars.map((p) => (
            <div key={p.num} className="bg-background p-8 md:p-10 border-l-4 border-primary">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-6">{p.num}. {p.tag}</div>
              <div className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight">
                {p.title} <span className="text-primary">{p.accent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NFTGallery() {
  return (
    <section id="work" className="border-b border-border">
      <div className="px-6 md:px-10 py-8 border-b border-border flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">/ 02. Selected mints</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">NFT & Art Direction</h2>
        </div>
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Hand-drawn · 1/1 · IPFS pinned</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {NFTS.map((n, i) => (
          <a key={n.title} href="#" className={`group relative block aspect-square overflow-hidden border-border ${i < NFTS.length - 1 ? "border-b sm:border-b lg:border-b-0 lg:border-r" : ""} ${i === 0 || i === 2 ? "sm:border-r" : ""} ${i < 2 ? "sm:border-b lg:border-b-0" : ""} bg-ink`}>
            <img src={n.url} alt={n.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors" />
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between font-mono text-[10px] uppercase tracking-widest text-foreground/90">
              <span className="bg-background/70 backdrop-blur px-2 py-1 border border-border">#{String(i + 1).padStart(3, "0")}</span>
              <span className="bg-background/70 backdrop-blur px-2 py-1 border border-border">{n.chain}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/85 backdrop-blur border-t border-border flex items-center justify-between">
              <div>
                <div className="font-display text-sm font-semibold">{n.title}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">View artifact</div>
              </div>
              <ArrowUpRight className="h-4 w-4 group-hover:text-primary group-hover:rotate-45 transition-all" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Builders() {
  return (
    <section id="builders" className="border-b border-border">
      <div className="px-6 md:px-10 py-8 border-b border-border">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">/ 01. The crew</div>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">Two builders. Full stack.</h2>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <BuilderCard
          handle="0xKODED.eth"
          role="Dev · Designer · CM · Host"
          bio="I work as both a Web3 Developer and Designer, and as a Community Manager. Instead of hiring multiple people, you work with me directly — I ship the app, host the Spaces, and run the chat."
          skills={[
            { icon: Smartphone, label: "dApp Development" },
            { icon: Palette, label: "Web3 UI/UX" },
            { icon: Mic, label: "X Spaces Host" },
            { icon: Bot, label: "Discord / TG Bots" },
          ]}
        />
        <BuilderCard
          handle="Engr996.sol"
          role="Full-Stack · Mobile · Web3"
          bio="I'm a versatile technologist specializing in web, mobile (React Native), and Web3. I build scalable applications, responsive sites, and engaging on-chain experiences end to end."
          skills={[
            { icon: Smartphone, label: "React Native" },
            { icon: Layers, label: "Full-Stack" },
            { icon: Database, label: "APIs & Indexers" },
            { icon: Sparkles, label: "Product Thinking" },
          ]}
        />
      </div>
    </section>
  );
}

function BuilderCard({ handle, role, bio, skills }: { handle: string; role: string; bio: string; skills: { icon: typeof Code2; label: string }[] }) {
  return (
    <div className="p-8 md:p-12 hover:bg-ink transition-colors">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary mb-6">
        <span className="h-1.5 w-1.5 bg-primary" /> Active node
      </div>
      <div className="font-display text-3xl md:text-5xl font-semibold mb-2 tracking-tight">{handle}</div>
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">{role}</div>
      <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">{bio}</p>
      <div className="grid grid-cols-2 gap-px bg-border border border-border">
        {skills.map((s) => (
          <div key={s.label} className="bg-background p-4 flex items-center gap-3">
            <s.icon className="h-4 w-4 text-primary shrink-0" />
            <span className="text-sm font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Capabilities() {
  return (
    <section id="services" className="border-b border-border">
      <div className="px-6 md:px-10 py-8 border-b border-border">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">/ 03. Capabilities</div>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">Technical depth. Community heat.</h2>
      </div>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <ServiceList
          tag="A"
          icon={Code2}
          title="Engineering & Design"
          items={[
            "Smart contracts (Solidity / Anchor)",
            "dApp frontends with React, Wagmi, Viem",
            "Mobile apps with React Native",
            "Full-stack systems, APIs, indexers",
            "NFT art, brand identity, motion",
            "Custom Discord and Telegram bots",
          ]}
        />
        <ServiceList
          tag="B"
          icon={Users}
          title="Community & Growth"
          items={[
            "Early engagement and chat alive from day one",
            "Events, art and meme contests",
            "Culture tuned to your project's vibe",
            "Real-time moderation, 24/7 coverage",
            "Member feedback looped to founders",
            "Influencer and partnership coordination",
          ]}
        />
      </div>
    </section>
  );
}

function ServiceList({ tag, icon: Icon, title, items }: { tag: string; icon: typeof Code2; title: string; items: string[] }) {
  return (
    <div className="p-8 md:p-12">
      <div className="flex items-start justify-between mb-10">
        <div className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">/ {tag}</span>
      </div>
      <h3 className="font-display text-2xl md:text-3xl font-semibold mb-8 tracking-tight">{title}</h3>
      <ul className="space-y-0 border-t border-border">
        {items.map((i, idx) => (
          <li key={i} className="flex items-start gap-4 py-4 border-b border-border group hover:text-foreground transition-colors">
            <span className="font-mono text-xs text-muted-foreground mt-1 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
            <span className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DiscordProof() {
  return (
    <section id="proof" className="border-b border-border">
      <div className="px-6 md:px-10 py-8 border-b border-border flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">/ 04. Discovered & recognized</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">Noticed among thousands.</h2>
        </div>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">A selection of large Web3 Discord servers where I've been actively contributing and recognized by founders, mods and members.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {DISCORDS.map((d, i) => (
          <div key={d.name} className={`p-6 md:p-8 bg-background hover:bg-ink transition-colors ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "sm:border-l-0 lg:border-l" : ""}`}>
            <div className="aspect-[9/16] max-h-[520px] overflow-hidden border border-border bg-ink mb-5">
              <img src={d.img} alt={`${d.name} Discord server`} loading="lazy" className="h-full w-full object-cover object-top" />
            </div>
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="font-display text-xl font-semibold tracking-tight">{d.name}</h3>
              <span className="font-mono text-xs text-primary">{d.members}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{d.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DAOs() {
  return (
    <section className="border-b border-border">
      <div className="px-6 md:px-10 py-8 border-b border-border">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">/ 05. DAOs participated in</div>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">Governance, contribution, presence.</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border-t border-border">
        {DAOS.map((d) => (
          <div key={d} className="bg-background p-6 md:p-8 flex items-center gap-3 hover:bg-ink transition-colors">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            <span className="font-display text-base md:text-lg font-semibold tracking-tight">{d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Trading() {
  return (
    <section className="border-b border-border">
      <div className="px-6 md:px-10 py-8 border-b border-border">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">/ 06. Cryptocurrency · On-chain trading</div>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">$10,000+ traded across multiple assets in 60 days.</h2>
      </div>
      <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-border">
        <div className="lg:col-span-3 p-8 md:p-12">
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
            Over the last two months I've actively traded more than ten thousand dollars across SOL, ETH, BTC, USDC, USDT, SPL tokens and ecosystem assets. I don't just talk about Web3 — I operate inside it daily. Below are verified on-chain activity snapshots pulled directly from wallet history across Solana and Ethereum.
          </p>
          <div className="grid sm:grid-cols-3 gap-px bg-border border border-border">
            {[
              { icon: Wallet, k: "$10K+", v: "Volume / 60 days" },
              { icon: TrendingUp, k: "20+", v: "Token positions" },
              { icon: LineChart, k: "BTC · ETH · SOL · USDC · USDT", v: "Assets traded" },
            ].map((s) => (
              <div key={s.v} className="bg-background p-6">
                <s.icon className="h-5 w-5 text-primary mb-4" />
                <div className="font-display text-2xl font-semibold text-primary">{s.k}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 p-6 md:p-8 bg-ink">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Recent on-chain activity</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
            <figure className="border border-border bg-background overflow-hidden">
              <img src={trade3} alt="Solana wallet recent activity" loading="lazy" className="w-full h-auto object-contain" />
              <figcaption className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground px-3 py-2 border-t border-border">Solana · SOL & SPL swaps</figcaption>
            </figure>
            <figure className="border border-border bg-background overflow-hidden">
              <img src={tradingEth1} alt="Ethereum wallet history — USDC and USDT" loading="lazy" className="w-full h-auto object-contain" />
              <figcaption className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground px-3 py-2 border-t border-border">Ethereum · USDC / USDT</figcaption>
            </figure>
            <figure className="border border-border bg-background overflow-hidden">
              <img src={tradingEth2} alt="Ethereum wallet history — ETH and stablecoins" loading="lazy" className="w-full h-auto object-contain" />
              <figcaption className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground px-3 py-2 border-t border-border">Ethereum · ETH & stables</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spaces() {
  return (
    <section className="border-b border-border">
      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
        <div className="p-8 md:p-12 lg:p-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">/ 07. Spaces hosting</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">
            I host <span className="text-primary">X Spaces</span> for your project.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl">
            Weekly AMAs, launch day Spaces, partner sit-downs and ecosystem panels. I set the agenda, bring guests, moderate the room, and turn conversation into measurable awareness and follower growth.
          </p>
          <ul className="space-y-3">
            {[
              "Launch day Spaces with founders and core team",
              "Weekly recurring community Spaces and AMAs",
              "Cross-project panels and ecosystem sit-downs",
              "Recap threads, clips and quote tweets after every session",
            ].map((i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 md:p-12 lg:p-16 bg-ink flex flex-col justify-center">
          <Mic className="h-10 w-10 text-primary mb-8" />
          <div className="grid grid-cols-2 gap-px bg-border border border-border">
            {[
              { k: "50+", v: "Spaces hosted" },
              { k: "5K+", v: "Avg listeners" },
              { k: "60 min", v: "Typical length" },
              { k: "Live", v: "Recap delivered" },
            ].map((s) => (
              <div key={s.v} className="bg-background p-6">
                <div className="font-display text-3xl font-semibold text-primary">{s.k}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Velocity() {
  const items = [
    { icon: Zap, title: "48H Launch Sprint", desc: "Zero to active community in under 48 hours. Structured onboarding, immediate engagement loops, day one moderation." },
    { icon: Rocket, title: "Viral Awareness", desc: "Meme culture, KOL coordination and targeted campaigns that put your project on the timeline fast." },
    { icon: Globe2, title: "Rapid Scale", desc: "Whitelist mechanics, referral loops and gamified onboarding that multiply member count without churn." },
    { icon: Megaphone, title: "Always-On Hype", desc: "Daily content drops, real-time event reactions and sustained visibility so the project never goes quiet." },
  ];
  return (
    <section className="border-b border-border">
      <div className="px-6 md:px-10 py-8 border-b border-border flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">/ 08. Velocity</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">We move fast. Communities grow faster.</h2>
        </div>
        <p className="text-muted-foreground max-w-md">From launch day to sustained hype, we bring the right people in, keep them engaged, and turn noise into momentum.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {items.map((it, i) => (
          <div key={it.title} className={`p-8 hover:bg-ink transition-colors ${i >= 2 ? "sm:border-t lg:border-t-0" : ""}`}>
            <div className="flex items-center justify-between mb-8">
              <it.icon className="h-6 w-6 text-primary" />
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3 tracking-tight">{it.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-t border-border bg-ink">
        {[
          { k: "48H", v: "To first 1,000 holders" },
          { k: "10×", v: "Engagement rate uplift" },
          { k: "24/7", v: "Moderation & content" },
        ].map((s) => (
          <div key={s.v} className="p-10 text-center">
            <div className="font-display text-5xl md:text-6xl font-semibold text-primary mb-2">{s.k}</div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LanguagesSection() {
  return (
    <section className="border-b border-border">
      <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
        <div className="lg:col-span-5 p-8 md:p-12 lg:p-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">/ 09. Global reach</div>
          <Languages className="h-10 w-10 text-primary mb-6" />
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">
            Your community, <span className="text-primary">in every language.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We operate across global communities through a vetted translation workflow. Announcements, AMAs and support are delivered in the languages your members actually speak, with French, Spanish, Mandarin, Arabic and more handled end to end. Borders are not a barrier to growth.
          </p>
        </div>
        <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 bg-ink">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-px bg-border border border-border">
            {LANGUAGES.map((l) => (
              <div key={l.code} className="bg-background p-5 hover:bg-ink transition-colors">
                <div className="font-mono text-xs text-primary mb-2">{l.code}</div>
                <div className="font-display text-sm font-semibold">{l.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { icon: MessageCircle, t: "Early Engagement", d: "Organic conversations, day one energy, chat that does not die." },
    { icon: Trophy, t: "Events & Competitions", d: "Art contests, meme wars, hosted AMAs. Fresh ideas every week." },
    { icon: Heart, t: "Culture & Feedback", d: "A welcoming vibe tuned to your project, with member feedback looped back to you." },
    { icon: Shield, t: "Mod & Safety", d: "Scam filtering, raid response and trusted role infrastructure." },
    { icon: Boxes, t: "Brand & Art", d: "Cover art, profile sets, OG assets. A complete visual system." },
    { icon: Bot, t: "Automation", d: "Custom bots, gated roles, on-chain verification, leaderboards." },
  ];
  return (
    <section className="border-b border-border">
      <div className="px-6 md:px-10 py-8 border-b border-border">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">/ 10. How we run a community</div>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">The Apex playbook</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {steps.map((s, i) => (
          <div key={s.t} className={`p-8 hover:bg-ink transition-colors ${i >= 2 ? "sm:border-t" : ""} ${i >= 3 ? "lg:border-t" : ""} ${i === 2 ? "sm:border-l-0 lg:border-l" : ""}`}>
            <div className="flex items-baseline justify-between mb-6">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="font-mono text-xs text-muted-foreground">PLAY · 0{i + 1}</span>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2 tracking-tight">{s.t}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-b border-border relative overflow-hidden">
      <div className="px-6 md:px-10 py-20 md:py-32 max-w-7xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">/ 11. Let's build</div>
        <h2 className="font-display text-5xl md:text-8xl font-semibold tracking-[-0.045em] leading-[0.9] mb-10 max-w-5xl">
          One team. End to end <span className="text-primary">execution</span>.
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          From the first line of Solidity to the loudest community moment, Team Apex covers it. Tell us about your project.
        </p>

        <div className="grid sm:grid-cols-2 gap-px bg-border border border-border max-w-3xl">
          <a href="mailto:hello@teamapex.xyz" className="bg-background p-8 hover:bg-primary hover:text-primary-foreground transition-colors group">
            <Mail className="h-5 w-5 mb-6" />
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary-foreground/70 mb-2">Email</div>
            <div className="font-display text-xl font-semibold">hello@teamapex.xyz</div>
          </a>
          <a href="#" className="bg-background p-8 hover:bg-primary hover:text-primary-foreground transition-colors group">
            <Twitter className="h-5 w-5 mb-6" />
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary-foreground/70 mb-2">DM us</div>
            <div className="font-display text-xl font-semibold">@teamapex</div>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 text-sm text-muted-foreground flex flex-wrap items-center justify-between gap-4 font-mono uppercase tracking-widest text-xs">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 bg-primary text-primary-foreground flex items-center justify-center font-bold text-[10px]">A</div>
        Team Apex © {new Date().getFullYear()}
      </div>
      <div>Built on-chain. Shipped with intent.</div>
      <div className="flex items-center gap-5">
        <a href="#" className="hover:text-primary transition-colors"><Github className="h-4 w-4" /></a>
        <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-4 w-4" /></a>
        <a href="#" className="hover:text-primary transition-colors"><Mail className="h-4 w-4" /></a>
      </div>
    </footer>
  );
}
