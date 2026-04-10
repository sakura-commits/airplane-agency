import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', hover = true }) => (
  <motion.div
    className={`glass-card-modern ${className}`}
    whileHover={hover ? { y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } : {}}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);
