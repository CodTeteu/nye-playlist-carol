import { Sparkles } from "lucide-react";

interface SparkleProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

export const Sparkle = ({ className = "", style, size = 16 }: SparkleProps) => {
  return (
    <Sparkles 
      size={size} 
      className={`text-gold animate-sparkle ${className}`}
      style={style}
    />
  );
};

export const SparkleGroup = () => {
  return (
    <>
      {/* Floating sparkles around the page */}
      <Sparkle 
        className="absolute top-20 left-[10%] opacity-60" 
        size={12}
        style={{ animationDelay: '0s' }}
      />
      <Sparkle 
        className="absolute top-32 right-[15%] opacity-40" 
        size={8}
        style={{ animationDelay: '0.5s' }}
      />
      <Sparkle 
        className="absolute top-48 left-[20%] opacity-50" 
        size={10}
        style={{ animationDelay: '1s' }}
      />
      <Sparkle 
        className="absolute top-40 right-[25%] opacity-30" 
        size={14}
        style={{ animationDelay: '1.5s' }}
      />
      <Sparkle 
        className="absolute top-60 left-[8%] opacity-40" 
        size={8}
        style={{ animationDelay: '0.3s' }}
      />
      <Sparkle 
        className="absolute top-52 right-[10%] opacity-50" 
        size={12}
        style={{ animationDelay: '0.8s' }}
      />
    </>
  );
};
