"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingDown,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Download,
  CalendarRange,
  Mail,
  MailCheck,
  Loader2,
  Globe2,
  Briefcase,
  Cpu,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";
import {
  ANALYSIS_FLAG,
  NOTIFY_EMAIL,
  OFFER_FIGURES,
  STORAGE_KEY,
  type CardState,
  type Figures,
  type MediaId,
} from "@/lib/paidMedia";

type Media = {
  id: MediaId;
  title: string;
  domain: string;
  audience: string;
  icon: LucideIcon;
  estimate: Figures;
  partnerEmail: string;
};

const MEDIA: Media[] = [
  {
    id: "marketsandmarkets",
    title: "MarketsandMarkets",
    domain: "marketsandmarkets.com",
    audience: "B2B Tech Decision-Maker · 4,8M MAU",
    icon: Globe2,
    estimate: { cost: "ab €18.000", gain: "ab +€72.000", gainDelta: "+10,4%" },
    partnerEmail: "partnerships@marketsandmarkets.com",
  },
  {
    id: "business-com",
    title: "Business.com",
    domain: "business.com",
    audience: "SMB-Buyer · 3,1M MAU",
    icon: Briefcase,
    estimate: { cost: "ab €12.000", gain: "ab +€32.000", gainDelta: "+4,6%" },
    partnerEmail: "partners@business.com",
  },
  {
    id: "technologyadvice",
    title: "TechnologyAdvice",
    domain: "technologyadvice.com",
    audience: "IT- & SaaS-Buyer · 1,9M MAU",
    icon: Cpu,
    estimate: { cost: "ab €9.500", gain: "ab +€24.000", gainDelta: "+3,5%" },
    partnerEmail: "media@technologyadvice.com",
  },
];

const RISKS = [
  "Saisonale Umsatzschwankung in Q3 (-9% YoY)",
  "Wettbewerber X hat Preis um 6% gesenkt",
  "Lagerbestand für Top-Produkt nur 14 Tage",
];

type CardData = {
  state: CardState;
  offer?: Figures;
};

type StateMap = Record<MediaId, CardData>;

const initialStateMap = (): StateMap =>
  MEDIA.reduce<StateMap>((acc, m) => {
    acc[m.id] = { state: "estimate" };
    return acc;
  }, {} as StateMap);

export default function AuswertungPage() {
  const [states, setStates] = useState<StateMap>(initialStateMap);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StateMap>;
        const merged = { ...initialStateMap(), ...parsed };
        // Demo flow: a sending card from a previous visit means the user
        // already fired off a request and is now coming back via "Analyse
        // fortsetzen" — flip it (and the rest) to received with the offer.
        const hasPending = MEDIA.some(
          (m) =>
            merged[m.id]?.state === "sending" ||
            merged[m.id]?.state === "received"
        );
        if (hasPending) {
          for (const m of MEDIA) {
            merged[m.id] = {
              state: "received",
              offer: OFFER_FIGURES[m.id],
            };
          }
        }
        setStates(merged);
      }
      localStorage.setItem(ANALYSIS_FLAG, "1");
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
    } catch {
      /* noop */
    }
  }, [states, hydrated]);

  const setCard = (id: MediaId, next: CardData) =>
    setStates((s) => ({ ...s, [id]: next }));

  const handleSend = (m: Media) => {
    const subject = `Angebotsanfrage Paid Media · ${m.title}`;
    const body =
      `Hallo ${m.title} Team,\n\n` +
      `wir haben über Peec AI unser Paid-Media-Potenzial analysiert und möchten ` +
      `eine konkrete Q-Platzierung auf ${m.domain} prüfen.\n\n` +
      `• Geschätztes Budget: ${m.estimate.cost} / Quartal\n` +
      `• Erwarteter Revenue Gain: ${m.estimate.gain} / Jahr\n\n` +
      `Bitte sendet eure aktuellen Konditionen sowie verfügbare Slots an ${NOTIFY_EMAIL}.\n\n` +
      `Beste Grüße\n` +
      `Peec AI · Profit Analysis`;

    const mailto =
      `mailto:${m.partnerEmail}` +
      `?cc=${encodeURIComponent(NOTIFY_EMAIL)}` +
      `&subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(mailto, "_self");
    setCard(m.id, { state: "sending" });
    // The card stays in "Warten auf Antwort" until the user re-enters
    // /auswertung via "Analyse fortsetzen" — the mount effect promotes it.
  };

  const handleReset = (id: MediaId) => setCard(id, { state: "estimate" });

  const totalGain = useMemo(() => {
    return MEDIA.reduce((sum, m) => {
      const card = states[m.id];
      const figures = card?.state === "received" && card.offer
        ? card.offer
        : m.estimate;
      return sum + parseGain(figures.gain);
    }, 0);
  }, [states]);

  const anyReceived = useMemo(
    () => MEDIA.some((m) => states[m.id]?.state === "received"),
    [states]
  );

  return (
    <main className="min-h-screen flex flex-col">
      <BrandMark className="fixed top-5 left-6 z-50 no-print" />

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
                {anyReceived ? "+" : "ab +"}€{formatThousands(totalGain)}
              </div>
              <div className="mt-5 text-[16px] text-white/70 leading-relaxed">
                Wenn du alle drei Paid-Media-Platzierungen aktivierst, kann dein
                Unternehmen den Jahresumsatz um{" "}
                <strong className="text-white">
                  {anyReceived ? "22,9%" : "18,5%"}
                </strong>{" "}
                steigern — bei nahezu unverändertem Kostenblock.
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

        {/* Paid Media */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-end justify-between mb-6"
          >
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.02em]">
                Drei Paid-Media-Platzierungen
              </h2>
              <p className="text-muted text-[15px] mt-1">
                Frag direkt ein Angebot an — die Zahlen werden eingepflegt,
                sobald die Antwort da ist.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {MEDIA.map((m, i) => (
              <MediaCard
                key={m.id}
                media={m}
                index={i}
                card={states[m.id] ?? { state: "estimate" }}
                onSend={() => handleSend(m)}
                onReset={() => handleReset(m.id)}
              />
            ))}
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

function MediaCard({
  media,
  index,
  card,
  onSend,
  onReset,
}: {
  media: Media;
  index: number;
  card: CardData;
  onSend: () => void;
  onReset: () => void;
}) {
  const Icon = media.icon;
  const showOffer = card.state === "received" && !!card.offer;
  const figures = showOffer && card.offer ? card.offer : media.estimate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
      className={`print-card group rounded-2xl bg-white border p-6 flex flex-col transition-colors ${
        showOffer
          ? "border-ink/40 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.18)]"
          : "border-line hover:border-ink/30"
      }`}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-xl bg-canvas flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`text-[11px] px-2 py-0.5 rounded-full border whitespace-nowrap transition-colors ${
            showOffer
              ? "border-ink/20 bg-ink/5 text-ink"
              : "border-line bg-canvas text-muted"
          }`}
        >
          {showOffer ? "Angebot" : "Schätzwert"}
        </span>
      </div>

      <div className="text-[12px] text-muted mb-1">#{index + 1} Paid Media</div>
      <h3 className="text-[20px] font-semibold tracking-tight leading-tight">
        {media.title}
      </h3>
      <div className="text-[13px] text-muted mt-0.5 truncate">{media.domain}</div>
      <div className="text-[12px] text-muted mt-2 leading-snug">
        {media.audience}
      </div>

      <div className="mt-5 space-y-2.5">
        <FigureRow
          label="Geschätzte Kosten"
          value={figures.cost}
          sub="/ Quartal"
        />
        <FigureRow
          label="Revenue Gain"
          value={figures.gain}
          sub="/ Jahr"
          delta={figures.gainDelta}
        />
      </div>

      <div className="mt-6 pt-5 border-t border-line no-print">
        <AnimatePresence mode="wait" initial={false}>
          {card.state === "estimate" && (
            <motion.button
              key="estimate"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={onSend}
              className="w-full h-11 rounded-xl bg-ink text-white text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-ink/90 transition"
            >
              <Mail className="w-4 h-4" />
              Angebot anfragen
            </motion.button>
          )}

          {card.state === "sending" && (
            <motion.div
              key="sending"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="w-full h-11 rounded-xl bg-canvas border border-line text-[13px] text-muted flex items-center justify-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Anfrage gesendet · Warten auf Antwort
            </motion.div>
          )}

          {card.state === "received" && (
            <motion.div
              key="received"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between gap-2"
            >
              <span className="inline-flex items-center gap-1.5 text-[13px] text-ink">
                <MailCheck className="w-4 h-4 text-accent" />
                Antwort eingepflegt
              </span>
              <button
                onClick={onReset}
                className="inline-flex items-center gap-1 text-[12px] text-muted hover:text-ink transition"
                title="Erneut anfragen"
              >
                <RotateCcw className="w-3 h-3" />
                neu anfragen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function FigureRow({
  label,
  value,
  sub,
  delta,
}: {
  label: string;
  value: string;
  sub: string;
  delta?: string;
}) {
  return (
    <div className="rounded-xl bg-canvas border border-line px-3.5 py-3 flex items-baseline justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted">
          {label}
        </div>
        <div className="mt-0.5 text-[18px] font-semibold tracking-tight leading-tight truncate">
          {value}
        </div>
      </div>
      <div className="flex items-baseline gap-1.5 text-[11px] text-muted whitespace-nowrap">
        <span>{sub}</span>
        {delta && (
          <span className="inline-flex items-center text-accent font-medium">
            <ArrowUpRight className="w-3 h-3" />
            {delta}
          </span>
        )}
      </div>
    </div>
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

function parseGain(s: string): number {
  const cleaned = s.replace(/[^\d]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}

function formatThousands(n: number): string {
  return n.toLocaleString("de-DE");
}
