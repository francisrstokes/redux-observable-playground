import React from 'react';
import {Repos} from './Repos';

const viewSwitcherStyle = {
  view: {
    display: 'inline-block',
    margin: 15,
    cursor: 'pointer'
  },
  active: {
    textDecoration: 'underline'
  }
};

const ViewSwitcher = ({showing, setShowing}) => {
  const views = ['repos', 'stars'];
  return <div>
    {views.map(v => {
      const style = {
        ...viewSwitcherStyle.view,
        ...(showing === v ? viewSwitcherStyle.active : {})
      };
      return <div
        style={style}
        key={v}
        onClick={() => {
          setShowing(v)
        }}
      >
        {v}
      </div>
    })}
  </div>
};

export const Profile = ({profile: {name, login, avatar_url, bio}, repos, stars, showing, setShowing}) => (
  <div>
    <h2>{login} ({name})</h2>
    <a href={`http://github.com/${login}`}><img src={avatar_url} width={200} height={200}/></a> 
    <p style={{ textDecoration: 'underline'}}>
      {bio}
    </p>

    <ViewSwitcher showing={showing} setShowing={setShowing} />
    <Repos {...(showing === 'repos' ? repos : stars)}/>
  </div>
);