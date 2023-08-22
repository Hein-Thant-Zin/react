/* eslint-disable react/prop-types */
import { useCallback, useEffect, useReducer, useState } from "react";
import InputWithLabel from "./components/inPutWithLabel";
import Articlelist from "./components/ArticleList";
import useStorageState from "./hooks/useStorageState";
import axios from "axios";

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
      
      case 'STORIES_FETCH_EMPTY':
        return {
          ...state,
        }
      
      case 'STORIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
        
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
    axios.get(url)
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.hits,     
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
    <InputWithLabel id='search' value={searchTerm} onInputChange={handleSearch}
      label='Search' 
      />
    <button onClick={handleSubmit}>Search</button>
    <hr />
    {stories.isError ?<p>Something went wrong!!</p>:null}
    
    {stories.isLoading  ? (<p>Loading...</p>) : ( <Articlelist list={searchedArticle}
      handleRemoveStory={handleRemoveStory} />)}  
  </>
}

// eslint-disable-next-line react/prop-types





