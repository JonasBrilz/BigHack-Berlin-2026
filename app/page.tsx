"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Eye,
  Target,
  Smile,
  XCircle,
  Sliders,
  Database,
  Plug,
  Info,
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";

type RateMode = "standard" | "manual" | "crm";

const STANDARD_VISIT_TO_LEAD = 2.5;
const STANDARD_LEAD_TO_CUSTOMER = 15;

export default function HomePage() {
  const [shake, setShake] = useState(false);
  const [mode, setMode] = useState<RateMode>("standard");
  const [visitToLead, setVisitToLead] = useState<string>("");
  const [leadToCustomer, setLeadToCustomer] = useState<string>("");

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="fixed inset-x-0 bottom-0 h-72 dot-grid opacity-40 pointer-events-none -z-10" />

      <section className="relative max-w-7xl mx-auto w-full px-6 pt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-white text-[13px] mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Profit Analysis
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <h1 className="text-[clamp(2.75rem,7.5vw,5.75rem)] font-semibold tracking-[-0.045em] leading-[1.0]">
              Finde heraus,
              <br />
              wo du Geld<br />
              <span className="text-muted">liegen lässt.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-end"
          >
            <p className="text-[18px] text-muted leading-relaxed">
              Peec AI scannt deine Geschäftsdaten, identifiziert ungenutzte Hebel
              und zeigt dir in drei Schritten, wie viel Umsatz du gerade auf dem
              Tisch liegen lässt — bevor es deine Wettbewerber tun.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <FeaturePill icon={<Eye className="w-3.5 h-3.5" />} label="Sichtbarkeit" />
              <FeaturePill icon={<Target className="w-3.5 h-3.5" />} label="Position" />
              <FeaturePill icon={<Smile className="w-3.5 h-3.5" />} label="Sentiment" />
            </div>
          </motion.div>
        </div>

        {/* Conversion-Rates */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-16 rounded-2xl bg-white border border-line p-7"
        >
          <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
            <div>
              <h2 className="text-[18px] font-semibold tracking-tight">
                Conversion-Rates
              </h2>
              <p className="text-[14px] text-muted mt-1">
                Damit wir realistische Hebel berechnen können — wähle, wie wir
                deine Conversion-Daten erfassen.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-muted">
              <Info className="w-3.5 h-3.5" />
              Pflichtangabe
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-2 mb-6">
            <ModeTab
              active={mode === "standard"}
              onClick={() => setMode("standard")}
              icon={<Sliders className="w-4 h-4" />}
              label="Standardwerte"
              hint="Branchen-Median"
            />
            <ModeTab
              active={mode === "manual"}
              onClick={() => setMode("manual")}
              icon={<Database className="w-4 h-4" />}
              label="Manuell eingeben"
              hint="Eigene Werte"
            />
            <ModeTab
              active={mode === "crm"}
              onClick={() => setMode("crm")}
              icon={<Plug className="w-4 h-4" />}
              label="CRM verbinden"
              hint="Bald verfügbar"
            />
          </div>

          <AnimatePresence mode="wait">
            {mode === "standard" && (
              <motion.div
                key="standard"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 gap-3"
              >
                <ReadOnlyField
                  label="Visit-to-Lead Rate"
                  value={`${STANDARD_VISIT_TO_LEAD}%`}
                  sub="Branchen-Median B2B SaaS"
                />
                <ReadOnlyField
                  label="Lead-to-Customer Rate"
                  value={`${STANDARD_LEAD_TO_CUSTOMER}%`}
                  sub="Branchen-Median B2B SaaS"
                />
              </motion.div>
            )}

            {mode === "manual" && (
              <motion.div
                key="manual"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 gap-3"
              >
                <RateInput
                  label="Visit-to-Lead Rate"
                  placeholder={`${STANDARD_VISIT_TO_LEAD}`}
                  value={visitToLead}
                  onChange={setVisitToLead}
                />
                <RateInput
                  label="Lead-to-Customer Rate"
                  placeholder={`${STANDARD_LEAD_TO_CUSTOMER}`}
                  value={leadToCustomer}
                  onChange={setLeadToCustomer}
                />
              </motion.div>
            )}

            {mode === "crm" && (
              <motion.div
                key="crm"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-dashed border-line bg-canvas/50 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-line flex items-center justify-center flex-shrink-0">
                    <Plug className="w-4 h-4 text-muted" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-medium">
                      CRM-Integration noch nicht verfügbar
                    </div>
                    <p className="text-[13px] text-muted mt-1 leading-relaxed">
                      HubSpot, Salesforce und Pipedrive folgen in Kürze. Bis
                      dahin Standardwerte oder manuelle Eingabe nutzen.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["HubSpot", "Salesforce", "Pipedrive"].map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-line text-[12px] text-muted"
                        >
                          {c}
                          <span className="text-[10px] text-muted/70">soon</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 relative z-10"
        >
          <motion.button
            onClick={() => {
              setShake(true);
              setTimeout(() => setShake(false), 500);
            }}
            animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="group px-5 h-12 rounded-xl bg-white border border-line text-[15px] font-medium flex items-center gap-2 cursor-not-allowed hover:border-line/80 transition relative"
            title="Keine vorherige Analyse gefunden"
          >
            <XCircle className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            Analyse fortsetzen
            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-canvas border border-line text-[10px] text-muted opacity-0 group-hover:opacity-100 transition">
              keine vorhanden
            </span>
          </motion.button>

          <Link
            href="/analyse"
            className="px-6 h-12 rounded-xl bg-ink text-white text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-ink/90 transition group"
          >
            <Sparkles className="w-4 h-4" />
            Analyse starten
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 grid md:grid-cols-3 gap-4"
        >
          <StepCard
            n="01"
            title="Datenerfassung"
            desc="Geschäftsdaten, Umsätze, Marktposition werden eingelesen."
          />
          <StepCard
            n="02"
            title="Markt-Analyse"
            desc="Vergleich mit Wettbewerbern, Identifikation von Hebeln."
          />
          <StepCard
            n="03"
            title="Verpasstes Potenzial"
            desc="Berechnung des Umsatzes, den du gerade liegen lässt."
          />
        </motion.div>
      </section>
    </main>
  );
}

function ModeTab({
  active,
  onClick,
  icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left px-4 py-3 rounded-xl border transition-all ${
        active
          ? "border-l-[3px] border-l-accent border-y-line border-r-line bg-white shadow-[0_2px_24px_-12px_rgba(0,0,0,0.15)]"
          : "border-line bg-white hover:border-ink/30"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
            active ? "bg-ink text-white" : "bg-canvas text-muted"
          }`}
        >
          {icon}
        </span>
        <span className="text-[14px] font-medium">{label}</span>
      </div>
      <div className="text-[12px] text-muted mt-1.5 ml-9">{hint}</div>
    </button>
  );
}

function RateInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[13px] text-muted">{label}</span>
      <div className="mt-1.5 relative">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          max="100"
          step="0.1"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 px-3.5 pr-9 rounded-xl bg-white border border-line text-[15px] focus:outline-none focus:border-ink/40 transition"
        />
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[14px] text-muted pointer-events-none">
          %
        </span>
      </div>
    </label>
  );
}

function ReadOnlyField({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl bg-canvas border border-line px-4 py-3.5">
      <div className="text-[13px] text-muted">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[20px] font-semibold tracking-tight">{value}</span>
        <span className="text-[12px] text-muted">{sub}</span>
      </div>
    </div>
  );
}

function FeaturePill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-line text-ink text-[14px]">
      {icon}
      {label}
    </span>
  );
}

function StepCard({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-line p-6">
      <div className="text-[12px] font-medium text-muted tracking-wider">
        {n}
      </div>
      <h3 className="mt-2 text-[18px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-[14px] text-muted leading-relaxed">{desc}</p>
    </div>
  );
}
