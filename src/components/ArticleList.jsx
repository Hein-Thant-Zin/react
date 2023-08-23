import './ArticleList.css';
import { memo, useState } from 'react';
import { ReactComponent as Tick } from '../assets/tick.svg';
import { sortBy } from 'lodash'

const SORTINGS = {
  NONE: (list) => list,
  TITLE:(list) => sortBy(list,'title'),
  AUTHOR:(list) => sortBy(list,'author'),
  COMMENT: (list) => sortBy(list, 'num_comments').reverse(),
  POINT:(list) => sortBy(list,'points').reverse(),
}

// eslint-disable-next-line react/prop-types
const Articlelist = memo(({ list, handleRemoveStory }) => {
  const [sort, setSort] = useState('NONE')
  const handleSort = (sortKey) => {
    setSort(sortKey);
  }
  const sortFunction = SORTINGS[sort];
  const sortedList = sortFunction(list);
  // sortBy('stories',sort)
  return (
     <ul className='item-container'>

      <li style={{ display: 'flex', fontWeight:'700',alignItems:'center' ,fontSize:'20px',marginBottom:'1rem'}}>
         <span style={{ width: '40%' }}>
          <button onClick={() => handleSort('TITLE')}>Title</button>
        </span>
        <span style={{ width: '30%' }}>
          <button onClick={() => handleSort('AUTHOR')}>Author</button>
        </span>
        <span style={{ width: '10%' }}>
          <button onClick={() => handleSort('COMMENT')}>Comments</button>
        </span>
        <span style={{ width: '10%' }}>
          <button onClick={() => handleSort('POINT')}>Points</button>
        </span>
        <span style={{ width: '10%' }}>Actions</span>
      </li>
      
      {list.length === 0?<p>There is no data!</p>:sortedList.map((item) => 
         (
          <Article key={item.objectID} article={item} handleRemoveStory={handleRemoveStory}/>
        )
      )}
      </ul>
  )
})
// eslint-disable-next-line react/prop-types
function Article({article,handleRemoveStory}) {
  const { url,title ,author,num_comments,points } = article;
  return (
    // eslint-disable-next-line react/prop-types
    <li className='item' >
      <span style={{ width:"40%" }}><a href={url}>{title}</a></span>
      <span style={{ width:"30%" }}>{author}</span>
      <span style={{ width:"10%" }}>{num_comments}</span>
      <span style={{ width: "10%" }}>{points}</span>
      <button  className='button'  style={{ width:"10% " }} onClick={()=>handleRemoveStory(article)}><Tick height='30px' width='50px' /></button>
    </li>
  )
  
}
export default Articlelist


