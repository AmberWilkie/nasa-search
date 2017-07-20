import React from 'react';
import { Input } from 'reactstrap';

const QueryBox = (props) => {
  const {
    query,
    handleChange,
    handleSubmit
  } = props;
  return (
    <div className='search-box'>
      <form onSubmit={handleSubmit}>
        <Input value={query} placeholder='Search NASA' onChange={handleChange} />
      </form>
    </div>
  )
}

export default QueryBox;
