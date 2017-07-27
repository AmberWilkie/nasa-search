import React from 'react';
import { Button } from 'reactstrap';

export default ({saved, results, handleSave}) => {
  return (
    <div className="results">
      {saved && <div>{saved.length} items saved</div>}
      {results && results.map( result => (
        <div key={result.href}>
          <h3>{result.data[0].title}</h3>
          <p>{result.data[0].description}</p>
          <img src={result.links[0].href} className="nasaImage"/>
          <br />
          <Button color="success" onClick={() => handleSave(result)}>Save</Button>
          <hr />
        </div>
      ))}
  </div>
  )
}
