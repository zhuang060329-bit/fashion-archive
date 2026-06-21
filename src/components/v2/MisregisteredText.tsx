// Zine / 影印機套印錯位效果——用在 1970s contrast-grid 板，模擬 DIY 印刷
// 對不準色版的視覺，但偏移量極小（CSS ::before/::after + attr(data-text)），
// reduced-motion 時自動關閉（見 globals.css），不影響可讀性。
// intensity="double" 疊兩層不同色相的錯位殘影，給標題級文字用；
// "single" 只疊一層，給次要文字用，避免整版都過曝。
export function MisregisteredText({
  children,
  as = 'span',
  intensity = 'single',
}: {
  children: string
  as?: 'span' | 'p'
  intensity?: 'single' | 'double'
}) {
  const Tag = as
  return (
    <Tag
      className={intensity === 'double' ? 'lab-misregister-double' : 'lab-misregister'}
      data-text={children}
    >
      {children}
    </Tag>
  )
}
