// eslint-disable-next-line react/prop-types
export default function Articlelist({list,handleRemoveStory}) {
  return (
     <ul>
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
    <li >
      <span><a href={url}>{title}</a></span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
      <button onClick={()=>handleRemoveStory(article)}>Delete</button>
    </li>
  )
  
}


