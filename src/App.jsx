import { useState } from 'react';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage('category');
  };

  const handleHome = () => {
    setCurrentPage('home');
    setSelectedCategory(null);
  };

  return (
    <div className="app">
      {currentPage === 'home' ? (
        <HomePage onCategorySelect={handleCategorySelect} />
      ) : (
        <CategoryPage 
          category={selectedCategory}
          onHome={handleHome}
        />
      )}
    </div>
  );
}

export default App;