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
  allPromptsByLift,
  competitorsRanked,
  data,
  formatEuro,
  formatPct,
  lowestVisibilityPrompts,
  type PromptDetail,
} from "@/lib/peec";

const ANALYSIS_FLAG = "peec.hasAnalysis";

export default function ReportPage() {
  useEffect(() => {
    try {
      localStorage.setItem(ANALYSIS_FLAG, "1");
    } catch {
      /* noop */
    }
  }, []);

  const competitors = competitorsRanked();
  const allPrompts = allPromptsByLift();
  const weakPrompts = lowestVisibilityPrompts(3);

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

        <PromptsTable
          prompts={allPrompts}
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
        <CheckCircle2 className="w-3.5 h-3.5 text-gain" />
        Analysis complete · {BRAND}
      </div>
      <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-semibold tracking-[-0.04em] leading-[1.02] max-w-3xl mx-auto">
        <span className="text-ink">Where {BRAND} is leaving</span>
        <br />
        <span className="text-muted">money on the table in AI search.</span>
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
          Potential gain · annual
        </div>
        <div className="text-[clamp(3.25rem,11vw,7rem)] font-semibold tracking-[-0.04em] leading-none text-gain">
          +{formatEuro(lift)}
        </div>
        <div className="mt-5 text-[17px] text-white/70 leading-relaxed flex items-center gap-2">
          <Users className="w-4 h-4 text-white/60" />
          ≈{" "}
          <strong className="text-white">
            {customers.toLocaleString("en-US", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}{" "}
            new customers / year
          </strong>
          , currently flowing to HubSpot &amp; co. via AI answers.
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
            {Math.round(gapPp)} pp visibility gap
          </h2>
          <p className="text-muted text-[14px] mt-1">
            How often AI mentions {leaderName} compared to {BRAND}.
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
              prompts where {BRAND} doesn&apos;t show up at all.
            </span>
          </div>
          <div className="mt-5 grid sm:grid-cols-3 gap-2">
            {examples.map((p) => (
              <div
                key={p.prompt_id}
                className="rounded-lg bg-canvas border border-line px-3.5 py-3"
              >
                <div className="text-[11px] uppercase tracking-wider text-muted">
                  Visibility {Math.round(p.your_visibility * 100)}%
                </div>
                <div className="text-[13px] mt-1 leading-snug line-clamp-3">
                  &ldquo;{p.prompt_message}&rdquo;
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
        Competitive landscape
      </h2>
      <p className="text-muted text-[14px] mb-6">
        Who beats {BRAND} across the {totalPrompts} relevant prompts.
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
                  {c.prompts_won_against_you} / {totalPrompts} prompts
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

function PromptsTable({
  prompts,
  sharePct,
}: {
  prompts: PromptDetail[];
  sharePct: number;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const total = prompts.length;

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
            All {total} prompts
          </h2>
          <p className="text-muted text-[14px] mt-1">
            Top 3 capture{" "}
            <span className="text-ink font-medium">{sharePct}%</span> of total
            lift. Click any row for full stats and the recommended action.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-[12px] text-muted">
          <Target className="w-3.5 h-3.5" />
          ranked by revenue lift
        </div>
      </div>

      <div className="border border-line rounded-xl overflow-hidden">
        {prompts.map((p, i) => {
          const isOpen = open === p.prompt_id;
          const isTop3 = i < 3;
          return (
            <div
              key={p.prompt_id}
              className={`${
                i > 0 ? "border-t border-line" : ""
              } ${isTop3 ? "bg-canvas/40" : "bg-white"}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : p.prompt_id)}
                className="w-full text-left flex items-center gap-4 p-4 hover:bg-canvas transition"
              >
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full text-[12px] font-semibold flex items-center justify-center ${
                    isTop3
                      ? "bg-ink text-white"
                      : "bg-canvas border border-line text-muted"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="flex-1 min-w-0 text-[14px] leading-snug">
                  {p.prompt_message}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[12px] text-muted whitespace-nowrap tabular-nums">
                  vis {Math.round(p.your_visibility * 100)}%
                </span>
                <span className="text-[15px] font-semibold tabular-nums whitespace-nowrap text-gain">
                  +{formatEuro(p.revenue_lift_eur)}
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
                    <PromptDetailView prompt={p} />
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

function PromptDetailView({ prompt }: { prompt: PromptDetail }) {
  return (
    <div className="px-4 pb-5 pt-1 grid md:grid-cols-3 gap-3">
      <Stat
        label="Your visibility"
        value={`${Math.round(prompt.your_visibility * 100)}%`}
        sub={`avg position ${prompt.your_position.toFixed(1)}`}
      />
      <Stat
        label={`Top competitor · ${prompt.top_competitor_name}`}
        value={`${Math.round(prompt.top_competitor_visibility * 100)}%`}
        sub="avg visibility"
      />
      <Stat
        label="Annual mentions"
        value={Math.round(prompt.annual_mentions).toLocaleString("en-US")}
        sub={
          prompt.volume_source === "chat_fallback"
            ? "sample-extrapolation"
            : `search_volume ${prompt.search_volume.toLocaleString("en-US")}`
        }
      />
      <Stat
        label="Current annual revenue"
        value={formatEuro(prompt.current_annual_revenue_eur)}
      />
      <Stat
        label="Target annual revenue"
        value={formatEuro(prompt.target_annual_revenue_eur)}
        sub={`if visibility → ${Math.round(prompt.target_visibility * 100)}% @ pos ${prompt.target_position.toFixed(1)}`}
      />
      <Stat
        label="Revenue lift"
        value={`+${formatEuro(prompt.revenue_lift_eur)}`}
        accent="gain"
      />

      {prompt.action && (
        <div className="md:col-span-3 rounded-lg bg-white border border-line p-4 mt-1">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted">
                Recommended action
              </div>
              <div className="text-[14px] font-medium capitalize mt-0.5">
                {prompt.action.action_type.replace(/_/g, " ")}
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted mb-1.5">
                Suggested targets
              </div>
              <ul className="space-y-1 text-[13px] text-muted">
                {prompt.action.suggested_targets.map((t) => (
                  <li key={t} className="leading-snug">
                    · {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted mb-1.5">
                Evidence
              </div>
              <ul className="space-y-1 text-[13px] text-muted">
                {prompt.action.evidence_signals.map((s) => (
                  <li key={s} className="leading-snug">
                    · {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "gain";
}) {
  return (
    <div className="rounded-lg bg-white border border-line p-3.5">
      <div className="text-[11px] uppercase tracking-wider text-muted">
        {label}
      </div>
      <div
        className={`mt-1 text-[18px] font-semibold tracking-tight tabular-nums leading-tight ${
          accent === "gain" ? "text-gain" : ""
        }`}
      >
        {value}
      </div>
      {sub && (
        <div className="mt-0.5 text-[12px] text-muted leading-snug">{sub}</div>
      )}
    </div>
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
        Export report
      </button>
      <Link
        href="/content-plan"
        className="px-5 h-12 rounded-xl bg-white border border-line text-[15px] font-medium hover:bg-canvas transition flex items-center justify-center gap-2 group"
      >
        <CalendarRange className="w-4 h-4" />
        Create content plan
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
      <Link
        href="/"
        className="px-6 h-12 rounded-xl bg-ink text-white text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-ink/90 transition group"
      >
        Start new analysis
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}
