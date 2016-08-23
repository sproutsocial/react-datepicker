import moment from 'moment'
import React from 'react'
import classnames from 'classnames'
import { isSameDay, isDayDisabled } from './date_utils'
//import Tooltip from 'racine/Overlays/Tooltip';

var Day = React.createClass({
  displayName: 'Day',

  propTypes: {
    day: React.PropTypes.object.isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    includeDates: React.PropTypes.array,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    month: React.PropTypes.number,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.object,
    startDate: React.PropTypes.object,
    indicator: React.PropTypes.node
  },
  
  handleClick (event) {
    if (!this.isDisabled() && this.props.onClick) {
      this.props.onClick(event)
    }
  },

  isSameDay (other) {
    return isSameDay(this.props.day, other)
  },

  isDisabled () {
    return isDayDisabled(this.props.day, this.props)
  },

  isInRange () {
    const { day, startDate, endDate } = this.props
    if (!startDate || !endDate) return false

    const before = startDate.clone().startOf('day').subtract(1, 'seconds')
    const after = endDate.clone().startOf('day').add(1, 'seconds')
    return day.clone().startOf('day').isBetween(before, after)
  },

  isEndDay() {
    const { day, endDate } = this.props
    if (!this.props.endDate) return false
    return (parseInt(moment(day).format('MMDYYYY')) === parseInt(moment(endDate).format('MMDYYYY')))
  },

  isWeekend () {
    const weekday = this.props.day.day()
    return weekday === 0 || weekday === 6
  },

  isOutsideMonth () {
    return this.props.month !== undefined &&
      this.props.month !== this.props.day.month()
  },

  indicator () {
      return <div className='react-datepicker__day__indicator' />
  },

  getClassNames () {
    return classnames('react-datepicker__day', {
      'react-datepicker__day--disabled': this.isDisabled(),
      'react-datepicker__day--selected': this.isSameDay(this.props.selected),
      'react-datepicker__day--in-range': this.isInRange(),
      'react-datepicker__day--end-day': this.isEndDay(),
      'react-datepicker__day--today': this.isSameDay(moment()),
      'react-datepicker__day--weekend': this.isWeekend(),
      'react-datepicker__day--outside-month': this.isOutsideMonth()
    })
  },

  render () {
    return (
      <div
          className={this.getClassNames()}
          onClick={this.handleClick}
          aria-label={`day-${this.props.day.date()}`}
          role="option">
          <div className='react-datepicker__day__label'>{this.props.day.date()}</div>
          {this.props.indicator && this.indicator()}
      </div>
    )
  }
})

module.exports = Day
