import React from 'react';

const inputStyle = {
  marginLeft: 30,
  padding: 5,
  minWidth: '30%'
};

export const Search = ({ doSearch }) => {
  return <div>
    <h1>Github Profile Viewer</h1>
    <input
      type='text'
      onChange={e => doSearch(e.currentTarget.value)}
      placeholder='github username'
      style={inputStyle}
    />
    <hr/>
  </div>
};
