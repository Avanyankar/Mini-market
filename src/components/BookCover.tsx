import styled from 'styled-components'
import type { Book } from '../data/books'

const Stage = styled.div`
  display: grid;
  justify-items: center;
  align-items: end;
  min-height: 260px;
  padding: ${({ theme }) => theme.space.md};
`
const Jacket = styled.div<{ $cover: number }>`
  width: min(100%, 158px);
  height: 222px;
  padding: .85rem .65rem .75rem .8rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  text-align: center;
  border-radius: 2px 5px 5px 2px;
  border-left: 4px double ${({ theme, $cover }) => theme.covers[$cover].ink};
  background: ${({ theme, $cover }) => theme.covers[$cover].background};
  color: ${({ theme, $cover }) => theme.covers[$cover].ink};
  box-shadow: ${({ theme }) => theme.shadows.raised};
  strong { font: 700 1rem/1.08 ${({ theme }) => theme.typography.display}; }
  small { font-size: .58rem; letter-spacing: .07em; text-transform: uppercase; }
  svg { width: 100%; height: 82px; }
`
const illustrations = [
  'M46 5 60 51 15 24h62L32 51 46 5ZM24 44l-9 8m63-8 9 8M46 16v20',
  'M4 52 24 18l11 18L53 8l33 44H4Zm16-7 10-9 10 10 13-21 20 20',
  'M45 30m-26 0a26 12 0 1 0 52 0 26 12 0 1 0-52 0M45 30m0-26a12 26 0 1 0 0 52 12 26 0 1 0 0-52M42 30h6',
  'M31 12 12 30l19 18m28-36 19 18-19 18M52 7 38 53',
  'M45 52C10 39 12 13 27 13c11 0 18 12 18 12s7-12 18-12c15 0 17 26-18 39ZM45 52V24',
  'M4 49q22-24 44-9t39 1M4 54q23-13 47-5t36-2M57 19a12 12 0 1 0-24 0 12 12 0 1 0 24 0Z',
  'M14 49q22-2 31-40 9 38 31 40M45 9v45M31 45l14-11 14 11M37 29l8-8 8 8',
  'M11 12h20v36H11zm24 9h20v27H35zm24-13h20v40H59zM6 54h78',
]

export function BookCover({ book }: { book: Book }) {
  return <Stage aria-hidden="true">
    <Jacket $cover={book.cover}>
      <small>{book.author}</small>
      <svg viewBox="0 0 90 60" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d={illustrations[book.cover]} />
      </svg>
      <strong>{book.title}</strong>
    </Jacket>
  </Stage>
}
