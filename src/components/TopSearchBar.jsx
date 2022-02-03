import React from 'react';

import Button from './Button';
import SearchInput from './SearchInput';
import MaterialIcons from './MaterialIcons';

export default function TopSearchBar(props) {
  return (
    <>
      <form onSubmit={props.onSearch} className="w-100">
        <SearchInput styleClass='rounded-pill border mb-3 text-capitalize' htmlType='text' htmlPlaceholder='Search' searchRef={props.searchRef} location={props.location} />
      </form>
    </>
  );
}
