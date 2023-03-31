import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  
  const deleteHandler=async()=>{
    
  await fetch(`https://shapecom-ff571-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${props.id}.json`, { method: 'DELETE' })
  .then((res)=>res.json())
  .then((res)=>console.log(res,'responce'))
  .catch((err)=>console.log(err))

    props.ondelete()
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
};

export default Movie;
