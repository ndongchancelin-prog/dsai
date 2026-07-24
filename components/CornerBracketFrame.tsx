import { ReactNode } from "react";

/** Decorative wrapper with thin gold corner brackets, used around premium sections. */
export default function CornerBracketFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const corner =
    "absolute w-6 h-6 border-or/70 pointer-events-none";
  return (
    <div className={`relative p-6 md:p-10 ${className}`}>
      <span className={`${corner} top-0 left-0 border-t border-l`} />
      <span className={`${corner} top-0 right-0 border-t border-r`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
      {children}
    </div>
  );
}
