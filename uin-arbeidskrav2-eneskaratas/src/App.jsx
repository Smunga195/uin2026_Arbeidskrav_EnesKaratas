import React, { useState } from 'react';
import './App.css';
import AddForm from "./components/AddForm";
import ShoppingList from './components/ShoppingList';

function App() {
  // useState holder en array med objekter der hvor hver vare et et objekt med id, navn, antall og kjøpt.
  // Kilde: https://react.dev/reference/react/useState
  const [varer, setItems] = useState([
    { id: 1, navn: 'Egg', antall: 1, kjøpt: true },
    { id: 2, navn: 'Melk', antall: 2, kjøpt: false },
  ]);

  const leggTilVare = (navn, antall) => {
    // Math.max(...array.map()) brukes for å finne den høyeste id'en
    // ... (spread operator) sprer arrayen inn i Math.max
    // Kilde : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
    //       : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const nyId = varer.length > 0 ? Math.max(...varer.map(i => i.id)) + 1 : 1;
    const nyItem = { id: nyId, navn, antall: Number(antall), kjøpt: false };
    
    // Lager en ny array i stedet for å endre den gamle "immutuble update"
    // Kilde: https://react.dev/learn/updating-arrays-in-state
    setItems([nyItem, ...varer]);
  };

  const oppdaterAntall = (id, nyAntall) => {
    const antallTall = Number(nyAntall);

    // Number.isNaN er tryggere enn vanlig isNaN
    // Kilde: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
    if (Number.isNaN(antallTall)) return;

    // map brukes for å oppdatere ett bestemt element i arrayen
    // Kilde: https://react.dev/learn/updating-arrays-in-state
    setItems(prev => 
      prev.map(vare => 
        vare.id === id ? { ...vare, antall: antallTall } : vare));
  };

  const toggleKjøpt = (id) => {
    // bruker spread med ...vare for å kopiere objektet og endrer bare kjøpt verdien
    // Kilde: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    setItems(prev => 
      prev.map(vare => 
        vare.id === id ? { ...vare, kjøpt: !vare.kjøpt } : vare));
  };

 return (
    <main className="card">
      <header>
        <h1>Handleliste</h1>
      </header>

      <section>
        <AddForm onAdd={leggTilVare} />
      </section>
      <section>
        <ShoppingList
          varer={varer}
          onAntallChange={oppdaterAntall}
          onToggleKjøpt={toggleKjøpt}
        />
      </section>
    </main>
  );
}

export default App;