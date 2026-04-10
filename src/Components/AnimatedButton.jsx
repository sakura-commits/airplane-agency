import { motion } from 'framer-motion';

const buttonClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline'
};

export const AnimatedButton = ({ children, onClick, variant = 'primary', loading = false, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className={buttonClasses[variant] || buttonClasses.primary}
    onClick={onClick}
    disabled={loading}
    {...props}
  >
    {loading ? <span className="button-loader" /> : children}
  </motion.button>
);
