import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({ children, className = "", style: externalStyle, onClick, strength = 0.3, as: Tag = "button", href, target, rel }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [magnetStyle, setMagnetStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagnetStyle({ transform: `translate(${x * strength}px, ${y * strength}px)`, transition: "transform 0.1s ease" });
  };

  const handleMouseLeave = () => {
    setMagnetStyle({ transform: "translate(0, 0)", transition: "transform 0.5s ease" });
  };

  const mergedStyle = { ...externalStyle, ...magnetStyle };
  const props: any = { ref, className, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, onClick, style: mergedStyle };
  if (Tag === "a") { props.href = href; props.target = target; props.rel = rel; }

  return <Tag {...props}>{children}</Tag>;
}