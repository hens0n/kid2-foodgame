import { useState } from 'react';
import { motion } from 'framer-motion';

const SpinningWheel = ({ restaurants, onResult }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  const colors = [
    'var(--pastel-pink)',
    'var(--pastel-purple)',
    'var(--pastel-green)',
    'var(--pastel-blue)',
    'var(--pastel-yellow)',
    'var(--pastel-orange)',
    'var(--pastel-lavender)',
    'var(--pastel-sky)',
    'var(--pastel-peach)',
    'var(--pastel-mint)'
  ];

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Random spin between 5 to 10 full rotations plus random final position
    const spins = Math.floor(Math.random() * 5) + 5;
    const finalAngle = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + finalAngle;
    
    setRotation(totalRotation);
    
    // Calculate selected restaurant after spin completes
    setTimeout(() => {
      const normalizedAngle = totalRotation % 360;
      const segmentAngle = 360 / restaurants.length;
      const selectedIndex = Math.floor((360 - normalizedAngle) / segmentAngle) % restaurants.length;
      
      setIsSpinning(false);
      onResult(restaurants[selectedIndex]);
    }, 3000);
  };

  const segmentAngle = 360 / restaurants.length;

  return (
    <div className="wheel-container">
      <div className="wheel-wrapper">
        <motion.div
          className="spinning-wheel"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <svg viewBox="0 0 400 400" className="wheel-svg">
            {restaurants.map((restaurant, index) => {
              const startAngle = index * segmentAngle;
              const endAngle = (index + 1) * segmentAngle;
              const color = colors[index % colors.length];
              
              // Convert angles to radians
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
              // Calculate path coordinates
              const x1 = 200 + 180 * Math.cos(startRad);
              const y1 = 200 + 180 * Math.sin(startRad);
              const x2 = 200 + 180 * Math.cos(endRad);
              const y2 = 200 + 180 * Math.sin(endRad);
              
              // Large arc flag (for segments > 180 degrees)
              const largeArc = segmentAngle > 180 ? 1 : 0;
              
              const pathData = `
                M 200 200
                L ${x1} ${y1}
                A 180 180 0 ${largeArc} 1 ${x2} ${y2}
                Z
              `;
              
              // Calculate text position
              const textAngle = (startAngle + endAngle) / 2;
              const textRad = (textAngle * Math.PI) / 180;
              const textX = 200 + 120 * Math.cos(textRad);
              const textY = 200 + 120 * Math.sin(textRad);
              
              return (
                <g key={restaurant.id}>
                  <path
                    d={pathData}
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {restaurant.name.length > 12 
                      ? restaurant.name.substring(0, 10) + '...' 
                      : restaurant.name}
                  </text>
                </g>
              );
            })}
            
            {/* Center circle */}
            <circle cx="200" cy="200" r="30" fill="white" stroke="#333" strokeWidth="2" />
          </svg>
        </motion.div>
        
        {/* Pointer */}
        <div className="wheel-pointer">▼</div>
      </div>
      
      <motion.button
        className="spin-button"
        onClick={spin}
        disabled={isSpinning}
        whileHover={{ scale: isSpinning ? 1 : 1.05 }}
        whileTap={{ scale: isSpinning ? 1 : 0.95 }}
      >
        {isSpinning ? 'Spinning...' : 'SPIN!'}
      </motion.button>
    </div>
  );
};

export default SpinningWheel;