/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import InputWithLabel from "./components/inPutWithLabel";
import Articlelist from "./components/ArticleList";
import useStorageState from "./hooks/useStorageState";
import axios from "axios";
import './App.css';



const API_BASE = 'https://hn.algolia.com/api/v1/';
const API_SEARCH = 'search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const HITS_PER_PAGE='hitsPerPage=11'

const getUrl = (searchTerm,page) => `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${HITS_PER_PAGE}`;
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
          data:
            action.payload.page === 0 ? action.payload.list : state.data.concat(action.payload.list),
          page: action.payload.page,
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

export default function App() {
  const [searchTerm, setSearchTerm] = useStorageState('search', ''); 
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
    page:0, 

  });
  const [url, setUrl] = useState(getUrl(searchTerm,0));

// console.log('stories',stories.data);
  // function calculateSumofComments(items) {
  //   return items.data.reduce((result, value) => result + value.num_comments, 0  
  //   );
  // }
  // const sumOfComments = useMemo(()=>calculateSumofComments(stories),
  // [stories])

  // const sumOfComments = calculateSumofComments(stories);
//  console.log(sumOfComments);
  
  // useEffect(() => {
  //   console.log(sumOfComments);
  // },[stories])
  const handleFetch = useCallback(async() => {
    //  if (!searchTerm) return;
    // setIsLoading(true);
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result=await axios.get(url)
   
    dispatchStories({
      type: 'STORIES_FETCH_SUCCESS',
      payload: {
        list:result.data.hits,
        page:result.data.page
      },
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
    setUrl(getUrl(searchTerm, 0));
  };
  const handleLoadMore = () => {
    setUrl(getUrl(searchTerm,stories.page + 1  ))
  }
  return <section className="container">
    <h1 className="headline">Hacker News</h1>
    <form style={{ float:"right" }} onSubmit={handleSubmit}>
          <InputWithLabel id='search' value={searchTerm} onInputChange={handleSearch}
      
      />
    <button className="btn" type="submit" >Search</button>
    </form>
        <br />
    <hr />
        <br />

    {stories.isError ?<p>Something went wrong!!</p>:null}
    
     
    <Articlelist list={stories.data}
      handleRemoveStory={handleRemoveStory} />
     {stories.isLoading ? (<div style={{ textAlign:'center'  }} ><p >Loading...</p></div>) : (  <div className="btn-container">
      <div style={{ textAlign:'center'  }} >
         <button  className="btn" type="button" onClick={handleLoadMore}>
            Load more...
      </button>
     </div>
    </div>)}
   
  </section>
}

// eslint-disable-next-line react/prop-types





