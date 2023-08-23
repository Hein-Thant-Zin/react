/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import InputWithLabel from "./components/inPutWithLabel";
import Articlelist from "./components/ArticleList";
import useStorageState from "./hooks/useStorageState";
import axios from "axios";
import './App.css';



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
console.log('stories',stories.data);
  function calculateSumofComments(items) {
    return items.data.reduce((result, value) => result + value.num_comments, 0  
    );
  }
  const sumOfComments = useMemo(()=>calculateSumofComments(stories),
  [stories])

  // const sumOfComments = calculateSumofComments(stories);
//  console.log(sumOfComments);
  
  useEffect(() => {
    console.log(sumOfComments);
  },[stories])
  const handleFetch = useCallback(async() => {
    //  if (!searchTerm) return;
    // setIsLoading(true);
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result=await axios.get(url)
   
    dispatchStories({
      type: 'STORIES_FETCH_SUCCESS',
      payload: result.data.hits,
    });  
    } catch {
       dispatchStories({
      type: 'STORIES_FETCH_FAILURE',
    });
   }
   
  },[url]);
  
  useEffect(() => {
    //early return 
    handleFetch();
  },[handleFetch])
 
   
 
  const handleSearch=(event)=>  {
    setSearchTerm(event.target.value);
  }
  const handleRemoveStory = useCallback(
    (item) => {
      // setStories(newStories);
      dispatchStories({
        type: 'REMOVE_STORY',
        payload: item,
      })
    }
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  }
  return <section className="container">
    <h1 className="headline">Hacker News</h1>
    <form onSubmit={handleSubmit}>
          <InputWithLabel id='search' value={searchTerm} onInputChange={handleSearch}
      label='Search' 
      />
    <button type="submit" >Search</button>
    </form>
        <br />
    <hr />
        <br />

    {stories.isError ?<p>Something went wrong!!</p>:null}
    
    {stories.isLoading  ? (<p>Loading...</p>) : ( <Articlelist list={stories.data}
      handleRemoveStory={handleRemoveStory} />)}  
  </section>
}

// eslint-disable-next-line react/prop-types





