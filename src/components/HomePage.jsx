import { motion } from 'framer-motion';

const HomePage = ({ onCategorySelect }) => {
  const categories = [
    { id: 'ocr', name: 'OCR', color: 'var(--pastel-pink)' },
    { id: 'otm', name: 'OTM', color: 'var(--pastel-blue)' },
    { id: 'desserts', name: 'Desserts', color: 'var(--pastel-purple)' }
  ];

  return (
    <div className="home-page">
      <motion.h1 
        className="game-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        The Food Game
      </motion.h1>
      
      <div className="category-buttons">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            className="category-button"
            style={{ backgroundColor: category.color }}
            onClick={() => onCategorySelect(category.id)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;