import React from 'react';

export default function Button(props) {
  const {buttonType, styleClass, children, onSearch} = props;
  return (
    <button type={buttonType} className={`btn ${styleClass}`} onClick={onSearch}>
      {children}
    </button>
  );
}