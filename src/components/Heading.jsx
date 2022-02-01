import React from 'react';

export default function Heading(props) {
  const {level, content, styleClass, subContent} = props
  return (
    <h2 className={`${styleClass}`}>{content} <span className="h3 fw-light text-muted">{subContent}</span></h2>
  );
}
