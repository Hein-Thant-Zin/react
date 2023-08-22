import './ArticleList.css'
// eslint-disable-next-line react/prop-types
export default function Articlelist({list,handleRemoveStory}) {
  return (
     <ul className='item-container'>
      {/* eslint-disable-next-line react/prop-types*/}
      
      {list.length === 0?<p>There is no data!</p>:list.map((item) => 
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
    <li className='item' >
      <span style={{ width:"40%" }}><a href={url}>{title}</a></span>
      <span style={{ width:"30%" }}>{author}</span>
      <span style={{ width:"20%" }}>{num_comments}</span>
      <span style={{ width:"10%" }}>{points}</span>
      <button className='button' style={{ width:"10%" }} onClick={()=>handleRemoveStory(article)}>Delete</button>
    </li>
  )
  
}


