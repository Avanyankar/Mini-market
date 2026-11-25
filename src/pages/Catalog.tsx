import { useEffect, useId, useState } from 'react'
import styled from 'styled-components'
import { books, categories, type Category, type Book } from '../data/books'
import { BookCard } from '../components/BookCard'
import { Container } from '../components/Header'
import { Icon } from '../components/Icon'
import { Button } from '../components/ui/Button'
import { Grid } from '../components/ui/Grid'
import { Input } from '../components/ui/Input'
import { Skeleton } from '../components/ui/Skeleton'

const Main = styled(Container).attrs({ as: 'main' })`
  padding-block: clamp(1.25rem, 3vw, 2.3rem) 4rem;
`
const Title = styled.h1`
  font: 700 clamp(2rem, 4vw, 3rem)/1.1 ${({ theme }) => theme.typography.display};
  letter-spacing: -.035em;
`
const Toolbar = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  align-items: center;
  margin-block: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.md};
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) { grid-template-columns: 1fr 19rem; }
`
const Filters = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
`
const Result = styled.p`
  min-height: 1.5rem;
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.muted};
`
const Empty = styled.div`
  display: grid;
  justify-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: 3rem 1rem;
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  background: ${({ theme }) => theme.colors.surface};
`
type Filter = Category | 'Все'
const filters: Filter[] = ['Все', ...categories]
type Props = { onAdd: (book: Book) => void; pending: ReadonlySet<string> }

export function Catalog({ onAdd, pending }: Props) {
  const [filter, setFilter] = useState<Filter>('Все')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const searchId = useId()
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 360)
    return () => window.clearTimeout(timer)
  }, [filter])

  function selectFilter(next: Filter) {
    if (next === filter) return
    setLoading(true)
    setFilter(next)
  }
  const search = query.trim().toLocaleLowerCase('ru')
  const results = books.filter(book => (filter === 'Все' || book.category === filter)
    && [book.title, book.author].some(value => value.toLocaleLowerCase('ru').includes(search)))

  return <Main>
    <section aria-labelledby="catalog-title">
      <Title id="catalog-title">Каталог книг</Title>
      <Toolbar>
        <Filters aria-label="Категории книг">
          {filters.map(name => <Button key={name} variant={filter === name ? 'primary' : 'outline'}
            aria-pressed={filter === name} onClick={() => selectFilter(name)}>{name}</Button>)}
        </Filters>
        <Input id={searchId} type="search" label="Поиск по названию или автору" hideLabel
          placeholder="Название или автор" icon={<Icon name="search" />} value={query}
          onChange={event => setQuery(event.target.value)} onClear={() => setQuery('')} />
      </Toolbar>
      <Result role="status" aria-live="polite">{loading ? 'Загрузка каталога…' : `Найдено книг: ${results.length}`}</Result>
      <div aria-busy={loading}>
        {loading ? <Grid>{Array.from({ length: 4 }, (_, index) => <Skeleton key={index} />)}</Grid>
          : results.length ? <Grid>{results.map(book => (
            <BookCard key={book.id} book={book} onAdd={onAdd} loading={pending.has(book.id)} />
          ))}</Grid> : <Empty>
            <Icon name="search" size={30} />
            <h2>Книги не найдены</h2>
            <p>Попробуйте изменить запрос или выбрать другую категорию.</p>
            <Button onClick={() => { setQuery(''); selectFilter('Все'); document.getElementById(searchId)?.focus() }}>
              Сбросить фильтры
            </Button>
          </Empty>}
      </div>
    </section>
  </Main>
}
