import React, { useRef } from 'react';

export default function About() {

  const inputRef = useRef(null)
  const buttonClick = () => {
    let inputValue = inputRef.current.value;
    console.log(inputValue);
  }
  return (
    <div>
      <input type="text" className="" ref={inputRef} defaultValue="10" />
      <button onClick={buttonClick}>click</button>
    </div>
  );
}
