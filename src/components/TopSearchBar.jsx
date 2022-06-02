import React from 'react';
import Button from './Button';

export default React.forwardRef(
  function TopSearchBar(props, ref) {
    return (
      <form onSubmit={props.onSubmit} className="w-100">
        <label className={`small text-light mb-1 text-left ${props.dataAvailable == undefined ? 'd-block' : 'd-none'}`} htmlFor="">Search for City</label>
        <input className='form-control rounded-pill border mb-3 text-capitalize' type='text' placeholder='Search' aria-label="default input example" ref={ref} defaultValue={props.location} />
      </form>

    );
  }
)
