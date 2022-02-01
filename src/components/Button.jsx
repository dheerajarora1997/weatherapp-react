import React from 'react';

export default function Button(props) {
  const {buttonType, styleClass, content} = props;
  return (
    <button type={buttonType} className={`btn ${styleClass}`}>
      {content}
    </button>
  );
}