import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Tabs, Tab } from 'react-bootstrap';

import AliasCreator from './AliasCreator/AliasCreator';
import AliasEditor from './AliasEditor/AliasEditor';

import { actionCreators } from '../../store/UrlShortener';

class UrlShortener extends Component {
  render() {
    return (
      <div>
        <h1>URL Shortener</h1>
        <Tabs id="urlShortenerTabs">
          <Tab eventKey={1} title="Create alias">
            <AliasCreator {...this.props} />
          </Tab>
          <Tab eventKey={2} title="Update alias">
            <AliasEditor {...this.props} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default connect(
  state => state.urlShortener,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(UrlShortener);
