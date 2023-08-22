import {  useEffect,  useRef } from "react";

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
export default InputWithLabel;