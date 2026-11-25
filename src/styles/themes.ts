import type { DefaultTheme } from 'styled-components'

const scale = {
  radii: { small: '8px', medium: '14px', large: '22px', pill: '999px' },
  space: { xs: '.375rem', sm: '.625rem', md: '1rem', lg: '1.5rem', xl: '2.25rem' },
  typography: {
    body: '"Segoe UI", system-ui, sans-serif',
    display: 'Georgia, "Times New Roman", serif',
    small: '.875rem',
    regular: '1rem',
  },
  breakpoints: { tablet: '580px', laptop: '860px', desktop: '1130px' },
}

const coverInks = [
  ['#8e3e31', '#ffe3b6'], ['#2b483d', '#e8df90'], ['#302a4b', '#f9c3a6'],
  ['#214964', '#a5e7ee'], ['#742e46', '#ffd7df'], ['#955a26', '#fff0bb'],
  ['#2f5260', '#e8f7e6'], ['#363747', '#d8e9a2'],
]
const covers = coverInks.map(([background, ink]) => ({ background, ink }))

export const themes = {
  light: {
    ...scale, mode: 'light',
    colors: {
      background: '#f8f5ef', surface: '#fffcf7', raised: '#f0ebe1', text: '#25271e',
      muted: '#5c5e51', border: '#ddd6c9', accent: '#36543e', onAccent: '#fffdf5',
      hover: '#294532', active: '#203626', disabled: '#e9e4db', disabledText: '#615f55',
      focus: '#9d4c24', success: '#31573e', danger: '#9c362c', skeleton: '#e8e0d3',
      shimmer: '#fbf7ee', overlay: '#181c16a6',
    },
    covers,
    shadows: { card: '0 3px 12px #342a1710', raised: '0 12px 25px #342a1738' },
  },
  dark: {
    ...scale, mode: 'dark',
    colors: {
      background: '#19191b', surface: '#242427', raised: '#313135', text: '#f3f3f5',
      muted: '#c1c1c7', border: '#55555c', accent: '#d1d1d8', onAccent: '#212125',
      hover: '#e4e4e9', active: '#bdbdc6', disabled: '#3d3d42', disabledText: '#bfbfc6',
      focus: '#f6c68a', success: '#b9dbaa', danger: '#ffb3a8', skeleton: '#35353a',
      shimmer: '#515157', overlay: '#0a0a0cbd',
    },
    covers,
    shadows: { card: '0 3px 12px #08080a70', raised: '0 12px 25px #08080ab0' },
  },
  sepia: {
    ...scale, mode: 'sepia',
    colors: {
      background: '#f4e7cf', surface: '#fff2db', raised: '#eddbba', text: '#3b2d22',
      muted: '#66523d', border: '#d6c2a0', accent: '#75432f', onAccent: '#fff4dc',
      hover: '#653723', active: '#542b1b', disabled: '#ecddc0', disabledText: '#675745',
      focus: '#99451c', success: '#3e5a34', danger: '#9b342c', skeleton: '#e6cfaa',
      shimmer: '#f9ebd2', overlay: '#2d1d15a6',
    },
    covers,
    shadows: { card: '0 3px 12px #57321b18', raised: '0 12px 25px #57321b44' },
  },
} satisfies Record<DefaultTheme['mode'], DefaultTheme>

export type ThemeName = keyof typeof themes
export const themeLabels: Record<ThemeName, string> = {
  light: 'Светлая', dark: 'Тёмная', sepia: 'Сепия',
}
