export default function SectionCard({
  children,
  className = "",
  ...props
}) {
  return (
    <div
      className={`rounded-xl border border-amber-950 bg-white p-6 text-[#3C1D00] shadow ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
