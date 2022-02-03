import React from 'react';

export default function SearchInput(props) {
  const {styleClass, htmlType, htmlPlaceholder, searchRef, location} = props;

  return (
    <>
      <input className={`form-control ${styleClass}`} type={htmlType} placeholder={htmlPlaceholder} aria-label="default input example" ref={searchRef} defaultValue={location} />
    </>
  );
}
