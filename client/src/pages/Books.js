import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Books = () => {

  const [books,setBooks]=useState([])

  useEffect(()=>{
    const fetchAllBooks=async()=>{
      try{
        const res=await axios.get("http://localhost:8800/books")
        setBooks(res.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchAllBooks()
  },[])

  const handleDelete=async(id)=>{
    try{
      await axios.delete("http://localhost:8800/books/"+id)
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div>
      <h1> Book shop</h1>
      <div className='books'>
        {books.map((book)=>(
          <div className="book" key={book.id}>
            {/* {book.cover && <img src="https://imgs.search.brave.com/iNdia1bD3rKW8UvKjZco-enuBdhhU3oJ4p0ropyYfjw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/Ny8wNS8xMC8xOC90/cmVlLTgzMjA3OV82/NDAuanBn" alt="" />} */}
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
           <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
           <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>


          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  )
}

export default Books