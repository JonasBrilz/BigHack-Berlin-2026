"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  Download,
  Linkedin,
  Mail,
  Megaphone,
  PenLine,
  Search,
  Video,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";

type Channel = "Blog" | "LinkedIn" | "E-Mail" | "Video" | "Paid Ads";

const CHANNEL_ICON: Record<Channel, React.ReactNode> = {
  Blog: <PenLine className="w-3.5 h-3.5" />,
  LinkedIn: <Linkedin className="w-3.5 h-3.5" />,
  "E-Mail": <Mail className="w-3.5 h-3.5" />,
  Video: <Video className="w-3.5 h-3.5" />,
  "Paid Ads": <Megaphone className="w-3.5 h-3.5" />,
};

type PlanItem = {
  week: string;
  title: string;
  channel: Channel;
  goal: string;
  hebel: string;
};

const PLAN: PlanItem[] = [
  {
    week: "Woche 1",
    title: "Launch-Story: Pricing-Update transparent erklärt",
    channel: "Blog",
    goal: "Awareness · Trust",
    hebel: "Pricing",
  },
  {
    week: "Woche 1",
    title: "Founder-Post: Warum wir unsere Preise anpassen",
    channel: "LinkedIn",
    goal: "Reach · Reputation",
    hebel: "Pricing",
  },
  {
    week: "Woche 2",
    title: "Case Study: 12% Margen-Lift in 6 Wochen",
    channel: "Blog",
    goal: "Conversion · Proof",
    hebel: "Pricing",
  },
  {
    week: "Woche 2",
    title: "VIP-Mailing an Top-23%-Segment",
    channel: "E-Mail",
    goal: "Upsell",
    hebel: "Segmentierung",
  },
  {
    week: "Woche 3",
    title: "Re-Targeting auf High-ROAS-Kanälen",
    channel: "Paid Ads",
    goal: "Performance",
    hebel: "Kosten",
  },
  {
    week: "Woche 3",
    title: "60s-Video: Drei-Schritt-Hebel erklärt",
    channel: "Video",
    goal: "Engagement",
    hebel: "Brand",
  },
  {
    week: "Woche 4",
    title: "Quartalsabschluss-Newsletter mit Insights",
    channel: "E-Mail",
    goal: "Retention",
    hebel: "Segmentierung",
  },
  {
    week: "Woche 4",
    title: "LinkedIn-Carousel: 5 Lessons Learned",
    channel: "LinkedIn",
    goal: "Reach",
    hebel: "Brand",
  },
];

export default function ContentPlanPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <BrandMark className="fixed top-5 right-6 z-50" />

      <div className="fixed inset-x-0 bottom-0 h-72 dot-grid opacity-40 pointer-events-none -z-10" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 max-w-7xl mx-auto w-full px-6 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-white text-[13px] mb-8"
        >
          <CalendarRange className="w-3.5 h-3.5" />
          Content-Plan · Auto-generiert
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <h1 className="text-[clamp(2.5rem,6.5vw,4.75rem)] font-semibold tracking-[-0.04em] leading-[1.02]">
              Deine 4-Wochen-
              <br />
              <span className="text-muted">Kampagne</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-end"
          >
            <p className="text-[17px] text-muted leading-relaxed">
              Auf Basis deiner Profit-Analyse haben wir eine durchgeplante
              Kampagne erstellt — Channels, Themen, Ziele und welcher Hebel
              damit aktiviert wird.
            </p>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          <Stat label="Beiträge" value="8" />
          <Stat label="Channels" value="5" />
          <Stat label="Wochen" value="4" />
          <Stat label="Erwarteter Lift" value="+18%" highlight />
        </motion.div>

        {/* Plan Cards by Week */}
        <div className="space-y-8">
          {["Woche 1", "Woche 2", "Woche 3", "Woche 4"].map((wk, wIdx) => (
            <motion.div
              key={wk}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + wIdx * 0.08 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-ink text-white flex items-center justify-center text-[12px] font-semibold">
                  {wIdx + 1}
                </div>
                <h2 className="text-[20px] font-semibold tracking-tight">
                  {wk}
                </h2>
                <div className="flex-1 border-t border-line" />
                <span className="text-[12px] text-muted">
                  {PLAN.filter((p) => p.week === wk).length} Beiträge
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {PLAN.filter((p) => p.week === wk).map((item, i) => (
                  <div
                    key={i}
                    className="group rounded-2xl bg-white border border-line p-5 hover:border-ink/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-canvas border border-line text-[12px]">
                        {CHANNEL_ICON[item.channel]}
                        {item.channel}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full border border-ink/15 bg-ink/5 text-ink">
                        Hebel: {item.hebel}
                      </span>
                    </div>
                    <h3 className="text-[16px] font-semibold tracking-tight leading-snug mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[12px] text-muted">
                      <Search className="w-3 h-3" />
                      <span>Ziel: {item.goal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Outcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 rounded-3xl bg-ink text-white p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 dot-grid opacity-[0.06]" />
          <div className="relative grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="text-[12px] uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Outcome
              </div>
              <h3 className="text-[24px] font-semibold tracking-[-0.02em] leading-tight">
                Diese Kampagne aktiviert alle drei identifizierten Hebel und
                soll das verpasste Potenzial in <strong>~6 Wochen</strong>{" "}
                operativ heben.
              </h3>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="text-[11px] uppercase tracking-wider text-white/50">
                Erwartete Wirkung
              </div>
              <div className="text-[40px] font-semibold tracking-tight mt-1 leading-none">
                +€95k
              </div>
              <div className="text-[12px] text-white/60 mt-2">
                in den ersten 90 Tagen
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center no-print"
        >
          <button
            onClick={() => window.print()}
            className="px-5 h-12 rounded-xl bg-white border border-line text-[15px] font-medium hover:bg-canvas transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Plan exportieren
          </button>
          <Link
            href="/auswertung"
            className="px-5 h-12 rounded-xl bg-white border border-line text-[15px] font-medium hover:bg-canvas transition flex items-center justify-center gap-2"
          >
            Zurück zur Auswertung
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
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-white border p-5 ${
        highlight ? "border-l-[3px] border-l-accent border-y-line border-r-line" : "border-line"
      }`}
    >
      <div className="text-[12px] uppercase tracking-wider text-muted">
        {label}
      </div>
      <div className="text-[28px] font-semibold tracking-tight mt-1">
        {value}
      </div>
    </div>
  );
}
