import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT, useGlobalContext } from './context'

const SingleMovie = () => {
  const {id} = useParams()
  const [movie, setMovies] = useState({})
  const [isLoading, setIsLoading]=useState(true)
  const [error, setError] =useState({show:false, msg:''})

const fetchMovies = async(url)=>{
  const response = await fetch(url)
  const data = await response.json()
  if (data.Response == 'False'){
    setError({show:true, msg:data.Error})
    setIsLoading(false)
  } else {
    setMovies(data)
    setIsLoading(false)
  }

}

useEffect(()=>{
  fetchMovies(`${API_ENDPOINT}&i=${id}`) 
}, [id])

if(isLoading){
  return <div className='loading'>

  </div>
}

if (error.show){
  return <div className='page-error'>
    <h1>{error.msg}</h1>
    <Link to='/' className='btn'> back to movies</Link>
 

  </div>
}
const {Poster:poster, Title:title, Plot:plot, Year:year} = movie

  return <section className='single-movie'>
    <img src={poster} alt={title} />
    <div className="single-movie-info">
      <h2>{title}</h2>
      <p>{plot}</p>
      <h4>{year}</h4>
      <Link to='/' className='btn'> Back to Movies</Link>
    </div>

  </section>
}

export default SingleMovie
