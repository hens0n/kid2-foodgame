import { motion } from 'framer-motion';

const HomeButton = ({ onClick }) => {
  return (
    <motion.button
      className="home-button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      🏠 Home
    </motion.button>
  );
};

export default HomeButton;