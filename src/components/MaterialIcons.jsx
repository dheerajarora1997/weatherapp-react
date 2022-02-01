import React from 'react';

export default function MaterialIcons(props) {
  const {materialIcon} = props;
  return <span className="material-icons-outlined" aria-hidden="true"> {materialIcon} </span>;
}
