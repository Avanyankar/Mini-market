import { useEffect, useRef, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Header } from './components/Header'
import { CartDrawer } from './components/CartDrawer'
import { Catalog } from './pages/Catalog'
import { books, type Book } from './data/books'
import { cartKey, changeQuantity, initialCart, initialTheme, persist, themeKey, type Cart } from './state'
import { GlobalStyle } from './styles/global'
import { themes, type ThemeName } from './styles/themes'

export function App() {
  const [mode, setMode] = useState(initialTheme)
  const [{ cart, ordered }, setBasket] = useState(() => ({ cart: initialCart(), ordered: false }))
  const [open, setOpen] = useState(false)
  const timers = useRef(new Map<string, number>())
  const [pending, setPending] = useState<ReadonlySet<string>>(new Set())
  const [announcement, setAnnouncement] = useState('')
  useEffect(() => {
    const active = timers.current
    return () => { active.forEach(timer => window.clearTimeout(timer)); active.clear() }
  }, [])
  useEffect(() => { persist(cartKey, JSON.stringify(cart)) }, [cart])

  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const total = books.reduce((sum, book) => sum + book.price * (cart[book.id] ?? 0), 0)

  function selectTheme(next: ThemeName) {
    setMode(next)
    persist(themeKey, next)
  }

  function addBook(book: Book) {
    if (timers.current.has(book.id)) return
    setPending(previous => new Set(previous).add(book.id))
    timers.current.set(book.id, window.setTimeout(() => {
      timers.current.delete(book.id)
      setPending(new Set(timers.current.keys()))
      setBasket(({ cart }) => ({
        cart: changeQuantity(cart, book.id, (cart[book.id] ?? 0) + 1),
        ordered: false,
      }))
      setAnnouncement(`Добавлено в корзину: ${book.title}`)
    }, 400))
  }

  function completeOrder(order: Cart) {
    setBasket(({ cart }) => ({
      cart: Object.entries(order).reduce(
        (remaining, [id, quantity]) => changeQuantity(remaining, id, (remaining[id] ?? 0) - quantity),
        cart,
      ),
      ordered: true,
    }))
  }

  return <ThemeProvider theme={themes[mode]}>
    <GlobalStyle />
    <Header mode={mode} onTheme={selectTheme} count={count} open={open} onOpen={() => setOpen(true)} />
    <div className="visually-hidden" aria-live="polite">{announcement}{count > 0 ? ` · В корзине: ${count}` : ` · В корзине: 0`}</div>
    <Catalog onAdd={addBook} pending={pending} />
    <CartDrawer cart={cart} count={count} total={total} ordered={ordered} open={open} onClose={() => setOpen(false)}
      onChange={(id, quantity) => setBasket(({ cart }) => ({ cart: changeQuantity(cart, id, quantity), ordered: false }))}
      onClear={() => setBasket({ cart: {}, ordered: false })} onOrder={completeOrder} />
  </ThemeProvider>
}
