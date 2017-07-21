import React from 'react';
import { Button } from 'reactstrap';

const formatDate = (timestamp) => {
  const time = new Date(timestamp)
  return time.toDateString().slice(4)
}

const ResultsList = (props) => {
  const {
    results,
    noResults,
    saved,
    handleSave,
    handleDelete,
  } = props;

  return (
    <div className="results">
      {results && results.map( result => {
        const alreadyAdded = saved.includes(result);
        return (
          <div key={result.data[0].nasa_id}>
            <h3>{result.data[0].title}</h3>
            <h4>{formatDate(result.data[0].date_created)}</h4>
            <p>{result.data[0].description}</p>
            <img src={result.links[0].href} alt={result.data[0].nasa_id}
                 className="nasaImage"/>
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
