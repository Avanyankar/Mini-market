type IconName = 'bag' | 'search' | 'sun' | 'moon' | 'sepia'
const paths: Record<IconName, string> = {
  bag: 'M5 8h14l2 13H3L5 8zm4 1V6a3 3 0 0 1 6 0v3',
  search: 'M20 20l-4-4m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1m-3 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  moon: 'M21 14a9 9 0 1 1-11-11 7 7 0 0 0 11 11Z',
  sepia: 'M5 20h14M8 16l4-12 4 12m-7-3h6',
}
export function Icon({ name, size = 19 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={paths[name]} />
  </svg>
}
