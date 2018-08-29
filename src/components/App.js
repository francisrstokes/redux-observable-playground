import React from 'react';
import {connect} from 'react-redux';
import {actionCreators, selectors as profileSelectors} from '../reducers/profile';
import {selectorsToState} from '../util';
import {selectors as reposSelectors} from '../reducers/repos';
import {selectors as starsSelectors} from '../reducers/stars';

import {Search} from './Search';
import {Profile} from './Profile';

const conditionalComponent = (condition, component) => condition ? component : null;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: 'repos'
    };
  }

  render() {
    const {getProfile, profile, repos, stars} = this.props;
    return <div>
      <Search doSearch={getProfile} />

      { conditionalComponent(
        !profile.isLoading && !profile.data && !profile.error,
        <div>Search for a profile above!</div>
      )}

      { conditionalComponent(
        profile.isLoading,
        <div>Loading profile...</div>
      )}

      { conditionalComponent(
        !profile.error && profile.data,
        <Profile
          profile={profile.data}
          repos={repos}
          stars={stars}
          showing={this.state.showing}
          setShowing={newState => this.setState(() => ({showing: newState}))}
        />
      )}

      { conditionalComponent(profile.error,
        <div>Couldn't get profile</div>
      )}
    </div>;
  }
}

export default connect(
  ({ profile, repos, stars }) => ({
    profile: selectorsToState(profileSelectors, profile),
    repos: selectorsToState(reposSelectors, repos),
    stars: selectorsToState(starsSelectors, stars)
  }),
  actionCreators
)(App);