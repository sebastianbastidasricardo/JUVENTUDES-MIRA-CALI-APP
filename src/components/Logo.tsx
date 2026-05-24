import React from 'react';

export const MiraLogo = ({ className = 'h-8 w-auto' }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-primary p-1.5 rounded-lg">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <span className="font-black text-xl tracking-tighter text-foreground uppercase">
        Juventudes <span className="text-title-mira-cali">MIRA</span>
      </span>
    </div>
  );
};
