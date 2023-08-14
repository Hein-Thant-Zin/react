import { useState } from "react";

function getName(name) {
  return name;
}

export default function App() {
  const articles = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
  // const author = 'luuu';
  return <>
    <h1>Hacker News</h1>
    <h1>Hello{getName('hein')}</h1>
    <Search />
      <hr />
     
    <Articlelist list={articles} />
  </>
}

// eslint-disable-next-line react/prop-types
function Articlelist({list}) {
  return (
     <ul>
      {/* eslint-disable-next-line react/prop-types*/}
      {list.map((item) => 
         (
          <li key={item.objectID}>{ item.title}</li>
        )
      )}
      </ul>
  )
}
function Search() {
  const [searchTerm,setSearchTerm ]= useState('');
  function handleChange(event) {
    // console.log(event.target.value)
    // searchTerm = event.target.value;
    setSearchTerm(event.target.value);
    
  }
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input onChange={handleChange} type="text" name="" id="" />
      <p>{ searchTerm}</p>
    </div>
  )
}