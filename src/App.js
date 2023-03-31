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
const [toggle , setToggle] = useState(false)
const ondelete=()=>{
  setToggle(!toggle)
}

  const fetchMiveHandler= useCallback(async ()=>{
   setIsLoading(true)
   try{
   const responce = await fetch('https://shapecom-ff571-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json')

   if(!responce.ok){
     throw new Error('SomeThing is Wrong here...');
    }
    const data1 = await responce.json()
    setIsLoading(false)
    console.log(data1)
    const loadMovies =[]
    for(let key in data1){
      loadMovies.push({
        id:key,
        title:data1[key].title,
        openingText:data1[key].openingText,
        releaseDate:data1[key].releaseDate
      })
      }
      setMovieList(loadMovies)
    }
      catch(err){
       setError(err.message)
      }
      
  },[])

  useEffect(()=>{
fetchMiveHandler()
  },[toggle])

  const movieData =async(data)=>{
    const responce = await fetch('https://shapecom-ff571-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
    {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    setToggle(!toggle)
    }

    
  

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={movieData} onadd/>
      </section>
      <section>
        <button onClick={fetchMiveHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? <Loader/> : ( movieList.length> 0 ? <MoviesList movies={movieList} ondelete={ondelete}/>:<h1>Add Movie</h1>)}
        {isLoading && error && <p>{error}</p>}
        
      </section>
    </React.Fragment>
  );
}

export default App;
