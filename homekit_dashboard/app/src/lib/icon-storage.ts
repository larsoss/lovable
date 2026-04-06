export type EntityIconMap = Record<string, string>  // entity_id → lucide icon name

const KEY = 'hk_entity_icons'

export function getEntityIcons(): EntityIconMap {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as EntityIconMap
  } catch {
    return {}
  }
}

export function saveEntityIcons(map: EntityIconMap): void {
  localStorage.setItem(KEY, JSON.stringify(map))
}
