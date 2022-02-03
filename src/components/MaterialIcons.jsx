import React from 'react';

export default function MaterialIcons(props) {
  const {children} = props;
  return <span className="material-icons-outlined" aria-hidden="true"> {children} </span>;
}
