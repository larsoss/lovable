export type AccentColor = 'blue' | 'teal' | 'purple' | 'green' | 'amber'
export type TileStyle = 'glass' | 'solid'
export type BgStyle = 'dark' | 'black' | 'navy' | 'slate'

export interface ThemeConfig {
  accent: AccentColor
  tileStyle: TileStyle
  bgStyle: BgStyle
}

export const DEFAULT_THEME: ThemeConfig = { accent: 'blue', tileStyle: 'glass', bgStyle: 'dark' }

const KEY = 'hk_theme'

export function getTheme(): ThemeConfig {
  try {
    return { ...DEFAULT_THEME, ...(JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<ThemeConfig>) }
  } catch {
    return DEFAULT_THEME
  }
}

export function saveTheme(t: ThemeConfig): void {
  localStorage.setItem(KEY, JSON.stringify(t))
}

/** Background CSS values per bgStyle */
export const BG_VALUES: Record<BgStyle, string> = {
  dark:  'radial-gradient(ellipse at 25% 0%, #2a2a3c 0%, #1C1C1E 55%, #111111 100%)',
  black: '#000000',
  navy:  'linear-gradient(145deg, #0d1b2a 0%, #1a2540 60%, #0a1628 100%)',
  slate: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
}

/** Tailwind class sets per accent color — all strings must be statically present */
export const ACCENT_CLASSES = {
  blue:   { bg: 'bg-ios-blue',   bgLight: 'bg-ios-blue/20',   text: 'text-ios-blue',   border: 'border-ios-blue' },
  teal:   { bg: 'bg-ios-teal',   bgLight: 'bg-ios-teal/20',   text: 'text-ios-teal',   border: 'border-ios-teal' },
  purple: { bg: 'bg-ios-purple', bgLight: 'bg-ios-purple/20', text: 'text-ios-purple', border: 'border-ios-purple' },
  green:  { bg: 'bg-ios-green',  bgLight: 'bg-ios-green/20',  text: 'text-ios-green',  border: 'border-ios-green' },
  amber:  { bg: 'bg-ios-amber',  bgLight: 'bg-ios-amber/20',  text: 'text-ios-amber',  border: 'border-ios-amber' },
} as const

export const ACCENT_HEX: Record<AccentColor, string> = {
  blue:   '#0A84FF',
  teal:   '#5AC8FA',
  purple: '#BF5AF2',
  green:  '#30D158',
  amber:  '#FF9F0A',
}

export const BG_PREVIEW: Record<BgStyle, string> = {
  dark:  '#1C1C1E',
  black: '#000000',
  navy:  '#0d1b2a',
  slate: '#1e293b',
}
