"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Download,
  CalendarRange,
  EyeOff,
  Users,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Target,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";
import {
  BRAND,
  competitorsRanked,
  data,
  formatEuro,
  formatPct,
  lowestVisibilityPrompts,
  topActions,
} from "@/lib/peec";

const ANALYSIS_FLAG = "peec.hasAnalysis";

export default function AuswertungPage() {
  useEffect(() => {
    try {
      localStorage.setItem(ANALYSIS_FLAG, "1");
    } catch {
      /* noop */
    }
  }, []);

  const competitors = competitorsRanked();
  const top3 = topActions(3);
  const weakPrompts = lowestVisibilityPrompts(3);
  const topPromptsTotalLift = top3.reduce(
    (s, a) => s + a.revenue_lift_eur,
    0
  );

  return (
    <main className="min-h-screen flex flex-col">
      <BrandMark className="fixed top-5 left-6 z-50 no-print" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 max-w-6xl mx-auto w-full px-6 py-16"
      >
        <Header />

        <Hero
          lift={data.total_revenue_lift_eur}
          customers={data.customer_equivalents}
        />

        <VisibilityGap
          you={data.overall_your_visibility}
          leader={data.leader_visibility}
          leaderName={data.leader_name}
          gapPp={data.visibility_gap_pp}
        />

        <InvisibleCallout
          untapped={data.untapped_prompt_count}
          total={data.total_prompts}
          examples={weakPrompts}
        />

        <Competitive competitors={competitors} totalPrompts={data.total_prompts} />

        <TopThree
          actions={top3}
          totalLift={topPromptsTotalLift}
          sharePct={data.top3_lift_share_pct}
        />

        <Methodology
          aiQueryShare={data.market_estimate.ai_query_share}
          realVolume={data.prompts_using_real_volume}
          totalPrompts={data.total_prompts}
          source={data.market_estimate.sources[0]}
        />

        <CTA />
      </motion.section>
    </main>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-white text-[13px] mb-5">
        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
        Analyse abgeschlossen · {BRAND}
      </div>
      <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-semibold tracking-[-0.04em] leading-[1.02] max-w-3xl mx-auto">
        <span className="text-ink">Wo {BRAND} in AI-Antworten</span>
        <br />
        <span className="text-muted">Geld liegen lässt.</span>
      </h1>
    </motion.div>
  );
}

function Hero({ lift, customers }: { lift: number; customers: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="rounded-3xl bg-ink text-white p-10 md:p-14 mb-8 relative overflow-hidden print-bg-light"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.06]" />
      <div className="relative">
        <div className="text-[13px] uppercase tracking-wider text-white/60 mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Verlorener Jahresumsatz in AI-Suche
        </div>
        <div className="text-[clamp(3.25rem,11vw,7rem)] font-semibold tracking-[-0.04em] leading-none">
          {formatEuro(lift)}
        </div>
        <div className="mt-5 text-[17px] text-white/70 leading-relaxed flex items-center gap-2">
          <Users className="w-4 h-4 text-white/60" />
          ≈{" "}
          <strong className="text-white">
            {customers.toLocaleString("de-DE", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}{" "}
            Neukunden / Jahr
          </strong>
          , die heute über AI-Antworten an HubSpot &amp; Co. abfließen.
        </div>
      </div>
    </motion.div>
  );
}

function VisibilityGap({
  you,
  leader,
  leaderName,
  gapPp,
}: {
  you: number;
  leader: number;
  leaderName: string;
  gapPp: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="rounded-2xl bg-white border border-line p-7 mb-8"
    >
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
            {Math.round(gapPp)} pp Sichtbarkeits-Gap
          </h2>
          <p className="text-muted text-[14px] mt-1">
            So oft erwähnt AI {leaderName} im Vergleich zu {BRAND}.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <Bar label={BRAND} value={you} tone="muted" />
        <Bar label={leaderName} value={leader} tone="accent" />
      </div>
    </motion.div>
  );
}

function Bar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "muted" | "accent";
}) {
  const pct = Math.round(value * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[15px] font-medium">{label}</span>
        <span className="text-[20px] font-semibold tracking-tight tabular-nums">
          {pct}%
        </span>
      </div>
      <div className="h-3 rounded-full bg-canvas border border-line overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className={`h-full rounded-full ${
            tone === "accent" ? "bg-ink" : "bg-ink/30"
          }`}
        />
      </div>
    </div>
  );
}

function InvisibleCallout({
  untapped,
  total,
  examples,
}: {
  untapped: number;
  total: number;
  examples: { prompt_id: string; prompt_message: string; your_visibility: number }[];
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = untapped;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [untapped]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="rounded-2xl bg-white border border-line p-7 mb-8"
    >
      <div className="flex items-start gap-5 flex-wrap">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-canvas border border-line flex items-center justify-center">
          <EyeOff className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[44px] font-semibold tracking-[-0.03em] tabular-nums leading-none">
              {count}
            </span>
            <span className="text-[20px] text-muted tabular-nums">
              / {total}
            </span>
            <span className="text-[14px] text-muted ml-2">
              Prompts, in denen {BRAND} nicht auftaucht.
            </span>
          </div>
          <div className="mt-5 grid sm:grid-cols-3 gap-2">
            {examples.map((p) => (
              <div
                key={p.prompt_id}
                className="rounded-lg bg-canvas border border-line px-3.5 py-3"
              >
                <div className="text-[11px] uppercase tracking-wider text-muted">
                  Sichtbarkeit {Math.round(p.your_visibility * 100)}%
                </div>
                <div className="text-[13px] mt-1 leading-snug line-clamp-3">
                  „{p.prompt_message}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Competitive({
  competitors,
  totalPrompts,
}: {
  competitors: { competitor_name: string; prompts_won_against_you: number }[];
  totalPrompts: number;
}) {
  const max = Math.max(...competitors.map((c) => c.prompts_won_against_you));
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="rounded-2xl bg-white border border-line p-7 mb-8"
    >
      <h2 className="text-[22px] font-semibold tracking-[-0.02em] mb-1">
        Wettbewerb in AI-Antworten
      </h2>
      <p className="text-muted text-[14px] mb-6">
        Wer schlägt {BRAND} in wie vielen der {totalPrompts} relevanten Prompts.
      </p>
      <div className="space-y-4">
        {competitors.map((c, i) => {
          const pct = Math.round((c.prompts_won_against_you / totalPrompts) * 100);
          const widthPct = Math.round((c.prompts_won_against_you / max) * 100);
          return (
            <div key={c.competitor_name}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[14px] font-medium">
                  {c.competitor_name}
                </span>
                <span className="text-[13px] text-muted tabular-nums">
                  {c.prompts_won_against_you} / {totalPrompts} Prompts
                  <span className="text-muted/60"> · {pct}%</span>
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-canvas border border-line overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPct}%` }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.07 }}
                  className="h-full bg-ink rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function TopThree({
  actions,
  totalLift,
  sharePct,
}: {
  actions: ReturnType<typeof topActions>;
  totalLift: number;
  sharePct: number;
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55 }}
      className="rounded-2xl bg-white border border-line p-7 mb-8"
    >
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
            Fix diese 3 Prompts
          </h2>
          <p className="text-muted text-[14px] mt-1">
            <span className="text-ink font-medium">{sharePct}%</span> des
            gesamten Hebels (
            <span className="tabular-nums">{formatEuro(totalLift, true)}</span>
            ) liegen in nur drei Prompts.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-[12px] text-muted">
          <Target className="w-3.5 h-3.5" />
          klick für Action-Empfehlung
        </div>
      </div>

      <div className="divide-y divide-line border border-line rounded-xl overflow-hidden">
        {actions.map((a, i) => {
          const isOpen = open === a.prompt_id;
          return (
            <div key={a.prompt_id} className="bg-canvas/40">
              <button
                onClick={() => setOpen(isOpen ? null : a.prompt_id)}
                className="w-full text-left flex items-center gap-4 p-4 hover:bg-canvas transition"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-ink text-white text-[12px] font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="flex-1 min-w-0 text-[14px] leading-snug">
                  {a.prompt_message}
                </span>
                <span className="text-[15px] font-semibold tabular-nums whitespace-nowrap text-accent">
                  {formatEuro(a.revenue_lift_eur, true)}
                </span>
                <span className="text-muted">
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 grid sm:grid-cols-2 gap-3">
                      <div className="rounded-lg bg-white border border-line p-4">
                        <div className="text-[11px] uppercase tracking-wider text-muted mb-1.5">
                          Empfohlene Aktion
                        </div>
                        <div className="text-[14px] font-medium capitalize">
                          {a.action_type.replace(/_/g, " ")}
                        </div>
                        <ul className="mt-2 space-y-1 text-[13px] text-muted">
                          {a.suggested_targets.map((t) => (
                            <li key={t} className="leading-snug">
                              · {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white border border-line p-4">
                        <div className="text-[11px] uppercase tracking-wider text-muted mb-1.5">
                          Evidence
                        </div>
                        <ul className="space-y-1 text-[13px] text-muted">
                          {a.evidence_signals.map((s) => (
                            <li key={s} className="leading-snug">
                              · {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function Methodology({
  aiQueryShare,
  realVolume,
  totalPrompts,
  source,
}: {
  aiQueryShare: number;
  realVolume: number;
  totalPrompts: number;
  source: string;
}) {
  const fallback = totalPrompts - realVolume;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="rounded-xl bg-white/60 border border-line/70 p-5 mb-10 text-[12px] text-muted leading-relaxed"
    >
      <div className="flex items-start gap-2 flex-wrap">
        <span className="font-medium text-muted/90 uppercase tracking-wider text-[10px]">
          Methodology
        </span>
        <span>·</span>
        <span>
          <code className="text-ink/80">ai_query_share</code> ={" "}
          {formatPct(aiQueryShare)} sourced via Tavily
        </span>
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 underline decoration-line underline-offset-2 hover:text-ink"
        >
          [link]
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
        <span>·</span>
        <span>
          {realVolume} of {totalPrompts} prompts has sourced volume; the other{" "}
          {fallback} use a sample-extrapolation method.
        </span>
      </div>
    </motion.div>
  );
}

function CTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="flex flex-col sm:flex-row gap-3 justify-center no-print"
    >
      <button
        onClick={() => window.print()}
        className="px-5 h-12 rounded-xl bg-white border border-line text-[15px] font-medium hover:bg-canvas transition flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Report exportieren
      </button>
      <Link
        href="/content-plan"
        className="px-5 h-12 rounded-xl bg-white border border-line text-[15px] font-medium hover:bg-canvas transition flex items-center justify-center gap-2 group"
      >
        <CalendarRange className="w-4 h-4" />
        Content-Plan erstellen
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
      <Link
        href="/"
        className="px-6 h-12 rounded-xl bg-ink text-white text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-ink/90 transition group"
      >
        Neue Analyse starten
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}
