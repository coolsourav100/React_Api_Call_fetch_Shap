import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const dummyMovies = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ];
const [movieList , setMovieList] = useState([...dummyMovies])
 const fetchMiveHandler= async ()=>{
    const responce = await fetch('https://swapi.dev/api/films/')
    let data = await responce.json();
    
        const movie = data.results.map((item)=>{
          return {
            id:item.id,
            title:item.title,
            openingText: item.opening_crawl,
            releaseDate: item.release_date,
          }
        })
       setMovieList(movie)
      
    
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMiveHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movieList} />
      </section>
    </React.Fragment>
  );
}

export default App;
