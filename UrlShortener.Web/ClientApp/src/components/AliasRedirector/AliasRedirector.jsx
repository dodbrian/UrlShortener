import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Alert } from 'react-bootstrap';

import { actionCreators } from '../../store/AliasRedirector';

class AliasRedirector extends Component {
  componentWillMount() {
    this.props.redirectByAlias(this.props.match.params.alias);
  }

  render() {
    const { error } = this.props;

    return error ? (
      <Alert bsStyle="danger">
        There was an error processing your request: {error}
      </Alert>
    ) : (
      <Alert>Please wait, redirecting...</Alert>
    );
  }
}

export default connect(
  state => state.aliasRedirector,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(AliasRedirector);
