import React from 'react';

import Button from './Button';
import SearchInput from './SearchInput';
import MaterialIcons from './MaterialIcons';

export default function TopSearchBar(props) {
  return (
    <>
      <SearchInput styleClass='rounded-pill border-light me-2' htmlType='text' htmlPlaceholder='Search' />
      <Button styleClass='btn-warning text-white rounded-pill d-flex justify-content-center p-1' buttonType='button' content={<MaterialIcons materialIcon='search' />}>
      </Button>
    </>
  );
}
