import React from 'react';

export default function Heading(props) {
  const { level, content, styleClass, subContent } = props
  return (
    <div className="">
      <h3 className={`${styleClass}`}>{content} <span className="">{subContent}</span></h3>
    </div>

  );
}
