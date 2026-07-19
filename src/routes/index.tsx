import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudyPal - Your Personal AI Study Partner" },
      {
        name: "description",
        content:
          "Understand concepts, solve problems, generate quizzes, summarize notes, and learn faster with the smartest AI study companion ever built.",
      },
    ],
  }),
  component: Home,
});

/* ─────────────────────────────────────────────
   Navbar
   ───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'AI Tutor', href: '#ai-tutor' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background-950/85 backdrop-blur-xl border-b border-white/8' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16 md:h-18">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center">
              <i className="ri-brain-line text-white text-lg"></i>
            </div>
            <span className="text-lg font-heading font-bold text-foreground-50 tracking-tight">StudyPal</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                className="px-3 py-2 text-sm font-medium text-foreground-300 hover:text-foreground-50 rounded-lg hover:bg-white/5 transition-all duration-200">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-foreground-200 hover:text-foreground-50 transition-colors whitespace-nowrap">Login</Link>
            <Link to="/signup" className="px-5 py-2.5 text-sm font-semibold text-background-950 bg-foreground-50 rounded-full hover:bg-foreground-100 transition-all duration-200 hover:scale-105 whitespace-nowrap">Get Started</Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-foreground-50 hover:bg-white/10">
            <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden">
            <div className="mx-4 bg-background-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                  className="block px-4 py-3 text-sm font-medium text-foreground-200 hover:text-foreground-50 hover:bg-white/5 rounded-xl transition-all">
                  {l.label}
                </a>
              ))}
              <div className="border-t border-white/10 mt-3 pt-3 flex flex-col gap-2">
                <Link to="/login" className="w-full px-4 py-3 text-sm font-medium text-foreground-200 hover:text-foreground-50 rounded-xl hover:bg-white/5 text-left whitespace-nowrap">Login</Link>
                <Link to="/signup" className="w-full px-5 py-3 text-sm font-semibold text-background-950 bg-foreground-50 rounded-full whitespace-nowrap text-center">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────
   Stat Counter
   ───────────────────────────────────────────── */
function StatCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const inc = target / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 33);
    return () => clearInterval(t);
  }, [inView, target]);

  return <span ref={ref} className="tabular-nums">{count.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */
function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [newsStatus, setNewsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsError, setNewsError] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 30 });
  const sy = useSpring(my, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const r = heroRef.current?.getBoundingClientRect();
      if (r) { mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }
    };
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, [mx, my]);

  const handleNewsletter = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const fd = new FormData(f);
    if ((fd.get('company_alt') as string || '').trim()) { setNewsStatus('success'); setEmail(''); setTimeout(() => setNewsStatus('idle'), 3000); return; }
    setNewsStatus('loading');
    setNewsError('');
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.trim() });
      if (error) {
        if (error.code === '23505') {
          // unique constraint — already subscribed, treat as success
          setNewsStatus('success');
          setEmail('');
        } else {
          setNewsError('Something went wrong. Try again.');
          setNewsStatus('error');
        }
      } else {
        setNewsStatus('success');
        setEmail('');
      }
    } catch {
      setNewsError('Network error.');
      setNewsStatus('error');
    }
    setTimeout(() => setNewsStatus('idle'), 4000);
  }, [email]);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  /* ── Data ── */
  const stats = [
    { v: 50000, s: '+', l: 'Questions Solved', i: 'ri-question-answer-line' },
    { v: 15000, s: '+', l: 'Study Sessions', i: 'ri-calendar-check-line' },
    { v: 98, s: '%', l: 'Student Satisfaction', i: 'ri-heart-line' },
    { v: 120, s: '+', l: 'Subjects Covered', i: 'ri-book-open-line' },
  ];

  const trust = [
    { l: 'Students', i: 'ri-user-star-line' },
    { l: 'Universities', i: 'ri-building-line' },
    { l: 'Developers', i: 'ri-code-s-slash-line' },
    { l: 'Educators', i: 'ri-user-voice-line' },
  ];

  const features = [
    { icon: 'ri-robot-2-line', title: 'AI Tutor', desc: 'Voice conversations, step-by-step explanations, and personalized learning paths.', color: 'bg-primary-500' },
    { icon: 'ri-stack-line', title: 'Smart Flashcards', desc: 'AI-generated cards with spaced repetition and memory tracking.', color: 'bg-accent-500' },
    { icon: 'ri-award-line', title: 'Exam Preparation', desc: 'Adaptive quizzes, past questions, and mock exams that simulate real tests.', color: 'bg-secondary-500' },
    { icon: 'ri-file-pdf-2-line', title: 'PDF Intelligence', desc: 'Upload notes and get summaries, key points, and questions instantly.', color: 'bg-primary-600' },
    { icon: 'ri-mind-map', title: 'Mind Maps', desc: 'Automatic concept maps showing relationships between topics.', color: 'bg-accent-600' },
    { icon: 'ri-calendar-todo-line', title: 'Study Planner', desc: 'Daily goals, reminders, streaks, and calendar integration.', color: 'bg-secondary-600' },
    { icon: 'ri-line-chart-line', title: 'Progress Analytics', desc: 'Performance insights, weak topic detection, and achievements.', color: 'bg-primary-700' },
  ];

  const tools = [
    { icon: 'ri-robot-2-line', title: 'AI Tutor', desc: '24/7 personalized tutoring', large: true, img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80' },
    { icon: 'ri-lightbulb-flash-line', title: 'Quiz Generator', desc: 'Auto-create from notes', large: false, img: '' },
    { icon: 'ri-stack-line', title: 'Flashcards', desc: 'Spaced repetition', large: false, img: '' },
    { icon: 'ri-file-pdf-2-line', title: 'PDF Reader', desc: 'Analyze any document', large: false, img: '' },
    { icon: 'ri-mic-line', title: 'Voice Tutor', desc: 'Speak naturally', large: false, img: '' },
    { icon: 'ri-home-smile-line', title: 'Homework Helper', desc: 'Step-by-step solutions', large: false, img: '' },
    { icon: 'ri-calendar-check-line', title: 'Study Planner', desc: 'Organized daily goals', large: false, img: '' },
    { icon: 'ri-mind-map', title: 'Mind Maps', desc: 'Visual connections', large: false, img: '' },
    { icon: 'ri-dashboard-line', title: 'Dashboard', desc: 'Track your growth', large: false, img: '' },
  ];

  const testimonials = [
    { name: 'Sarah Chen', role: 'Medical Student, Stanford', quote: 'StudyPal completely transformed how I study. The AI tutor explains complex concepts better than most textbooks. It\'s like having a professor available 24/7.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80' },
    { name: 'Marcus Johnson', role: 'Computer Science, MIT', quote: 'The code explanations are incredible. StudyPal walks you through logic step by step. My algorithms grade went from B- to A in one semester.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80' },
    { name: 'Emily Rodriguez', role: 'High School Senior, NY', quote: 'I was struggling with AP Physics until StudyPal. The flashcard system with spaced repetition is genius — I remembered everything for the exam!', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&q=80' },
    { name: 'David Kim', role: 'Law Student, Harvard', quote: 'Uploading case briefs and getting instant summaries saves me hours every week. The PDF intelligence feature alone is worth the subscription.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&q=80' },
    { name: 'Aisha Patel', role: 'Engineering, UC Berkeley', quote: 'The mind maps helped me connect concepts across my entire engineering curriculum. StudyPal found relationships I never would have noticed.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80' },
    { name: 'James Wilson', role: 'PhD Candidate, Oxford', quote: 'Even at PhD level, StudyPal is incredibly useful. It helps me quickly digest research papers and generates discussion questions for seminars.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80' },
  ];

  const plans = [
    { name: 'Free', price: '$0', period: 'forever', desc: 'Start learning', features: ['10 AI questions/day', 'Basic flashcards', 'PDF summaries (5MB)', 'Study streaks', 'Community access'], cta: 'Get Started', hl: false },
    { name: 'Pro', price: '$12', period: '/month', desc: 'Full potential', features: ['Unlimited AI questions', 'Spaced repetition', 'PDF analysis unlimited', 'Voice conversations', 'Quiz generation', 'Mind maps', 'Priority support', 'Custom study plans'], cta: 'Start Free Trial', hl: true, badge: 'Most Popular' },
    { name: 'Team', price: '$29', period: '/month', desc: 'For groups', features: ['Everything in Pro', 'Up to 10 members', 'Shared flashcards', 'Group analytics', 'Collaborative maps', 'Admin dashboard', 'Priority API'], cta: 'Contact Sales', hl: false },
  ];

  const faqs = [
    { q: 'What exactly is StudyPal?', a: 'StudyPal is an AI-powered study companion that combines tutoring, flashcards, quizzes, PDF analysis, mind maps, and study planning into one seamless experience — helping you understand concepts, prepare for exams, and learn more efficiently.' },
    { q: 'Is StudyPal suitable for all subjects?', a: 'Absolutely! StudyPal covers over 120 subjects including mathematics, sciences, engineering, medicine, law, humanities, languages, and more. Our AI adapts to virtually any academic discipline.' },
    { q: 'How does the AI Tutor work?', a: 'The AI Tutor engages in natural dialogue. Type or speak your question and StudyPal provides step-by-step explanations, asks clarifying questions, and adapts its teaching style to your level of understanding.' },
    { q: 'Can I upload my own study materials?', a: 'Yes! Upload PDFs, lecture notes, and textbooks. StudyPal analyzes them and automatically generates summaries, key points, flashcards, and practice questions based on your specific materials.' },
    { q: 'Is my data private and secure?', a: 'Privacy is a top priority. Your materials and conversations are encrypted and never shared with third parties. You can delete your data anytime. We comply with GDPR and educational privacy standards.' },
    { q: 'Is there a free trial?', a: 'Yes! The Free plan includes 10 AI questions per day. Upgrade to Pro for a 14-day free trial with full access — no credit card needed for the free plan.' },
    { q: 'Does it work on mobile?', a: 'StudyPal is fully responsive — works beautifully on desktop, tablet, and mobile. Your progress syncs seamlessly across all devices so you can study anywhere.' },
    { q: 'Can teachers use it with students?', a: 'Definitely! The Team plan is designed for classrooms. Teachers can create shared flashcard decks, assign quizzes, track student progress, and use the admin dashboard.' },
  ];

  const footerLinks = {
    Product: ['Features', 'AI Tutor', 'Flashcards', 'Quiz Generator', 'Pricing'],
    Resources: ['Documentation', 'Tutorials', 'Blog', 'Changelog', 'API'],
    Company: ['About', 'Careers', 'Press', 'Partners', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  };

  return (
    <div className="min-h-screen bg-background-50 font-body">
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-950">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=80"
          alt="Modern study environment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background-950/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center py-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-xs font-semibold text-primary-300 whitespace-nowrap">AI-Powered Learning Platform</span>
            </div>
            <h1 className="font-heading font-bold text-foreground-50 tracking-tight leading-[1.05]">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Your Personal AI</span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-300 italic font-serif mt-1">Study Partner.</span>
            </h1>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-foreground-300 max-w-2xl mx-auto leading-relaxed">
              Understand concepts, solve problems, generate quizzes, summarize notes, and learn faster with the smartest AI study companion ever built.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => scrollTo('#pricing')} className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-primary-500 rounded-full hover:bg-primary-600 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                Start Learning Free
              </button>
              <button onClick={() => scrollTo('#how-it-works')} className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-foreground-200 border border-white/20 rounded-full hover:bg-white/5 transition-all duration-300 whitespace-nowrap">
                <span className="flex items-center justify-center gap-2"><i className="ri-play-circle-line text-lg"></i>Watch Demo</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating cards */}
        {[
          { i: 'ri-chat-3-line', l: 'AI Chat', x: '12%', y: '18%', d: 0 },
          { i: 'ri-stack-line', l: 'Flashcards', x: '78%', y: '12%', d: 0.3 },
          { i: 'ri-fire-line', l: 'Streak 7 Days', x: '84%', y: '48%', d: 0.6 },
          { i: 'ri-trophy-line', l: 'Quiz Score', x: '8%', y: '58%', d: 0.9 },
          { i: 'ri-mic-line', l: 'Voice Mode', x: '45%', y: '78%', d: 1.2 },
        ].map((c) => (
          <motion.div key={c.l} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: c.d }}
            className="absolute hidden lg:block" style={{ left: c.x, top: c.y, x: sx, y: sy }}>
            <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <i className={`${c.i} text-white/80 text-base`}></i>
              </div>
              <span className="text-sm font-medium text-white/70">{c.l}</span>
            </div>
          </motion.div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-background-950 pointer-events-none" style={{ maskImage: 'linear-gradient(to top, black, transparent)' }} />
      </section>

      {/* ═══════════════════════════════════════
          SOCIAL PROOF
          ═══════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-background-950">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="text-xs font-semibold text-foreground-500 uppercase tracking-[0.2em] mb-8">Trusted Worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {trust.map((t) => (
                <div key={t.l} className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/8">
                  <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center"><i className={`${t.i} text-foreground-300 text-sm`}></i></div>
                  <span className="text-sm font-medium text-foreground-300">{t.l}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((st, i) => (
              <motion.div key={st.l} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.5, delay: 0.12 * i }}
                className="group relative p-6 md:p-8 rounded-[24px] bg-white/[0.03] border border-white/6 hover:border-primary-500/20 transition-all duration-500">
                <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center mb-4"><i className={`${st.i} text-primary-400 text-lg`}></i></div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground-50 mb-2"><StatCounter target={st.v} suffix={st.s} /></div>
                <p className="text-sm text-foreground-500">{st.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES (with images)
          ═══════════════════════════════════════ */}
      <section id="features" className="relative py-20 md:py-32 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-foreground-200/40 bg-foreground-50/50 mb-6">
              <span className="text-xs font-semibold text-foreground-600 uppercase tracking-wider">Capabilities</span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground-950 tracking-tight">
              Everything you need<br /><span className="text-primary-500">to study smarter.</span>
            </h2>
            <p className="mt-4 text-base text-foreground-600 max-w-xl mx-auto">Powerful AI tools designed to transform how you learn.</p>
          </motion.div>

          {/* Feature cards with alternating image layout */}
          <div className="space-y-16 md:space-y-24">
            {/* AI Tutor + Flashcards row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80"
                  alt="AI Tutor interface" className="w-full rounded-[28px] object-cover aspect-[7/5]" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
                <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center mb-5"><i className="ri-robot-2-line text-white text-xl"></i></div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-4">AI Tutor That Actually Teaches</h3>
                <p className="text-base text-foreground-600 leading-relaxed mb-6">Voice conversations, step-by-step explanations, and personalized learning paths that adapt to your pace. It&apos;s like having a brilliant tutor available whenever you need one.</p>
                <ul className="space-y-3">
                  {['Natural voice conversations', 'Step-by-step problem solving', 'Personalized to your level', 'Available 24/7'].map((t) => (
                    <li key={t} className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0"><i className="ri-check-line text-primary-600 text-xs"></i></div><span className="text-sm text-foreground-700">{t}</span></li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Flashcards + PDF row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="lg:order-2">
                <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=700&q=80"
                  alt="Flashcard interface" className="w-full rounded-[28px] object-cover aspect-[7/5]" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="lg:order-1">
                <div className="w-12 h-12 rounded-2xl bg-accent-500 flex items-center justify-center mb-5"><i className="ri-stack-line text-white text-xl"></i></div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950 mb-4">Flashcards That Remember For You</h3>
                <p className="text-base text-foreground-600 leading-relaxed mb-6">AI generates flashcards from your notes automatically. Spaced repetition ensures you review at the perfect moment — right before you&apos;d forget.</p>
                <ul className="space-y-3">
                  {['Auto-generated from notes', 'Spaced repetition algorithm', 'Memory strength tracking', 'Multi-format cards'].map((t) => (
                    <li key={t} className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0"><i className="ri-check-line text-accent-600 text-xs"></i></div><span className="text-sm text-foreground-700">{t}</span></li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Remaining features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {features.slice(2).map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.5, delay: 0.08 * i }}
                  whileHover={{ y: -4 }} className="group">
                  <div className="p-6 md:p-7 rounded-[24px] bg-white border border-foreground-200/20 hover:border-primary-300/40 transition-all duration-500">
                    <div className={`w-11 h-11 rounded-2xl ${f.color} flex items-center justify-center mb-5`}><i className={`${f.icon} text-white text-lg`}></i></div>
                    <h3 className="text-lg font-heading font-bold text-foreground-950 mb-2.5">{f.title}</h3>
                    <p className="text-sm text-foreground-600 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════ */}
      <section id="how-it-works" className="relative py-20 md:py-32 bg-background-950">
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/8 border border-white/10 mb-6">
              <span className="text-xs font-semibold text-foreground-400 uppercase tracking-wider">How It Works</span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground-50 tracking-tight">Four steps to<br /><span className="text-primary-400">smarter learning.</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: '01', t: 'Upload or Ask', d: 'Upload your notes, a PDF, or ask StudyPal anything.', i: 'ri-upload-cloud-2-line' },
              { n: '02', t: 'AI Analysis', d: 'Our AI reads, understands, and analyzes your material deeply.', i: 'ri-brain-line' },
              { n: '03', t: 'Smart Generation', d: 'Get summaries, flashcards, quizzes, and study plans instantly.', i: 'ri-magic-line' },
              { n: '04', t: 'Learn & Master', d: 'Study smarter and faster with personalized AI-powered learning.', i: 'ri-rocket-2-line' },
            ].map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.5, delay: 0.15 * i }}
                className="relative">
                <div className="glass-card p-6 md:p-8 rounded-[24px] text-center h-full">
                  <span className="text-5xl font-heading font-bold text-white/5 block mb-4">{s.n}</span>
                  <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center mx-auto mb-4"><i className={`${s.i} text-primary-400 text-2xl`}></i></div>
                  <h3 className="text-lg font-heading font-bold text-foreground-50 mb-2">{s.t}</h3>
                  <p className="text-sm text-foreground-400 leading-relaxed">{s.d}</p>
                </div>
                {i < 3 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-foreground-500"><i className="ri-arrow-right-line"></i></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          AI CHAT SHOWCASE
          ═══════════════════════════════════════ */}
      <section id="ai-tutor" className="relative py-20 md:py-32 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-foreground-200/40 bg-foreground-50/50 mb-6">
              <span className="text-xs font-semibold text-foreground-600 uppercase tracking-wider">AI Tutor</span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground-950 tracking-tight">Conversations that<br /><span className="text-primary-500">teach you anything.</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
              <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=700&q=80"
                alt="AI Chat Interface" className="w-full rounded-[28px] object-cover aspect-[7/6] shadow-2xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground-950">Real conversations. Real understanding.</h3>
              <p className="text-base text-foreground-600 leading-relaxed">Our AI doesn&apos;t just spit out answers — it engages in natural dialogue, adapts to your level, and explains concepts in ways that actually make sense to you.</p>
              <div className="space-y-4">
                {[
                  { i: 'ri-chat-smile-2-line', c: 'bg-primary-100', ic: 'text-primary-600', t: 'Natural language conversations that feel human' },
                  { i: 'ri-code-box-line', c: 'bg-accent-100', ic: 'text-accent-600', t: 'Code snippets, math equations, and diagrams' },
                  { i: 'ri-image-line', c: 'bg-secondary-100', ic: 'text-secondary-600', t: 'Visual explanations with images and charts' },
                  { i: 'ri-history-line', c: 'bg-primary-100', ic: 'text-primary-600', t: 'Full conversation history, always available' },
                ].map((item) => (
                  <div key={item.t} className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl ${item.c} flex items-center justify-center flex-shrink-0 mt-0.5`}><i className={`${item.i} ${item.ic} text-sm`}></i></div>
                    <span className="text-sm text-foreground-700 pt-1.5">{item.t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VOICE AI
          ═══════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 bg-background-950">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }} className="lg:order-2">
              <img src="https://images.unsplash.com/photo-1590650046871-92c887180603?w=700&q=80"
                alt="Voice AI learning" className="w-full rounded-[28px] object-cover aspect-[7/6] shadow-2xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }} className="lg:order-1">
              <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground-50 tracking-tight mb-6">Talk. Listen.<br /><span className="text-primary-400">Learn.</span></h2>
              <p className="text-base md:text-lg text-foreground-400 leading-relaxed mb-8 max-w-lg">Ask questions naturally using your voice and receive instant spoken explanations. It feels like having a personal tutor right there with you.</p>
              <div className="space-y-4">
                {[
                  { i: 'ri-mic-line', t: 'Natural voice recognition in 30+ languages' },
                  { i: 'ri-volume-up-line', t: 'Human-like speech with proper intonation' },
                  { i: 'ri-speed-up-line', t: 'Adjustable speed — learn at your own pace' },
                ].map((item) => (
                  <div key={item.t} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-500/15 flex items-center justify-center flex-shrink-0"><i className={`${item.i} text-primary-400 text-sm`}></i></div>
                    <span className="text-sm text-foreground-300">{item.t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SMART TOOLS BENTO
          ═══════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-foreground-200/40 bg-foreground-50/50 mb-6">
              <span className="text-xs font-semibold text-foreground-600 uppercase tracking-wider">AI Workspace</span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground-950 tracking-tight max-w-2xl">Your Intelligent Study Suite.</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[130px] md:auto-rows-[150px] gap-3 md:gap-4">
            {tools.map((tool, i) => (
              <motion.div key={tool.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.4, delay: 0.06 * i }}
                whileHover={{ scale: 1.02 }} className={`${i === 0 ? 'col-span-2 row-span-2' : 'col-span-1'} group`}>
                <div className="h-full rounded-[24px] bg-white border border-foreground-200/15 hover:border-foreground-300/30 p-4 md:p-5 flex flex-col justify-between transition-all duration-500 overflow-hidden">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mb-3"><i className={`${tool.icon} text-primary-600 text-lg`}></i></div>
                    <h3 className="text-sm md:text-base font-heading font-bold text-foreground-950">{tool.title}</h3>
                  </div>
                  <p className="text-xs text-foreground-500">{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════ */}
      <section id="testimonials" className="relative py-20 md:py-32 bg-background-950">
        <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=1800&q=80"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6"><div className="w-1.5 h-1.5 rounded-full bg-accent-400" /><span className="text-xs font-semibold text-foreground-400 uppercase tracking-wider">Student Stories</span></div>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground-50 tracking-tight">Loved by Learners<br /><span className="text-primary-400">Everywhere.</span></h2>
          </motion.div>

          <div className="overflow-hidden">
            <motion.div className="flex gap-4 md:gap-6" animate={{ x: `-${testimonialSlide * 100}%` }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
              {[0, 1].map((slide) => (
                <div key={slide} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {testimonials.slice(slide * 3, slide * 3 + 3).map((t) => (
                      <div key={t.name} className="glass-card p-6 md:p-7 rounded-[24px]">
                        <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, si) => (<i key={si} className="ri-star-fill text-accent-400 text-sm"></i>))}</div>
                        <p className="text-sm md:text-base text-foreground-200 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                        <div className="flex items-center gap-3">
                          <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                          <div><p className="text-sm font-semibold text-foreground-50">{t.name}</p><p className="text-xs text-foreground-500">{t.role}</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={() => setTestimonialSlide((p) => (p - 1 + 2) % 2)} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-foreground-400 hover:text-foreground-50 hover:border-white/25 transition-all"><i className="ri-arrow-left-line"></i></button>
            {[0, 1].map((i) => (
              <button key={i} onClick={() => setTestimonialSlide(i)} className={`h-2 rounded-full transition-all duration-300 ${i === testimonialSlide ? 'w-6 bg-primary-400' : 'w-2 bg-white/20 hover:bg-white/30'}`} />
            ))}
            <button onClick={() => setTestimonialSlide((p) => (p + 1) % 2)} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-foreground-400 hover:text-foreground-50 hover:border-white/25 transition-all"><i className="ri-arrow-right-line"></i></button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRICING
          ═══════════════════════════════════════ */}


      {/* ═══════════════════════════════════════
          FAQ
          ═══════════════════════════════════════ */}
      <section id="faq" className="relative py-20 md:py-32 bg-background-50">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-foreground-200/40 bg-foreground-50/50 mb-6">
              <span className="text-xs font-semibold text-foreground-600 uppercase tracking-wider">FAQ</span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground-950 tracking-tight">Got questions?<br /><span className="text-primary-500">We&apos;ve got answers.</span></h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border border-foreground-200/20 rounded-2xl overflow-hidden bg-white">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-foreground-50/30 transition-colors">
                  <span className="text-sm md:text-base font-semibold text-foreground-950">{faq.q}</span>
                  <motion.div animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.3 }} className="w-6 h-6 rounded-full border border-foreground-300/40 flex items-center justify-center flex-shrink-0">
                    <i className="ri-add-line text-foreground-500 text-xs"></i>
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-6 pb-5"><p className="text-sm text-foreground-600 leading-relaxed">{faq.a}</p></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 bg-background-950 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}
            className="font-heading text-3xl md:text-5xl lg:text-7xl font-bold text-foreground-50 tracking-tight leading-[1.05]">
            Ready to transform<br /><span className="text-primary-400">how you study?</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-foreground-400 max-w-xl mx-auto">Join 50,000+ students learning smarter with StudyPal.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollTo('#pricing')} className="w-full sm:w-auto px-10 py-4 text-base font-semibold text-white bg-primary-500 rounded-full hover:bg-primary-600 transition-all hover:scale-105 whitespace-nowrap flex items-center justify-center gap-2">
              Start Learning Free <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><i className="ri-arrow-right-line text-white text-xs"></i></div>
            </button>
            <button onClick={() => scrollTo('#how-it-works')} className="w-full sm:w-auto px-10 py-4 text-base font-medium text-foreground-200 border border-white/20 rounded-full hover:bg-white/5 transition-all hover:scale-105 whitespace-nowrap">
              <span className="flex items-center justify-center gap-2"><i className="ri-play-circle-line text-lg"></i>See Demo</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="bg-background-950 border-t border-white/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center"><i className="ri-brain-line text-white text-lg"></i></div>
                <span className="text-lg font-heading font-bold text-foreground-50 tracking-tight">StudyPal</span>
              </div>
              <p className="text-sm text-foreground-400 leading-relaxed mb-6 max-w-xs">The smartest AI study companion. Learn faster, understand more, ace your exams.</p>
              <form onSubmit={handleNewsletter} className="space-y-3">
                <label className="block text-xs font-medium text-foreground-500 uppercase tracking-wider">Newsletter</label>
                <div className="flex gap-2">
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                    className="flex-1 px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-foreground-100 placeholder:text-foreground-600 focus:outline-none focus:border-primary-500/40 transition-colors" />
                  <button type="submit" disabled={newsStatus === 'loading'}
                    className="px-4 py-2.5 text-sm font-semibold bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 whitespace-nowrap">
                    {newsStatus === 'loading' ? 'Sending...' : 'Subscribe'}
                  </button>
                </div>
                <input type="text" name="company_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly className="honeypot-field" />
                {newsStatus === 'success' && <p className="text-xs text-green-400">Welcome aboard!</p>}
                {newsStatus === 'error' && <p className="text-xs text-red-400">{newsError}</p>}
              </form>
            </div>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-widest mb-4">{title}</h4>
                <ul className="space-y-2.5">{links.map((l) => (<li key={l}><a href="#" className="text-sm text-foreground-400 hover:text-foreground-200 transition-colors">{l}</a></li>))}</ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-foreground-600">© 2026 StudyPal. All rights reserved.</p>
            <div className="flex items-center gap-5">
              {['ri-twitter-x-line', 'ri-linkedin-line', 'ri-github-line', 'ri-discord-line', 'ri-youtube-line'].map((ic) => (
                <a key={ic} href="#" className="text-foreground-500 hover:text-foreground-200 transition-colors"><i className={`${ic} text-lg`}></i></a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
