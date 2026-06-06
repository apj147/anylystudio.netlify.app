export type Stage =
  | 'queued'
  | 'consultation'
  | 'sketch'
  | 'blocking'
  | 'detail'
  | 'finishing'
  | 'shipped'

export interface CommissionEntry {
  token: string
  clientName: string
  pieceTitle: string
  medium: string
  size: string
  stage: Stage
  estimatedCompletion: string
  updates: Array<{ date: string; note: string }>
}

export const STAGE_LABELS: Record<Stage, string> = {
  queued: 'Queue Confirmed',
  consultation: 'Reference Review & Consultation',
  sketch: 'Compositional Sketch',
  blocking: 'Color Block-In',
  detail: 'Detail Pass',
  finishing: 'Finishing & Quality Review',
  shipped: 'Shipped ✓',
}

export const STAGE_ORDER: Stage[] = [
  'queued', 'consultation', 'sketch', 'blocking', 'detail', 'finishing', 'shipped',
]

// ─── Add / update commissions here ──────────────────────────────────────────
// Each entry needs a unique token — use any random string (e.g. nanoid or UUID).
// Share the URL /track/<token> with the client privately.
// ────────────────────────────────────────────────────────────────────────────
const commissions: CommissionEntry[] = [
  {
    token: 'demo-luna-2024',
    clientName: 'Sarah',
    pieceTitle: 'Luna — Pet Portrait',
    medium: 'Acrylic on canvas',
    size: '16 × 20 in',
    stage: 'detail',
    estimatedCompletion: 'July 2026',
    updates: [
      { date: 'May 12, 2026', note: 'Commission agreement signed. Reference photos received — great shots of Luna in that afternoon light.' },
      { date: 'May 20, 2026', note: 'Compositional sketch approved. Beginning color block-in this week.' },
      { date: 'Jun 3, 2026', note: 'Block-in complete. Moving into the detail pass — focusing on her eyes and the texture of her coat.' },
    ],
  },
]

export function getCommission(token: string): CommissionEntry | null {
  return commissions.find((c) => c.token === token) ?? null
}
