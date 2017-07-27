import React from 'react';
import { Input } from 'reactstrap';

export default ({query, handleSubmit, handleChange}) => {
  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <Input value={query} placeholder='Search NASA' onChange={handleChange} />
      </form>
    </div>
  )
}
