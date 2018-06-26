import React, { Component } from 'react';
import urlParser from 'url-parse';

import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  InputGroup,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

class AliasCreator extends Component {
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

  handleOnSubmit(event) {
    const { createAlias, originalUrl, alias } = this.props;

    event.preventDefault();
    createAlias({ originalUrl, alias });
  }

  render() {
    const { protocol } = this.props;

    return (
      <form onSubmit={this.handleOnSubmit.bind(this)}>
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
        <Button type="submit" bsStyle="primary">
          Create shortened URL
        </Button>
        {this.props.id}
      </form>
    );
  }
}

export default AliasCreator;
