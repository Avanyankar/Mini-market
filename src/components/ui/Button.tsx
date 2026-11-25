import type { ComponentProps, ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type Size = 'sm' | 'md' | 'lg'

const sizes = {
  sm: { height: '36px', padding: '.65rem', font: '.875rem' },
  md: { height: '42px', padding: '.9rem', font: '.875rem' },
  lg: { height: '48px', padding: '1.2rem', font: '1rem' },
}

const Control = styled.button<{ $variant: Variant; $size: Size; $loading: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};
  min-height: ${({ $size }) => sizes[$size].height};
  padding: .25rem ${({ $size }) => sizes[$size].padding};
  font-size: ${({ $size }) => sizes[$size].font};
  font-weight: 650;
  border: 1px solid ${({ theme, $variant }) => $variant === 'outline' ? theme.colors.border : 'currentColor'};
  border-radius: ${({ theme }) => theme.radii.small};
  background: ${({ theme, $variant }) => ({
    primary: theme.colors.accent, secondary: theme.colors.raised,
    outline: theme.colors.surface, ghost: theme.colors.background,
  })[$variant]};
  color: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.onAccent : theme.colors.accent};
  ${({ $variant }) => $variant !== 'outline' && 'border-width: 0;'}
  cursor: ${({ $loading }) => $loading ? 'progress' : 'pointer'};
  transition: background .16s, transform .16s;
  &:hover:not(:disabled) {
    background: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.hover : theme.colors.raised};
  }
  &:active:not(:disabled) {
    background: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.active : theme.colors.disabled};
    transform: translateY(1px);
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
    cursor: ${({ $loading }) => $loading ? 'progress' : 'not-allowed'};
  }
`
const rotate = keyframes`to { transform: rotate(1turn); }`
const Spinner = styled.span`
  width: 1em;
  height: 1em;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.disabledText};
  border-radius: 50%;
  animation: ${rotate} .65s linear infinite;
`

type Props = ComponentProps<'button'> & {
  variant?: Variant; size?: Size; loading?: boolean; children: ReactNode
}

export function Button({
  variant = 'primary', size = 'md', type = 'button', loading = false,
  disabled, children, ...props
}: Props) {
  return (
    <Control {...props} type={type} disabled={disabled || loading} aria-busy={loading || undefined}
      $variant={variant} $size={size} $loading={loading}>
      {loading && <Spinner aria-hidden="true" />}
      {children}
    </Control>
  )
}
