const KEY = 'hk_hidden_entities'

export function getHiddenEntities(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[]
  } catch {
    return []
  }
}

export function saveHiddenEntities(ids: string[]): void {
  localStorage.setItem(KEY, JSON.stringify(ids))
}
