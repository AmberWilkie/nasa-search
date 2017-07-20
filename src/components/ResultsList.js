import React from 'react';
import { Button } from 'reactstrap';

const ResultsList = (props) => {
  const {
    results,
    noResults,
    saved,
    handleSave,
    handleDelete,
    page
  } = props;
  return (
    <div className="results">
      {results && results.map( result => {
        console.log(result);
        let alreadyAdded = saved.includes(result);
        console.log('alreadyAdded: ', alreadyAdded);
        return (
          <div key={result.href}>
            <h3>{result.data[0].title}</h3>
            <p>{result.data[0].description}</p>
            <img src={result.links[0].href} className="nasaImage"/>
            <br />
            { alreadyAdded ?
              <div><Button color="warning">Saved</Button> <Button color="danger" onClick={() => handleDelete(result)}>Delete</Button></div> :
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
