import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';


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
const [movieList , setMovieList] = useState([])
const [isLoading , setIsLoading] = useState(false);
const [error , setError] =useState(null)

  useEffect(async ()=>{
    setIsLoading(true)
    await fetch('https://swapi.dev/api/films/').then((responce)=>{
      if(!responce.ok){
        throw new Error('SomeThing is Wrong here...');
       }
       return responce.json()
    }).then((data)=>{

      setIsLoading(false)
          const movie = data.results.map((item)=>{
            return {
              id:item.id,
              title:item.title,
              openingText: item.opening_crawl,
              releaseDate: item.release_date,
            }
          })
          setMovieList(movie)
    }).catch((err)=>{
      setError(err.message)
    })
    
  },[])

  return (
    <React.Fragment>
      <section>
      </section>
      <section>
        {isLoading ? <Loader/> : <MoviesList movies={movieList}/>}
        {isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
