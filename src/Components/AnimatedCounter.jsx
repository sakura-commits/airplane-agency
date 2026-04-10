import { useEffect, useState, useRef } from 'react';
import { animate, useInView, useMotionValue } from 'framer-motion';

export const AnimatedCounter = ({ value, duration = 1, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return unsubscribe;
  }, [motionValue]);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, { duration, ease: 'easeOut' });
    return controls.stop;
  }, [isInView, value, duration, motionValue]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};
