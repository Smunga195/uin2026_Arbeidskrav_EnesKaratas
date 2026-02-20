import React from 'react';

function ShoppingItem({ item, onAntallChange, onToggleKjøpt }) {
  const { id, navn, antall, kjøpt } = item;

  return (
    <li>
      <section>
        <article>
          <input
            type="checkbox"
            checked={kjøpt}
            onChange={() => onToggleKjøpt(id)}
            />

          <span className={kjøpt ? 'kjøpt' : ''}>
            {navn}
          </span>
        

          <input
            type="number"
            min="1"
            value={antall}
            onChange={(e) => onAntallChange(id, e.target.value)}
          />
        </article>
      </section>
    </li>
  );
}

export default ShoppingItem;