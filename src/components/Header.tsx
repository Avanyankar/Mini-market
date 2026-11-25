import styled from 'styled-components'
import { themeLabels, type ThemeName } from '../styles/themes'
import { Icon } from './Icon'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'

export const Container = styled.div`
  width: min(100% - clamp(2rem, 7vw, 7rem), 1280px);
  margin-inline: auto;
`
const Bar = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`
const Layout = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  min-height: 72px;
  padding-block: ${({ theme }) => theme.space.sm};
`
const Brand = styled.div`
  font: 700 1.35rem/1.1 ${({ theme }) => theme.typography.display};
`
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`
const Themes = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: .2rem;
  padding: .2rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.medium};
`
const icons = { light: 'sun', dark: 'moon', sepia: 'sepia' } as const

type Props = {
  mode: ThemeName; onTheme: (theme: ThemeName) => void;
  count: number; open: boolean; onOpen: () => void;
}
export function Header({ mode, onTheme, count, open, onOpen }: Props) {
  return <Bar><Layout>
    <Brand>Мини-маркет</Brand>
    <Actions>
      <Themes aria-label="Темы оформления">
        {(Object.keys(themeLabels) as ThemeName[]).map(name => (
          <Button key={name} size="sm" variant={mode === name ? 'secondary' : 'ghost'}
            aria-pressed={mode === name} onClick={() => onTheme(name)}>
            <Icon name={icons[name]} size={15} />{themeLabels[name]}
          </Button>
        ))}
      </Themes>
      <Button variant="outline" aria-expanded={open} aria-haspopup="dialog"
        aria-controls="cart-dialog" onClick={onOpen}>
        <Icon name="bag" />Корзина <Badge $tone="count">{count}</Badge>
      </Button>
    </Actions>
  </Layout></Bar>
}
