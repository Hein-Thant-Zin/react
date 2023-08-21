/* eslint-disable react/prop-types */
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

export default function App() {
  
    const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'STORIES_FETCH_INIT':
        return {
          ...state,
          isLoading:true
        };
      
      case 'STORIES_FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      
      case 'STORIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError:true,
        }
        
      case 'REMOVE_STORY': {
        return {
          ...state,
          data:state.data.filter(
        (story) => story.objectID !== action.payload.objectID
        )
        }
      }
      default:
        throw new Error();
    }
  }
  

  const [searchTerm, setSearchTerm] = useStorageState('search', ''); 
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false

  });
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const handleFetch = useCallback(() => {
     if (!searchTerm) return;
    // setIsLoading(true);
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    fetch(url)
      .then(res => res.json())
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,     
      })
      }).catch(() => {
        dispatchStories({
          type: 'STORIES_FETCH_FAILURE',       
      })
    })
  },[url]);
  
  useEffect(() => {
    //early return 
    handleFetch();
  },[url])
 
   
 
  const handleSearch=(event)=>  {
    setSearchTerm(event.target.value);
  }

  const searchedArticle = stories.data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
 
  
  const handleRemoveStory = (item) => {
    // setStories(newStories);
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    })
  };
  const handleSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  }
  return <>
    <h1>Hacker News</h1>
    <InputWithLabel id='search' value={searchTerm} onInputChange={handleSearch} label='Search' />
    <button onClick={handleSubmit}>Search</button>
    <hr />
    {stories.isError ?<p>Something went wrong!!</p>:null}
    
    {stories.isLoading  ? (<p>Loading...</p>) : (<Articlelist list={searchedArticle}
      handleRemoveStory={handleRemoveStory} />)}  
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


