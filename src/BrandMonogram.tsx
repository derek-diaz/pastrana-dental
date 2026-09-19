/** A crisp vector interpretation of the serif P in Stephanie's logo reference. */
export default function BrandMonogram({
  className = '',
}: {
  className?: string
}) {
  return (
    <svg
      className={`brand-monogram ${className}`.trim()}
      viewBox="0 0 88 112"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M30 14h14v83c0 8 5 11 14 11v2H12v-2c12 0 18-3 18-11V14Z" />
      <path d="M12 4h35c25 0 38 11 38 33 0 23-14 38-40 38h-2v-2h4c20 0 26-13 26-35S65 6 46 6H12V4Z" />
    </svg>
  )
}
