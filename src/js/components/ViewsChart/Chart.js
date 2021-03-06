import React, { Component } from 'react';
import dimple from '../../helpers/dimple';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = { isChart: false };
  }
  componentDidMount() {
    this._updateChart();
  }
  componentDidUpdate() {
    if(this.props.rerender) {
      const chart = document.getElementById(this.props.name);
      chart.innerHTML = '';
      setTimeout(() => {
        this._updateChart();
      }, 100);
    }
    if(!this.state.isChart) {
      this._updateChart();
    }
  }
  _updateChart() {
    const svg = dimple.newSvg('#' + this.props.name, '100%', 400);
    const myChart = new dimple.chart(svg, this.props.views);
    const x = myChart.addCategoryAxis('x', ['month', 'year']);
    x.addOrderRule('id');

    const y = myChart.addMeasureAxis("y", "views");
    if (this.props.chartType === 'line') {
      myChart.addSeries("year", dimple.plot.line);
    } else {
      myChart.addSeries("year", dimple.plot.bar);
    }
    myChart.addLegend(10, 10, '100%', 25, "right");
    myChart.draw();
    if (!this.state.isChart) {
      this.setState({ isChart: true });
    }
  }

  render() {
    return <div id={this.props.name} style={{height: 420}}></div>;
  }
}

export default Chart;
