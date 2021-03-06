import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  ButtonToolbar,
  Panel,
  Label
} from 'react-bootstrap';

import { actionCreators } from '../../store/UrlShortener';

class UrlShortener extends Component {
  handleUrlChange(event) {
    const url = event.target.value;

    this.props.setOriginalUrl(url);
  }

  handleAliasChange(event) {
    const { setAlias, findByAlias } = this.props;
    const alias = event.target.value;

    setAlias(alias);
    findByAlias(alias);
  }

  handleOnSubmit(event) {
    const { id, createAlias, updateAlias, originalUrl, alias } = this.props;

    event.preventDefault();

    if (id === 0) {
      createAlias({ originalUrl, alias });
    } else {
      updateAlias({ id, originalUrl, alias });
    }
  }

  handleDeleteAlias() {
    const { id, deleteAlias } = this.props;

    deleteAlias(id);
  }

  render() {
    const { id, alias, originalUrl, urlIsInvalid } = this.props;
    const redirectUrl = `${window.location.protocol}//${
      window.location.host
    }/${alias}`;

    return (
      <div>
        <h1>URL Shortener</h1>
        <form onSubmit={this.handleOnSubmit.bind(this)}>
          <FormGroup controlId="formAlias">
            <ControlLabel>Shortened alias</ControlLabel>
            <FormControl
              placeholder="Please, enter shortened alias here"
              onChange={event => this.handleAliasChange(event)}
              value={alias}
            />
          </FormGroup>
          <FormGroup controlId="formOriginalUrl">
            <ControlLabel>Original URL</ControlLabel>
            <FormControl
              placeholder="Please, enter original URL here"
              onChange={event => this.handleUrlChange(event)}
              value={originalUrl}
            />
            {urlIsInvalid ? (
              <Label bsStyle="danger">Please enter a valid URL</Label>
            ) : (
              ''
            )}
          </FormGroup>
          {id !== 0 ? (
            <Panel>
              <Panel.Heading>Generated link</Panel.Heading>
              <Panel.Body>
                <a href={redirectUrl} target="_blank">
                  {redirectUrl}
                </a>
              </Panel.Body>
            </Panel>
          ) : (
            ''
          )}
          {id === 0 ? (
            <ButtonToolbar>
              <Button
                type="submit"
                bsStyle="primary"
                disabled={urlIsInvalid || alias === ''}
              >
                Create shortened URL
              </Button>
            </ButtonToolbar>
          ) : (
            <ButtonToolbar>
              <Button
                type="submit"
                bsStyle="primary"
                disabled={urlIsInvalid || alias === ''}
              >
                Update shortened URL
              </Button>
              <Button
                bsStyle="danger"
                onClick={this.handleDeleteAlias.bind(this)}
              >
                Delete shortened URL
              </Button>
            </ButtonToolbar>
          )}
        </form>
      </div>
    );
  }
}

export default connect(
  state => state.urlShortener,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(UrlShortener);
