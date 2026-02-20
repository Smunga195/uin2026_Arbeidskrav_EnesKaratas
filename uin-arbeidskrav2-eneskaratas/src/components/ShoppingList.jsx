import React from 'react';
import ShoppingItem from './ShoppingItem';

function ShoppingList({ varer, onAntallChange, onToggleKjøpt }) {
  if (!varer || varer.length === 0) {
    return <p className="empty">Handlelisten er tom.</p>;
  }

  return (
    <ul className="shopping-list" aria-label="handleliste">
      
      {varer.map(item => (
        <ShoppingItem
          key={item.id}
          item={item}
          onAntallChange={onAntallChange}
          onToggleKjøpt={onToggleKjøpt}
        />
      ))}
    </ul>
  );
}

export default ShoppingList;