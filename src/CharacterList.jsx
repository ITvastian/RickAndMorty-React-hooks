import React from "react";
import { useEffect, useState } from "react";
import Character from "./Character";

function NavPage(props) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <p>Page: {props.page}</p>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => props.setPage(props.page + 1)}
      >
        Page {props.page + 1}
      </button>
    </header>
  );
}

function CharacterList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  }, [page]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = data.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
    <h1>Rick and Morty Characters</h1>
    <input
      type="text"
      placeholder="Search characters"
      value={searchTerm}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
    <NavPage page={page} setPage={setPage} />
    <div className="row">
      {data.length > 0 ? (
        filteredData.length > 0 ? (
          filteredData.map((character) => (
            <div className="col-md-4" key={character.id}>
              <Character character={character} />
            </div>
          ))
        ) : (
          <p>No characters found</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </div>
  );
}

export default CharacterList;
