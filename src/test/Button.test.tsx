import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from 'styled-components'
import { Button } from '../components/ui/Button'
import { themes } from '../styles/themes'

describe('Button', () => {
  it('renders distinct styles for every variant and size using transient props', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost'] as const
    const sizes = ['sm', 'md', 'lg'] as const
    render(<ThemeProvider theme={themes.light}>
      {variants.flatMap(variant => sizes.map(size =>
        <Button key={`${variant}-${size}`} variant={variant} size={size}>{variant}-{size}</Button>,
      ))}
    </ThemeProvider>)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(12)
    expect(new Set(buttons.map(button => button.className)).size).toBe(12)
    for (const button of buttons) {
      expect(button).toBeEnabled()
      for (const attribute of button.getAttributeNames()) {
        expect(attribute).not.toMatch(/^\$|^(variant|size|loading)$/)
      }
    }
  })

  it('shows an animated spinner and blocks activation while busy', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { rerender } = render(<ThemeProvider theme={themes.light}>
      <Button loading onClick={onClick}>Добавить</Button>
    </ThemeProvider>)
    const button = screen.getByRole('button', { name: 'Добавить' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    const spinner = button.querySelector('span')!
    expect(spinner).toHaveAttribute('aria-hidden', 'true')
    expect(getComputedStyle(spinner).animation).toContain('infinite')
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
    rerender(<ThemeProvider theme={themes.light}><Button onClick={onClick}>Добавить</Button></ThemeProvider>)
    await user.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })
})
