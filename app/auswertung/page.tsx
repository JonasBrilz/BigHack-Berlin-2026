"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Download,
  CalendarRange,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";

const HEBEL = [
  {
    title: "Pricing-Optimierung",
    impact: "+€84.500",
    delta: "+12,3%",
    desc: "Drei Produktlinien sind 8–14% unter Marktpreis. Eine sanfte Anpassung verändert die Conversion kaum, hebt aber die Marge deutlich.",
    icon: TrendingUp,
    confidence: "Hoch",
  },
  {
    title: "Kosten-Reallokation",
    impact: "+€42.800",
    delta: "+6,1%",
    desc: "Fixe Marketingausgaben fließen aktuell in Kanäle mit niedriger Sichtbarkeit. Umverteilung auf Top-Performer steigert ROAS.",
    icon: Zap,
    confidence: "Mittel",
  },
  {
    title: "Kundensegmentierung",
    impact: "+€31.200",
    delta: "+4,5%",
    desc: "23% der Kunden bringen 71% des Umsatzes. Gezieltes Upselling im Top-Segment verspricht das größte Wachstum.",
    icon: Target,
    confidence: "Hoch",
  },
];

const RISKS = [
  "Saisonale Umsatzschwankung in Q3 (-9% YoY)",
  "Wettbewerber X hat Preis um 6% gesenkt",
  "Lagerbestand für Top-Produkt nur 14 Tage",
];

export default function AuswertungPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <BrandMark className="fixed top-5 right-6 z-50 no-print" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 max-w-7xl mx-auto w-full px-6 py-16"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-white text-[13px] mb-5">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
            Analyse abgeschlossen
          </div>
          <h1 className="text-[clamp(2.25rem,6vw,4.25rem)] font-semibold tracking-[-0.04em] leading-[1.02] max-w-4xl mx-auto">
            <span className="text-ink">Dein Profit-Potenzial</span>
            <br />
            <span className="text-muted">in Zahlen</span>
          </h1>
        </motion.div>

        {/* Hero Metric */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl bg-ink text-white p-10 md:p-14 mb-10 relative overflow-hidden print-bg-light"
        >
          <div className="absolute inset-0 dot-grid opacity-[0.06]" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[13px] uppercase tracking-wider text-white/60 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Zusätzliches Umsatzpotenzial / Jahr
              </div>
              <div className="text-[clamp(3rem,9vw,6rem)] font-semibold tracking-[-0.04em] leading-none">
                +€158.500
              </div>
              <div className="mt-5 text-[16px] text-white/70 leading-relaxed">
                Wenn alle drei Hebel umgesetzt werden, kann dein Unternehmen den
                Jahresumsatz um <strong className="text-white">22,9%</strong> steigern —
                bei nahezu unverändertem Kostenblock.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="ROI" value="3,4×" sub="auf 6 Mt." />
              <Stat label="Break-even" value="42 Tage" sub="ab Umsetzung" />
              <Stat label="Margen-Lift" value="+5,8 PP" sub="Bruttomarge" />
              <Stat label="Confidence" value="87%" sub="Modell-Score" />
            </div>
          </div>
        </motion.div>

        {/* Hebel */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-end justify-between mb-6"
          >
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em]">
                Drei konkrete Hebel
              </h2>
              <p className="text-muted text-[15px] mt-1">
                Priorisiert nach Impact und Umsetzbarkeit.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {HEBEL.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="group rounded-2xl bg-white border border-line p-6 hover:border-ink/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-canvas flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full border ${
                        h.confidence === "Hoch"
                          ? "border-ink/20 bg-ink/5 text-ink"
                          : "border-line bg-canvas text-muted"
                      }`}
                    >
                      {h.confidence}
                    </span>
                  </div>
                  <div className="text-[13px] text-muted mb-1">#{i + 1} Hebel</div>
                  <h3 className="text-[20px] font-semibold tracking-tight mb-3">
                    {h.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-[28px] font-semibold tracking-tight">
                      {h.impact}
                    </span>
                    <span className="text-[13px] text-accent font-medium flex items-center">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {h.delta}
                    </span>
                  </div>
                  <p className="text-[14px] text-muted leading-relaxed">
                    {h.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Risks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="rounded-2xl bg-white border border-line p-7 mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-4 h-4 text-accent" />
            <h3 className="text-[16px] font-semibold tracking-tight">
              Risiken im Blick behalten
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {RISKS.map((r) => (
              <div
                key={r}
                className="text-[14px] text-muted px-4 py-3 rounded-lg bg-canvas border border-line"
              >
                {r}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
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
      </motion.section>
    </main>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
      <div className="text-[11px] uppercase tracking-wider text-white/50">
        {label}
      </div>
      <div className="text-[24px] font-semibold tracking-tight mt-1">
        {value}
      </div>
      <div className="text-[12px] text-white/50 mt-0.5">{sub}</div>
    </div>
  );
}
