/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function App() {
 
  const articles = [
  {
    title: 'React',
    url: 'https://reactjs.dev/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.dev/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  ];

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search key'||'')
  );
  useEffect(() => {
    localStorage.setItem('search key',searchTerm)
  }, [searchTerm])

  const handleSearch=(event)=>  {
    setSearchTerm(event.target.value);
  }

  const searchedArticle = articles.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  
  return <>
    <h1>Hacker News</h1>
    <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      <hr />
     
    <Articlelist list={searchedArticle } />
    
  </>
}

// eslint-disable-next-line react/prop-types
function Search({handleSearch,searchTerm}) {
  
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input value={searchTerm} onChange={handleSearch} type="text" name="" id="" /> 
    </div>
  )
}


// eslint-disable-next-line react/prop-types
function Articlelist({list}) {
  return (
     <ul>
      {/* eslint-disable-next-line react/prop-types*/}
      {list.map((item) => 
         (
          <Article key={item.objectID} article={item} />
        )
      )}
      </ul>
  )
}
// eslint-disable-next-line react/prop-types
function Article({article}) {
  const { url,title ,author,num_comments,points } = article;
  return (
    // eslint-disable-next-line react/prop-types
    <li >
      <span><a href={url}>{title}</a></span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </li>
  )
  
}


