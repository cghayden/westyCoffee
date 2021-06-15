import { motion } from 'framer-motion';
import React from 'react';

function CoffeeStock({ stock }) {
  //get surrent stock
  // const { stock } = useCurrentStock(_id);
  //   const stock = 1;
  return (
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {stock > 0 ? `- only ${stock} lbs. left -` : `Out of Stock`}
    </motion.p>
  );
}

export default CoffeeStock;
