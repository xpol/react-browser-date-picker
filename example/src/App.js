import React, { Component } from 'react'

import DatePicker from 'react-browser-date-picker'

import './App.css'

export default class App extends Component {
  state = {
    date: '2019-01-01',
    month: '2019-01'
  }

  handleDateChange = (date) => {
    this.setState({date})
  }
  handleMonthChange = (month) => {
    this.setState({month})
  }

  render () {
    const {date, month} = this.state
    return (
      <div className={'container'}>
        <DatePicker
          frameClass={'frame'}
          placeholderClass={'placeholder'}
          controlClass={'controll'}
          placeholder="Select date"
          value={date}
          onChange={this.handleDateChange}
        />

        <DatePicker
          frameClass={'frame'}
          placeholderClass={'placeholder'}
          controlClass={'controll'}
          placeholder="Select month"
          type='month'
          value={month}
          onChange={this.handleMonthChange}
        />
      </div>
    )
  }
}
