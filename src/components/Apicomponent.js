import React, { useEffect, useState, useRef } from "react";
import { useFetch } from "../hook/useFetch";

export const Apicomponent = () => {
    const search = useRef("");
    const initialUrl = "https://rickandmortyapi.com/api/character/";
    const [url, setUrl] = useState(initialUrl);
    const { data, loading } = useFetch(url);
  
    const searchCharacter = (name) => {
      setUrl(`https://rickandmortyapi.com/api/character/?name=${name}`);
    };
  
    const showAll = () => {
      setUrl(initialUrl);
      search.current.value = "";
    };
   
  
    useEffect(() => {}, [data]);
  
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-between ">
          <h1>Rick and Morty API</h1>
  
          <div className=" d-flex   col-4 form-floating mb-3 ">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              aria-describedby="button-addon2"
              ref={search}
            />
            <label>Search Character</label>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => searchCharacter(search.current.value)}
            >
              Search
            </button>
  
            <button
              type="button"
              className="btn btn-outline-secondary mx-2"
              onClick={() => showAll()}
            >
              ShowAll
            </button>
          </div>
        </div>
  
        <hr />
        <div className="d-flex justify-content-around row">
          {data != null ? (
            !data.error ? (
              data.result !== null && (
                data.results.map(
                  ({ name, status, gender, species, origin, image }, i) => (
                    <div className="card col-3 my-3 mx-2" key={i}>
                      <img src={image} className="card-img-top" alt={`${name}.png`} />
                      <div className="card-header">
                        <h3 className="card-title">{name}</h3>
                      </div>
                      <div className="card-body">
                        <h5>Status: </h5>
                        <p>{status}</p>
  
                        <h5>Species: </h5>
                        <p>{species}</p>
  
                        <h5>Gender: </h5>
                        <p>{gender}</p>
  
                        <h5>Origin: </h5>
                        <p>{origin.name}</p>
                      </div>
                    </div>

                    )
                )
              ) 
            ) : (
              <div className="alert alert-danger" role="alert">
                <h1>{data.error}</h1>
              </div>
            )
          ) : (
            loading && <h1>Loagind...</h1>
          )}
        </div>
      </div>
    );
  };
  