import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark' | 'sepia'
    colors: Record<
      'background' | 'surface' | 'raised' | 'text' | 'muted' | 'border' |
      'accent' | 'onAccent' | 'hover' | 'active' | 'disabled' | 'disabledText' |
      'focus' | 'success' | 'danger' | 'skeleton' | 'shimmer' | 'overlay', string
    >
    covers: readonly { background: string; ink: string }[]
    shadows: { card: string; raised: string }
    radii: { small: string; medium: string; large: string; pill: string }
    space: { xs: string; sm: string; md: string; lg: string; xl: string }
    typography: { body: string; display: string; small: string; regular: string }
    breakpoints: { tablet: string; laptop: string; desktop: string }
  }
}
