import React from 'react';

export default

React.forwardRef(
  function SearchInput(props, ref) {
    const {styleClass, htmlType, htmlPlaceholder, location} = props;

    return (
      <>
        <input className={`form-control ${styleClass}`} type={htmlType} placeholder={htmlPlaceholder} aria-label="default input example" ref={ref} defaultValue={location} />
      </>
    );
  }
);


