import styled, { keyframes } from 'styled-components'
import { CardFrame } from './Card'

const shimmer = keyframes`from { background-position: 150% 0; } to { background-position: -50% 0; }`
const Block = styled.div<{ $height: string; $width?: string }>`
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width ?? '100%'};
  border-radius: ${({ theme }) => theme.radii.small};
  background: linear-gradient(105deg, ${({ theme }) => theme.colors.skeleton} 35%,
    ${({ theme }) => theme.colors.shimmer} 50%, ${({ theme }) => theme.colors.skeleton} 65%);
  background-size: 220% 100%;
  animation: ${shimmer} 1.4s linear infinite;
`
const Lines = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.md};
`
export function Skeleton() {
  return <CardFrame as="div" aria-hidden="true">
    <Block $height="260px" />
    <Lines>
      <Block $height="1.4rem" $width="85%" />
      <Block $height="1rem" $width="55%" />
      <Block $height="2rem" />
      <Block $height="2.6rem" />
    </Lines>
  </CardFrame>
}
