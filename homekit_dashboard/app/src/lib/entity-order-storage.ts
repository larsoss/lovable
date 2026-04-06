// Per-context (area_id or 'favorites') entity ordering
export type EntityOrderMap = Record<string, string[]>

const KEY = 'hk_entity_order'

export function getEntityOrder(): EntityOrderMap {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as EntityOrderMap
  } catch {
    return {}
  }
}

export function saveEntityOrder(map: EntityOrderMap): void {
  localStorage.setItem(KEY, JSON.stringify(map))
}
