import { useId, useRef, type ComponentProps, type ReactNode } from 'react'
import styled from 'styled-components'
import { Button } from './Button'

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  min-width: 0;
  padding: .2rem .55rem .2rem .8rem;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.small};
  &:focus-within { border-color: ${({ theme }) => theme.colors.focus}; }
  input {
    width: 100%;
    min-width: 0;
    padding: .45rem .15rem;
    border: 0;
    border-radius: ${({ theme }) => theme.radii.small};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
  input::placeholder { color: ${({ theme }) => theme.colors.muted}; }
  input::-webkit-search-cancel-button { display: none; }
  button { flex: none; }
`
type Props = ComponentProps<'input'> & {
  label: string; icon?: ReactNode; onClear?: () => void; hideLabel?: boolean
}
export function Input({ label, icon, onClear, hideLabel, id, ...props }: Props) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const input = useRef<HTMLInputElement>(null)
  return <div>
    <label htmlFor={inputId} className={hideLabel ? 'visually-hidden' : undefined}>{label}</label>
    <Field>
      {icon && <span aria-hidden="true">{icon}</span>}
      <input {...props} id={inputId} ref={input} />
      {onClear && props.value && <Button variant="secondary" size="sm" aria-label="Очистить поиск"
        onClick={() => { input.current?.focus(); onClear() }}>×</Button>}
    </Field>
  </div>
}
