import { userKey } from './user-context'

/**
 * Grid uses doubled column density.  '1x1' spans 2 base columns so that
 * 'half' (1 base column) is exactly half the width of a normal tile.
 * Row heights are fixed in the grid itself, so widening never changes height.
 *
 * Visual sizes:
 *   half  = ½ normal width,  1 row tall
 *   1x1   = normal tile
 *   2x1   = 2× wide,  same height as 1x1
 *   1x2   = normal width, 2× tall
 *   2x2   = 2× wide + 2× tall (big square)
 */
export type TileSpan = 'half' | '1x1' | '2x1' | '1x2' | '2x2'
export type EntityTileSizes = Record<string, TileSpan>

function key() { return userKey('hk_tile_sizes') }

export function getTileSizes(): EntityTileSizes {
  try {
    return JSON.parse(localStorage.getItem(key()) ?? '{}') as EntityTileSizes
  } catch {
    return {}
  }
}

export function saveTileSizes(sizes: EntityTileSizes): void {
  localStorage.setItem(key(), JSON.stringify(sizes))
}

/** Tailwind col/row span classes per TileSpan (doubled grid base) */
export const SPAN_CLASSES: Record<TileSpan, string> = {
  'half': 'col-span-1 row-span-1',
  '1x1':  'col-span-2 row-span-1',
  '2x1':  'col-span-4 row-span-1',
  '1x2':  'col-span-2 row-span-2',
  '2x2':  'col-span-4 row-span-2',
}

/** Convert TileSpan to [colUnits, rowUnits] in the doubled-column grid */
export function spanToUnits(span: TileSpan): [number, number] {
  switch (span) {
    case 'half': return [1, 1]
    case '1x1':  return [2, 1]
    case '2x1':  return [4, 1]
    case '1x2':  return [2, 2]
    case '2x2':  return [4, 2]
  }
}

/** Convert [colUnits, rowUnits] back to the closest TileSpan */
export function unitsToSpan(c: number, r: number): TileSpan {
  const cc = Math.max(1, Math.min(4, c))
  const rr = Math.max(1, Math.min(2, r))
  if (cc <= 1) return rr <= 1 ? 'half' : 'half'  // half is always 1 row
  if (cc <= 2) return rr <= 1 ? '1x1' : '1x2'
  return rr <= 1 ? '2x1' : '2x2'
}
