import { books } from './data/books'
import { themes, type ThemeName } from './styles/themes'

export const themeKey = 'mini-market-theme'
export const cartKey = 'mini-market-cart'
export type Cart = Record<string, number>

export function persist(key: string, value: string) {
  try { localStorage.setItem(key, value) } catch { /* Storage may be unavailable. */ }
}
function read(key: string) {
  try { return localStorage.getItem(key) } catch { return null }
}
export function initialTheme(): ThemeName {
  const saved = read(themeKey)
  if (saved && Object.hasOwn(themes, saved)) return saved as ThemeName
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
export function initialCart(): Cart {
  try {
    const saved = JSON.parse(read(cartKey) ?? '{}') as Cart | null
    return Object.fromEntries(books.flatMap(({ id }) => {
      const quantity = saved?.[id]
      return typeof quantity === 'number' && Number.isSafeInteger(quantity) && quantity > 0
        ? [[id, quantity]] : []
    }))
  } catch { return {} }
}

export function changeQuantity(cart: Cart, id: string, quantity: number): Cart {
  const next = { ...cart }
  if (quantity > 0) next[id] = quantity
  else delete next[id]
  return next
}
