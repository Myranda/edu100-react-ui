import React, { Component } from 'react';
import InputNumber from '../dist/input-number'
export default class App extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    }
  }

  onChange(value) {

  }

  render() {
    return (
      <InputNumber defaultValue={this.state.value} onChange={this.onChange.bind(this)} min="1" max="10"></InputNumber>
    )
  }
}
