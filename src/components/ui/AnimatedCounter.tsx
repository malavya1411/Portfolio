"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 1.5 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const numericMatch = value.match(/[\d.]+/);
  const numericString = numericMatch ? numericMatch[0] : "";
  const hasDecimal = numericString.includes(".");
  const decimalPlaces = hasDecimal ? numericString.split(".")[1].length : 0;
  const target = parseFloat(numericString);
  
  const prefix = value.substring(0, value.indexOf(numericString));
  const suffix = value.substring(value.indexOf(numericString) + numericString.length);

  const [displayValue, setDisplayValue] = useState(prefix + "0" + suffix);

  useEffect(() => {
    if (!isInView || isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeProgress = progress * (2 - progress);
      const current = easeProgress * target;
      
      const formattedNumber = current.toFixed(decimalPlaces);
      setDisplayValue(prefix + formattedNumber + suffix);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, target, decimalPlaces, prefix, suffix, duration, value]);

  return <span ref={ref}>{displayValue}</span>;
}
