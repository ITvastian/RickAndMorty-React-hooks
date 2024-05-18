import React from "react";

function Character({ character }) {
  return (
    <div>
      <div className="text-center p-5">
        <h3>{character.name}</h3>
        <p>{character.origin.name}</p>
        <img className="img-fluid rounded-pill" src={character.image} alt={character.name} />
      </div>
    </div>
  );
}

export default Character;
