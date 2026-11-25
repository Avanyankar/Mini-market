import type { ReactNode } from 'react'
import styled from 'styled-components'

export const CardFrame = styled.article<{ $interactive?: boolean }>`
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: box-shadow .18s;
  &:hover, &:focus-within {
    box-shadow: ${({ theme, $interactive }) => $interactive ? theme.shadows.raised : theme.shadows.card};
  }
`
const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  h2 { font: 700 1.275rem/1.2 ${({ theme }) => theme.typography.display}; }
  p { color: ${({ theme }) => theme.colors.muted}; font-size: ${({ theme }) => theme.typography.small}; }
`
const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space.sm};
`
type Props = {
  cover: ReactNode; title: ReactNode; author: ReactNode; price: ReactNode;
  actions: ReactNode; children?: ReactNode; interactive?: boolean
}
export function Card({ cover, title, author, price, actions, children, interactive }: Props) {
  return <CardFrame $interactive={interactive}>
    {cover}
    <Body>
      <h2>{title}</h2>
      <p>{author}</p>
      {children}
      <Footer>{price}{actions}</Footer>
    </Body>
  </CardFrame>
}
