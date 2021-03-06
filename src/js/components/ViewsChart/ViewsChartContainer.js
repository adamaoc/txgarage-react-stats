import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart';
import APIURL from '../../helpers/ApiUrl';

const source = APIURL('views');

class ViewsChartContainer extends Component {
  constructor(props) {
    super(props);
    this._setBarChart = this._setBarChart.bind(this);
    this._setLineChart = this._setLineChart.bind(this);
    this.updateViews = this._updateViews.bind(this);
    this.state = {
      chartType: 'bar',
      views: null,
    };
  }
  componentDidMount() {
    this.serviceRequest =
      axios.get(source)
        .then((result) => {
          this.updateViews(result.data.views);
        });
  }
  componentDidUpdate() {
    if (this.props.rerender) {
      this.props.handleRerendered();
      this.serviceRequest =
        axios.get(source)
          .then((result) => {
            this.updateViews(result.data.views);
          });
    }
  }

  componentWillUnmount() {
    // this.serverRequest.abort();
  }

  _updateViews(views) {
    const updatedViews = views.filter((month) => {
      if (month.year != '2015') {
        return month;
      }
    });
    this.setState({ views: updatedViews });
  }
  _setBarChart() {
    this.setState({ chartType: 'bar' });
  }
  _setLineChart() {
    this.setState({ chartType: 'line' });
  }
  _renderAvg() {
    let avg = 0;
    if (this.state.views) {
      const views = this.state.views;
      let newViewArr = views.filter(v => parseInt(v.views) != 0);
      newViewArr.splice((newViewArr.length - 1), newViewArr.length);
      newViewArr.splice(0, newViewArr.length - 7);
      let sum = 0;
      newViewArr.forEach((v) => {
        sum = sum + parseInt(v.views);
      });
      avg = Math.ceil(sum / newViewArr.length);
      avg = avg.toLocaleString();
    }
    return avg;
  }
	render() {
    const { views } = this.state;
		return (
      <div className="pageviews-widget">
        <h5>Website Pageviews
          <span> - average views {this._renderAvg()} p/m</span>
        </h5>
        <div className="base-widget" style={{height:420}}>
          {this.state.views
            ? <Chart name="viewchart" views={views} {...this.props} />
            : <div></div>
          }
        </div>
      </div>
    );
  }
}

export default ViewsChartContainer;
