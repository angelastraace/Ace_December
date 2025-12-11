// src/components/EntityCard.tsx
import type { ReactNode } from "react";

type EntityCardProps = {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
};

export function EntityCard({
  title,
  subtitle,
  badge,
  children,
  footer,
}: EntityCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3 py-3 md:px-4 md:py-3 flex flex-col gap-2">
      {/* Header: title + badge */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xs font-semibold text-slate-100">{title}</div>
          {subtitle ? (
            <div className="text-[11px] font-mono text-slate-500">
              {subtitle}
            </div>
          ) : null}
        </div>
        {badge ? badge : null}
      </div>

      {/* Body */}
      {children ? <div className="mt-1">{children}</div> : null}

      {/* Footer */}
      {footer ? (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
