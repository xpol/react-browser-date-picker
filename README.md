# react-browser-date-picker

> A react date picker use the brower provided date control.

[![NPM](https://img.shields.io/npm/v/react-browser-date-picker.svg)](https://www.npmjs.com/package/react-browser-date-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-browser-date-picker
```

## Usage

```jsx
import React, { Component } from 'react'

import DatePicker from 'react-browser-date-picker'

class Example extends Component {
  render () {
    return (
      <DatePicker
        type="month"
        frameClass={"frame"}
        controlClass={"control"}
        placeholderClass={"placeholder"}
        value={month}
        onChange={this.handleOnChange}
      />
    )
  }
}
```

## License

MIT © [xpol](https://github.com/xpol)
