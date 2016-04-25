import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart';

const source = 'http://localhost:8888/views/';

class ViewsChartContainer extends Component {
  constructor(props) {
    super(props);
    this._setBarChart = this._setBarChart.bind(this);
    this._setLineChart = this._setLineChart.bind(this);
    this.state = {
      chartType: 'bar',
      views: null,
    };
  }
  componentDidMount() {
    this.serviceRequest =
      axios.get(source)
        .then((result) => {
          this.setState({ views: result.data.views });
        });
  }
  componentDidUpdate() {
    if (this.props.rerender) {
      this.props.handleRerendered();
      this.serviceRequest =
        axios.get(source)
          .then((result) => {
            this.setState({ views: result.data.views });
          });
    }
  }
  componentWillUnmount() {
    this.serverRequest.abort();
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
      newViewArr.splice(0, newViewArr.length - 4);
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
		return (
      <div className="pageviews-widget">
        <h5>Pageviews
          <span> - average views {this._renderAvg()} p/m</span>
        </h5>
        <div className="base-widget">
          {this.state.views
            ? <Chart views={this.state.views} {...this.props} />
            : <div></div>
          }
        </div>
      </div>
    );
  }
}

export default ViewsChartContainer;
