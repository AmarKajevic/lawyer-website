
'use client';

import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
  className?: string;
}

const AnimatedColumnWrapper = ({ children, className = "" }: AnimatedWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const isImage = className.includes("image");

  const animationClasses = isImage
    ? isVisible
      ? "translate-x-0 opacity-100 delay-500"
      : "-translate-x-96 opacity-0"
    : isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-10 opacity-0";
    

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out  ${animationClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedColumnWrapper;
