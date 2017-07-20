import React from 'react';
import { Button } from 'reactstrap';

const ResultsList = (props) => {
  const {
    results,
    noResults,
    saved,
    handleSave
  } = props;
  return (
    <div className="results">
      {results && results.map( result => {
        const alreadyAdded = saved.find(item => item === result);
        return (
          <div key={result.href}>
            <h3>{result.data[0].title}</h3>
            <p>{result.data[0].description}</p>
            <img src={result.links[0].href} className="nasaImage"/>
            <br />
            { alreadyAdded ?
              <Button color="warning">Saved</Button> :
              <Button color="success" onClick={() => handleSave(result)}>Save</Button>
            }
            <hr />
          </div>
        )
        })
      }
      {noResults && <div>{noResults}</div>}
    </div>

  )
}

export default ResultsList;
