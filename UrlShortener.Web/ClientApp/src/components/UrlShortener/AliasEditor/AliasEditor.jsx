import React, { Component } from 'react';

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class AliasEditor extends Component {
  handleAliasChange(event) {}

  render() {
    return (
      <form>
        <FormGroup controlId="formEditUrl">
          <ControlLabel>Shortened alias</ControlLabel>
          <FormControl
            placeholder="Please, enter shortened alias here"
            onChange={event => this.handleAliasChange(event)}
          />
        </FormGroup>
      </form>
    );
  }
}

export default AliasEditor;
