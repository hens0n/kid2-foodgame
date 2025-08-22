import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeButton from './HomeButton';
import SpinningWheel from './SpinningWheel';
import { restaurants } from '../data/restaurants';

const CategoryPage = ({ category, onHome }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  // Filter restaurants by category
  const categoryRestaurants = restaurants.filter(r => 
    r.categories.includes(category)
  );
  
  const categoryNames = {
    ocr: 'OCR',
    otm: 'OTM',
    desserts: 'Desserts'
  };
  
  const handleResult = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };
  
  const spinAgain = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="category-page">
      <HomeButton onClick={onHome} />
      
      <motion.h2 
        className="category-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {categoryNames[category]}
      </motion.h2>
      
      <SpinningWheel 
        restaurants={categoryRestaurants}
        onResult={handleResult}
      />
      
      <AnimatePresence>
        {selectedRestaurant && (
          <motion.div 
            className="result-container"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="result-title">We're eating at...</h3>
            <motion.div 
              className="result-name"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {selectedRestaurant.name}
            </motion.div>
            <motion.button
              className="spin-again-button"
              onClick={spinAgain}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Spin Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;