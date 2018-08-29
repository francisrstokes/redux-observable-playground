import React from 'react';

const repoStyle = {
  div: {
    border: '1px solid black',
    padding: 15,
    marginBottom: 30
  }
}

const Repo = ({id, name, html_url, description}) => {
  return <div style={repoStyle.div} key={id}>
    <a target="_blank" href={html_url}><b>{name}</b></a>
    <p>{description}</p>
  </div>
};

const reposStyle = {
  margin: 30
}

export const Repos = ({isLoading, data, error}) => (
  <div style={reposStyle}>
  {isLoading ? <div>Loading repos...</div> : null}

  {!error && data ? <div> {data.map(Repo)} </div> : null }

  {error ? <div>Couldn't load repos!</div> : null}
  </div>
)