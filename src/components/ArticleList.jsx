import './ArticleList.css';
import { memo } from 'react';
import { ReactComponent as Tick } from '../assets/tick.svg';

// eslint-disable-next-line react/prop-types
const Articlelist=memo(({list,handleRemoveStory}) =>{
  return (
     <ul className='item-container'>
      {/* eslint-disable-next-line react/prop-types*/}
      <li style={{ display: 'flex', fontWeight:'700',alignItems:'center' ,fontSize:'20px',marginBottom:'1rem'}}>
        <span style={{ width:"40%" }}>Title</span>
      <span style={{ width:"30%" }}>Author Name</span>
      <span style={{ width:"20%" }}>Comments</span>
        <span style={{ width: "10%" }}>Points</span>
        <span style={{ width: "10%" }}>Actions</span>
        
      </li>
      
      {list.length === 0?<p>There is no data!</p>:list.map((item) => 
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
      <span style={{ width:"20%" }}>{num_comments}</span>
      <span style={{ width: "10%" }}>{points}</span>
     
      <button  className='button'  style={{ width:"10% " }} onClick={()=>handleRemoveStory(article)}><Tick height='30px' width='50px' /></button>
    </li>
  )
  
}
export default Articlelist


