import styled from 'styled-components'

export const Badge = styled.span<{ $tone: 'genre' | 'discount' | 'count' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  padding: .16rem .55rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: .75rem;
  font-weight: 700;
  background: ${({ theme, $tone }) => ({
    genre: theme.colors.raised, discount: theme.colors.surface, count: theme.colors.accent,
  })[$tone]};
  color: ${({ theme, $tone }) => ({
    genre: theme.colors.accent, discount: theme.colors.danger, count: theme.colors.onAccent,
  })[$tone]};
`
