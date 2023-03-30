import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviesList from './components/MoviesList';
import './App.css';
import Loader from './components/Loader';
import { Button } from 'bootstrap';
import AddMovie from './components/AddMovie';

function App() {
const [movieList , setMovieList] = useState([])
const [isLoading , setIsLoading] = useState(false);
const [error , setError] =useState(null)

  const fetchMiveHandler= useCallback(async ()=>{
   setIsLoading(true)
   try{
   const responce = await fetch('https://swapi.dev/api/films/')

   if(!responce.ok){
     throw new Error('SomeThing is Wrong here...');
    }
    let data = await responce.json();
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
      }
      catch(err){
         
       setError(err.message)
      }
      
    
  },[])

  useEffect(()=>{
fetchMiveHandler()
  },[])

  const movieData =(data)=>{
    setMovieList([...movieList,data])
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={movieData}/>
      </section>
      <section>
        <button onClick={fetchMiveHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? <Loader/> : <MoviesList movies={movieList}/>}
        {isLoading && error && <p>{error}</p>}
        
      </section>
    </React.Fragment>
  );
}

export default App;
