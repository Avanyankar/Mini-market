import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { books, formatPrice } from '../data/books'
import type { Cart } from '../state'
import { Icon } from './Icon'
import { Button } from './ui/Button'

const Dialog = styled.dialog`
  position: fixed;
  inset: 0 0 0 auto;
  margin: 0;
  width: min(100%, 480px);
  max-width: none;
  height: 100dvh;
  max-height: none;
  padding: 0;
  border: 0;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.raised};
  &::backdrop { background: ${({ theme }) => theme.colors.overlay}; }
`
const Panel = styled.aside`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.lg};
  h2 { font: 700 2rem/1.1 ${({ theme }) => theme.typography.display}; }
`
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`
const Items = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    display: grid;
    gap: ${({ theme }) => theme.space.sm};
    padding: ${({ theme }) => theme.space.md} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  p { color: ${({ theme }) => theme.colors.muted}; }
`
const Summary = styled.footer`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  margin-top: auto;
`
const Notice = styled.p`color: ${({ theme }) => theme.colors.success};`
const Empty = styled.div`
  display: grid;
  justify-items: start;
  gap: ${({ theme }) => theme.space.sm};
  padding-block: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.muted};
`

type Props = {
  cart: Cart; count: number; total: number; ordered: boolean; open: boolean; onClose: () => void;
  onChange: (id: string, quantity: number) => void; onClear: () => void; onOrder: (order: Cart) => void;
}
export function CartDrawer({ cart, count, total, ordered, open, onClose, onChange, onClear, onOrder }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const close = useRef<HTMLButtonElement>(null)
  const timer = useRef<number>(undefined)
  const [loading, setLoading] = useState(false)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (open && !element.open) {
      const previouslyFocused = document.activeElement
      element.showModal()
      close.current?.focus()
      return () => {
        element.close()
        if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
      }
    }
  }, [open])

  function checkout() {
    setLoading(true)
    timer.current = window.setTimeout(() => {
      onOrder(cart)
      setLoading(false)
      if (dialog.current?.open) close.current?.focus()
    }, 400)
  }

  return <Dialog ref={dialog} id="cart-dialog" role="dialog" aria-modal="true" aria-labelledby="cart-title"
    onCancel={event => { event.preventDefault(); onClose() }}
    onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <Panel>
      <Row><h2 id="cart-title">Корзина</h2>
        <Button ref={close} variant="outline" size="sm" aria-label="Закрыть корзину" onClick={onClose}>×</Button>
      </Row>
      <Notice role="status">{ordered && !loading ? 'Заказ успешно оформлен!' : ''}</Notice>
      {count === 0 ? <Empty><Icon name="bag" size={32} /><p>Корзина пуста</p>
        <Button variant="secondary" onClick={onClose}>Вернуться в каталог</Button></Empty> : <>
        <Items>
          {books.filter(book => cart[book.id]).map(book => (
            <li key={book.id}>
              <strong>{book.title}</strong>
              <p>{formatPrice(book.price)} за экземпляр</p>
              <Row>
                <Row role="group" aria-label={`Количество: ${book.title}`}>
                  <Button size="sm" variant="outline" disabled={loading}
                    aria-label={`Уменьшить количество: ${book.title}`}
                    onClick={() => { if (cart[book.id] === 1) close.current?.focus(); onChange(book.id, cart[book.id] - 1) }}>−</Button>
                  <span>{cart[book.id]}</span>
                  <Button size="sm" variant="outline" disabled={loading}
                    aria-label={`Увеличить количество: ${book.title}`}
                    onClick={() => onChange(book.id, cart[book.id] + 1)}>+</Button>
                </Row>
                <Button size="sm" variant="ghost" disabled={loading} aria-label={`Удалить: ${book.title}`}
                  onClick={() => { close.current?.focus(); onChange(book.id, 0) }}>Удалить</Button>
              </Row>
            </li>
          ))}
        </Items>
        <Summary>
          <Row aria-live="polite"><strong>Итого · {count} шт.</strong><strong>{formatPrice(total)}</strong></Row>
          <Button size="lg" loading={loading} onClick={checkout}>Оформить заказ</Button>
          <Button variant="outline" disabled={loading}
            onClick={() => { close.current?.focus(); onClear() }}>Очистить корзину</Button>
        </Summary>
      </>}
    </Panel>
  </Dialog>
}
