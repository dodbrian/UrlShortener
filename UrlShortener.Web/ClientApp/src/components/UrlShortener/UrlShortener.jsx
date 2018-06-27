import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import urlParser from 'url-parse';

import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  ButtonToolbar,
  Panel
} from 'react-bootstrap';

import { actionCreators } from '../../store/UrlShortener';

class UrlShortener extends Component {
  handleProtocolChange(newProtocol) {
    this.props.setProtocol(newProtocol);
  }

  handleUrlChange(event) {
    let parsedUrl = new urlParser(event.target.value, {});

    this.props.setOriginalUrl(
      `${parsedUrl.protocol ? parsedUrl.protocol : 'http:'}//${parsedUrl.host}${
        parsedUrl.pathname
      }${parsedUrl.query}${parsedUrl.hash}`
    );
  }

  handleAliasChange(event) {
    this.props.setAlias(event.target.value);
  }

  handleOnSubmit(event) {
    const { createAlias, originalUrl, alias } = this.props;

    event.preventDefault();
    createAlias({ originalUrl, alias });
  }

  render() {
    const { id, alias } = this.props;

    return (
      <div>
        <h1>URL Shortener</h1>
        <form onSubmit={this.handleOnSubmit.bind(this)}>
          <FormGroup controlId="formAlias">
            <ControlLabel>Shortened alias</ControlLabel>
            <FormControl
              placeholder="Please, enter shortened alias here"
              onChange={event => this.handleAliasChange(event)}
            />
          </FormGroup>
          <FormGroup controlId="formOriginalUrl">
            <ControlLabel>Original URL</ControlLabel>
            <FormControl
              placeholder="Please, enter original URL here"
              onChange={event => this.handleUrlChange(event)}
              value={this.props.originalUrl}
            />
          </FormGroup>
          {id !== 0 ? (
            <Panel>
              <Panel.Heading>Generated link</Panel.Heading>
              <Panel.Body>
                <a
                  href={`https://localhost:5001/${alias}`}
                  target="_blank"
                >{`https://localhost:5001/${alias}`}</a>
              </Panel.Body>
            </Panel>
          ) : (
            ''
          )}
          {id === 0 ? (
            <ButtonToolbar>
              <Button type="submit" bsStyle="primary">
                Create shortened URL
              </Button>
            </ButtonToolbar>
          ) : (
            <ButtonToolbar>
              <Button type="submit" bsStyle="primary">
                Update shortened URL
              </Button>
              <Button bsStyle="danger">Delete shortened URL</Button>
            </ButtonToolbar>
          )}
          {this.props.id}
        </form>
      </div>
    );
  }
}

export default connect(
  state => state.urlShortener,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(UrlShortener);
