import React, { useState } from 'react';

function AddForm({ onAdd }) {
  const [navn, setNavn] = useState('');
  const [antall, setAntall] = useState('');
  const [error, setError] = useState('');

  const leggTilVare = (e) => {
    // Hindrer at siden refresher når skjema sendes
    // Kilde: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    e.preventDefault();

    const trimmedNavn = navn.trim();
    const trimmedAntall = antall.trim();

    if (!trimmedNavn && !trimmedAntall) {
      setError('Varenavn og antall må fylles ut.');
      return;
    }
    if (!trimmedNavn) {
      setError('Varenavn må fylles ut.');
      return;
    }
    if (!trimmedAntall) {
      setError('Antall må fylles ut.');
      return;
    }

    const antallTallNum = Number(trimmedAntall);

    // Number.isNaN sjekker om verdien ikke er et gyldig tall
    // Kilde: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
    if (Number.isNaN(antallTallNum) || antallTallNum <= 0) {
      setError('Antall må være et positivt tall.');
      return;
    }

    onAdd(trimmedNavn, antallTallNum);

    // Nullstiller skjemaet etter innsending
    setNavn('');
    setAntall('');
    setError('');
  };

 return (
    <form onSubmit={leggTilVare}>
      
      <fieldset>
        <legend>Ny vare</legend>

        <label htmlFor="name">Vare</label>
        <input
          type="text"
          id="name"
          value={navn}
          onChange={(e) => setNavn(e.target.value)}
          placeholder="Egg..."
        />

        <label htmlFor="amount">Antall</label>
        <input
          id="amount"
          type="number"
          min="1"
          value={antall}
          onChange={(e) => setAntall(e.target.value)}
          placeholder="0"
        />
      </fieldset>

      {error && <p className="error">{error}</p>}

      <button type="submit">Legg til vare</button>
    </form>
  );
}

export default AddForm;