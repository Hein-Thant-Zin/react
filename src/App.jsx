/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

export default function App() {
 
  const initialStories = [
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

  //mock API fetching
  const getAsyncStories = () => 
    new Promise((resolve) => 
      setTimeout(() => {
        resolve({ data: initialStories })
      }, 2000)
    );
  

  const [searchTerm, setSearchTerm] = useStorageState('search','');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    getAsyncStories().then((result) => {
      setStories(result.data);
      setLoading(false);
    })
  },[])
 
  if (loading) {
    return <p>Loading...</p>
  }
 
  const handleSearch=(event)=>  {
    setSearchTerm(event.target.value);
  }

  const searchedArticle = stories.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
 
  
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      story => story.objectID !== item.objectID
    );

    setStories(newStories);

    
  }
  return <>
    <h1>Hacker News</h1>
    <InputWithLabel  id='search' value={searchTerm} onInputChange={handleSearch} label= 'Search' />
      <hr />
    <Articlelist list={searchedArticle} handleRemoveStory={handleRemoveStory} />
    
  </>
}

// eslint-disable-next-line react/prop-types
function InputWithLabel({
  id, label, value, onInputChange, type = 'text',isFocused
}) {

  const inputRef = useRef(); 


  //persist across re-render
  useEffect(() => {
    //user is focusing that element or not
    //isFocused => user is focusing but dont know which one yet
    //inputRef.current =>user is focusing only one element
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
    //this will work depends on isFocus(whenever the user is focusing)
  }, [isFocused])
  
  
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        //this element will be reference in inputRef.current object
        ref={inputRef} value={value} onChange={onInputChange} type={type} name="" id={id}
      /> 
    </>
  )
}


// eslint-disable-next-line react/prop-types
function Articlelist({list,handleRemoveStory}) {
  return (
     <ul>
      {/* eslint-disable-next-line react/prop-types*/}
      {list.map((item) => 
         (
          <Article key={item.objectID} article={item} handleRemoveStory={handleRemoveStory}/>
        )
      )}
      </ul>
  )
}
// eslint-disable-next-line react/prop-types
function Article({article,handleRemoveStory}) {
  const { url,title ,author,num_comments,points } = article;
  return (
    // eslint-disable-next-line react/prop-types
    <li >
      <span><a href={url}>{title}</a></span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
      <button onClick={()=>handleRemoveStory(article)}>Delete</button>
    </li>
  )
  
}

const useStorageState=(key,initialState) => {
     const [value, setValue] = useState(
    localStorage.getItem(key)||initialState
  );
  useEffect(() => {
    localStorage.setItem(key,value)
  }, [key,value])
  return [value, setValue]; 
}


