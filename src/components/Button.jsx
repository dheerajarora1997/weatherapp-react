import React from 'react';

export default function Button(props) {
  const {buttonType, styleClass, content, onSearch} = props;
  return (
    <button type={buttonType} className={`btn ${styleClass}`} onClick={onSearch}>
      {content}
    </button>
  );
}