import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

const source = 'http://api.txgarage.com/';

const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getMonthOptions = () => {
  return monthArr.map((m) => {
    return { value: m, label: m };
  });
}

const getYearOptions = () => {
  return [
    { value: 2016, label: '2016' },
    { value: 2015, label: '2015' },
    { value: 2014, label: '2014' },
  ];
}

class UpdatePageViews extends Component {
  constructor(props) {
    super(props);
    this._selectMonth = this._selectMonth.bind(this);
    this._selectYear = this._selectYear.bind(this);
    this._setValue = this._setValue.bind(this);
    this._sendUpdate = this._sendUpdate.bind(this);
    this.state = {
      month: 'Jan',
      year: 2016,
      value: null
    }
  }
  _selectMonth(value) {
    this.setState({ month: value });
  }
  _selectYear(value) {
    this.setState({ year: value });
  }
  _setValue(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  _sendUpdate() {
    var ax = axios.create({
      withCredentials: false
    });
    ax.post(source+'views/post/', {
      data: {
        month: this.state.month.value,
        year: this.state.year,
        views: parseInt(this.state.value)
      }
    })
    .then((response) => {
      console.log(response);
      this.props.handleUpdate();
    })
    .catch((response) => {
      console.log(response);
    });
  }
  render() {
    const submitBtnClass = () => {
      if (this.state.value) {
        return 'btn-sec';
      } else {
        return 'btn-base';
      }
    }
    return (
      <div className="admin-widget">
        <h5>Update Page Views</h5>
        <div className="admin-widget__main">
          <label>Select Year</label>
          <Select
            name="year"
            value={this.state.year}
            options={getYearOptions()}
            onChange={this._selectYear}
            clearable={false} />
          <label>Select Month</label>
          <Select
            name="month"
            value={this.state.month}
            options={getMonthOptions()}
            onChange={this._selectMonth}
            clearable={false} />
          <label>Input Value</label>
          <input className="txt-input--lg" type="text" ref="value" defaultValue={this.state.value} onBlur={this._setValue} />
        </div>
        <div className="admin-widget__footer">
          <button className={submitBtnClass} onClick={this._sendUpdate}>Send!</button>
        </div>
      </div>
    );
  }
}

export default UpdatePageViews;
