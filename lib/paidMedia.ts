// Paid-Media offer service.
//
// Swap point for the backend: replace the simulated `requestOffer` body
// with a real fetch to your offer API. The page UI does not need to change —
// it only awaits the returned promise.
//
// Suggested backend contract:
//   POST /api/paid-media/offer
//   body:    { mediaId: MediaId, context?: OfferContext }
//   returns: Offer
//
// On the demo side a fake response is produced after a short delay so the
// round-trip can be played end-to-end without a server.

export type MediaId = "marketsandmarkets" | "business-com" | "technologyadvice";

export type Figures = {
  cost: string;
  gain: string;
  gainDelta: string;
};

export type OfferContext = {
  visitToLead?: number;
  leadToCustomer?: number;
  avgRevenuePerCustomer?: number;
};

export type Offer = {
  mediaId: MediaId;
  figures: Figures;
  receivedAt: string;
};

export const OFFER_FIGURES: Record<MediaId, Figures> = {
  "marketsandmarkets": { cost: "€16,250", gain: "+€84,500", gainDelta: "+12.3%" },
  "business-com":      { cost: "€10,800", gain: "+€42,800", gainDelta: "+6.1%" },
  "technologyadvice":  { cost: "€8,200",  gain: "+€31,200", gainDelta: "+4.5%" },
};

const SIMULATED_RESPONSE_MS = 3500;

export async function requestOffer(
  mediaId: MediaId,
  _context?: OfferContext,
): Promise<Offer> {
  // TODO(backend): replace with real call once /api/paid-media/offer is live.
  // const res = await fetch("/api/paid-media/offer", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ mediaId, context: _context }),
  // });
  // if (!res.ok) throw new Error(`Offer request failed (${res.status})`);
  // return (await res.json()) as Offer;

  await new Promise((r) => setTimeout(r, SIMULATED_RESPONSE_MS));
  return {
    mediaId,
    figures: OFFER_FIGURES[mediaId],
    receivedAt: new Date().toISOString(),
  };
}

export type CardState = "estimate" | "sending" | "received";

export const STORAGE_KEY = "peec.paidmedia.state.v1";
export const CONTEXT_KEY = "peec.offer.context.v1";
export const ANALYSIS_FLAG = "peec.hasAnalysis";
export const NOTIFY_EMAIL = "kalwajonas@gmail.com";

export const VORJAHRES_ARPU = 4800;

export function loadContext(): OfferContext | undefined {
  try {
    const raw = localStorage.getItem(CONTEXT_KEY);
    return raw ? (JSON.parse(raw) as OfferContext) : undefined;
  } catch {
    return undefined;
  }
}

export function saveContext(ctx: OfferContext): void {
  try {
    localStorage.setItem(CONTEXT_KEY, JSON.stringify(ctx));
  } catch {
    /* noop */
  }
}
