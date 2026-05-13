import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({ children, className = "", onClick, strength = 0.3, as: Tag = "button", href, target, rel }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setStyle({ transform: `translate(${x * strength}px, ${y * strength}px)`, transition: "transform 0.1s ease" });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: "translate(0, 0)", transition: "transform 0.5s ease" });
  };

  const props: any = { ref, className, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, onClick, style };
  if (Tag === "a") { props.href = href; props.target = target; props.rel = rel; }

  return <Tag {...props}>{children}</Tag>;
}