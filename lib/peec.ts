// Data accessor for the /auswertung page. Reads the mock JSON the
// backend will eventually serve, narrows to the UI-relevant fields,
// and exposes small formatters used across sections.

import raw from "@/Data/Mock.json";

export type Competitor = {
  competitor_name: string;
  prompts_won_against_you: number;
  competitor_avg_visibility: number;
  your_avg_visibility: number;
};

export type PromptRevenue = {
  prompt_id: string;
  prompt_message: string;
  your_visibility: number;
  top_competitor_name: string;
  current_annual_revenue_eur: number;
  target_annual_revenue_eur: number;
  revenue_lift_eur: number;
};

export type TopAction = {
  prompt_id: string;
  prompt_message: string;
  revenue_lift_eur: number;
  action_type: string;
  rationale: string;
  evidence_signals: string[];
  suggested_targets: string[];
};

export type PeecData = {
  total_revenue_lift_eur: number;
  total_prompts: number;
  untapped_prompt_count: number;
  prompts_using_real_volume: number;
  overall_your_visibility: number;
  leader_name: string;
  leader_visibility: number;
  visibility_gap_pp: number;
  top3_lift_share_pct: number;
  customer_equivalents: number;
  competitive_landscape: Competitor[];
  market_estimate: {
    ai_query_share: number;
    sources: string[];
    rationale: string;
  };
  prompt_revenues: PromptRevenue[];
  top_actions: TopAction[];
};

export const data = raw as PeecData;

export const BRAND = "Attio";

export function formatEuro(n: number, withSign = false): string {
  const rounded = Math.round(n);
  const formatted = rounded.toLocaleString("de-DE");
  if (withSign && rounded > 0) return `+€${formatted}`;
  return `€${formatted}`;
}

export function formatPct(ratio: number, digits = 0): string {
  return `${(ratio * 100).toFixed(digits)}%`;
}

export function lowestVisibilityPrompts(n: number): PromptRevenue[] {
  return [...data.prompt_revenues]
    .sort((a, b) => a.your_visibility - b.your_visibility)
    .slice(0, n);
}

export function topActions(n: number): TopAction[] {
  return data.top_actions.slice(0, n);
}

export function competitorsRanked(): Competitor[] {
  return [...data.competitive_landscape].sort(
    (a, b) => b.prompts_won_against_you - a.prompts_won_against_you
  );
}
