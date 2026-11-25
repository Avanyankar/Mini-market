import styled from 'styled-components'
import { formatPrice, type Book } from '../data/books'
import { BookCover } from './BookCover'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

const Genre = styled(Badge)`
  align-self: flex-start;
`
const Price = styled.div`
  display: grid;
  strong { font-size: 1.1rem; }
  del { font-size: .75rem; color: ${({ theme }) => theme.colors.muted}; }
`
export function BookCard({ book, onAdd, loading }: { book: Book; onAdd: (book: Book) => void; loading: boolean }) {
  return <Card interactive cover={<BookCover book={book} />} title={book.title} author={book.author}
    price={<Price><strong>{formatPrice(book.price)}</strong>{book.oldPrice && <del>{formatPrice(book.oldPrice)}</del>}</Price>}
    actions={<Button size="sm" loading={loading} onClick={() => onAdd(book)}>В корзину</Button>}>
    <Genre $tone="genre">{book.category}</Genre>
    <p>{book.description}</p>
  </Card>
}
