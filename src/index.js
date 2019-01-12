import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-one'
import cx from 'classnames'

import styles from './styles.css'

const checkInput = type => {
  var input = document.createElement('input')
  input.setAttribute('type', type)

  var notADateValue = 'not-a-date'
  input.setAttribute('value', notADateValue)

  return (input.value !== notADateValue)
}

const InputTypeSupport = {
  date: checkInput('date'),
  month: checkInput('month')
}

class Range extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,

    placeholder: PropTypes.string,

    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    placeholder: '选择'
  }

  getRange = memoize(
    (start, end) => {
      const step = start < end ? 1 : -1
      const stop = end + step
      const rv = []
      for (let i = start; i !== stop; i += step) {
        rv.push(i)
      }
      return rv
    }
  )

  render() {
    const {value, onChange, placeholder, className, start, end} = this.props
    return (
      <select className={cx(styles.select, className)} value={value || ''} onChange={onChange}>
        <option value='' disabled>{placeholder}</option>
        {this.getRange(start, end).map(value => (
          <option key={value} value={value} >{value}</option>
        ))}
      </select>
    )
  }
}

const Values = {
  date: ['year', 'month', 'date'],
  month: ['year', 'month']
}

const YEAR = (new Date()).getFullYear()

export default class DatePicker extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['date', 'month']),

    value: PropTypes.string,
    onChange: PropTypes.func,

    placeholder: PropTypes.string,

    frameClass: PropTypes.string,
    controlClass: PropTypes.string,
    placeholderClass: PropTypes.string
  }

  static defaultProps = {
    type: 'date'
  }

  state = {}

  input = React.createRef()

  get placeholder() {
    const {value, placeholder} = this.props
    return value ? undefined : placeholder
  }

  handleChange = (e) => {
    const {onChange} = this.props
    onChange && onChange(e.target.value)
  }

  notifyChange = () => {
    const {onChange, type} = this.props
    const values = Values[type].map(k => this.state[k])

    if (values.some(v => !v)) {
      return
    }
    const value = values.join('-')
    onChange && onChange(value)
  }

  handlers = {}
  handleDatePartChange = key => {
    if (!this.handlers[key]) {
      this.handlers[key] = (e) => {
        this.setState({[key]: e.target.value}, this.notifyChange)
      }
    }
    return this.handlers[key]
  }

  getDateParts = memoize((value) => {
    return value.split('-')
  })

  getDatePart = index => {
    const {value} = this.props
    const parts = this.getDateParts(value)
    return parts[index]
  }

  render() {
    const {type, frameClass, controlClass, placeholderClass, placeholder, value} = this.props

    if (InputTypeSupport[type]) {
      return (
        <div className={cx(styles.container, frameClass)} onClick={this.handleClick}>
          <div className={cx(styles.placeholder, placeholderClass, value ? styles.invisible : styles.visible)}>
            {this.placeholder}
          </div>
          <input
            type={type}
            value={value}
            onChange={this.handleChange}
            className={cx(styles.input, controlClass, value ? styles.visible : styles.invisible)}
            placeholder={placeholder}
            ref={this.input}
          />
        </div>
      )
    } else {
      const {year, month} = this.state
      return (
        <div className={cx(styles.fallback, frameClass)}>
          <span className={placeholderClass}>{placeholder}</span>
          <span className={styles.devider} />
          <Range className={controlClass} start={YEAR} end={YEAR - 100} value={year} onChange={this.handleDatePartChange('year')} />年
          <span className={styles.devider} />
          <Range className={controlClass} start={1} end={12} value={month} onChange={this.handleDatePartChange('month')} />月
          {type === 'date' && <span className={styles.devider} />}
          {type === 'date' && <Range className={controlClass} start={1} end={31} value={month} onChange={this.handleDatePartChange('date')} /> }
          {type === 'date' && '日'}
        </div>
      )
    }
  }
}
