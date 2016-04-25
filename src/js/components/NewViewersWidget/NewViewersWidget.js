import React, { Component } from 'react';
import dimple from 'dimple';

const chartData = [
  { viewers: 'New', value: 76 },
  { viewers: 'Retruning', value: 24 }
];

class NewViewersWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { isChart: false };
  }
  componentDidMount() {
    this._updateChart();
  }
  componentDidUpdate() {
    if(!this.state.isChart) {
      this._updateChart();
    }
  }
  _updateChart() {
    const svg = dimple.newSvg('#newViewersChart', '100%', 250);
    const myChart = new dimple.chart(svg, chartData);
    myChart.addMeasureAxis("p", "value");
    myChart.addSeries("viewers", dimple.plot.pie);
    myChart.addLegend(0, 0, 90, 30, "left");
    myChart.draw(1000);

    if (!this.state.isChart) {
      this.setState({ isChart: true });
    }
  }
  render() {
    return (
      <div className="new-viewers-widget">
        <h5>Viewers <span>- New vs Returning</span></h5>

        <div className="base-widget">
          <div id="newViewersChart"></div>
        </div>
      </div>
    );
  }
}

export default NewViewersWidget;
