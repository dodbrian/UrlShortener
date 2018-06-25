import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  InputGroup,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';
import urlParser from 'url-parse';

import { actionCreators } from '../store/UrlShortener';

class Home extends Component {
  handleProtocolChange(newProtocol) {
    this.props.setProtocol(newProtocol);
  }

  handleUrlChange(event) {
    let parsedUrl = new urlParser(event.target.value, {});

    this.props.setProtocol(
      parsedUrl.protocol ? parsedUrl.protocol.slice(0, -1) : 'http'
    );

    this.props.setOriginalUrl(
      `${parsedUrl.host}${parsedUrl.pathname}${parsedUrl.query}${
        parsedUrl.hash
      }`
    );
  }

  handleAliasChange(event) {
    this.props.setAlias(event.target.value);
  }

  render() {
    const { protocol } = this.props;

    return (
      <div>
        <h1>URL Shortener</h1>
        <form>
          <FormGroup controlId="formOriginalUrl">
            <ControlLabel>Original URL</ControlLabel>
            <InputGroup>
              <DropdownButton
                id="protocol-dropdown"
                componentClass={InputGroup.Button}
                title={protocol + '://'}
              >
                <MenuItem
                  key="http"
                  onClick={() => this.handleProtocolChange('http')}
                >
                  http://
                </MenuItem>
                <MenuItem
                  key="https"
                  onClick={() => this.handleProtocolChange('https')}
                >
                  https://
                </MenuItem>
              </DropdownButton>
              <FormControl
                placeholder="Please, enter original URL here"
                onChange={event => this.handleUrlChange(event)}
                value={this.props.originalUrl}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="formAlias">
            <ControlLabel>Shortened alias</ControlLabel>
            <FormControl
              placeholder="Please, enter shortened alias here"
              onChange={event => this.handleAliasChange(event)}
            />
          </FormGroup>
          <Button bsStyle="primary">Create shortened URL</Button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => state.urlShortener,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
