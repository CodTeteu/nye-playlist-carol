interface ChampagneGlassProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ChampagneGlass = ({ className = "", style }: ChampagneGlassProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`text-gold transition-colors duration-300 ${className}`}
      style={style}
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M8 2h8l-1.5 9a3 3 0 01-2.5 2.5V18h3v2H9v-2h3v-4.5a3 3 0 01-2.5-2.5L8 2z"
        className="drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" fill="rgba(212,175,55,0.1)" />
      <path d="M9.5 4h5" strokeLinecap="round" strokeOpacity="0.5" />
      <circle cx="12" cy="6" r="0.5" fill="currentColor" className="animate-pulse" />
      <circle cx="11" cy="8" r="0.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '300ms' }} />
      <circle cx="13" cy="9" r="0.5" fill="currentColor" className="animate-pulse" style={{ animationDelay: '700ms' }} />
    </svg>
  );
};
