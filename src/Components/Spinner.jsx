import { motion } from 'framer-motion';

export const Spinner = ({ size = 40, color = 'var(--primary-color)' }) => (
  <motion.div
    className="spinner"
    style={{
      width: size,
      height: size,
      border: `3px solid ${color}20`,
      borderTopColor: color,
      borderRadius: '50%'
    }}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  />
);

export const FullPageLoader = () => (
  <div className="full-page-loader">
    <Spinner size={60} />
    <p>Loading...</p>
  </div>
);
