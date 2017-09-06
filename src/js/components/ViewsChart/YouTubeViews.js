import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart';
import APIURL from '../../helpers/ApiUrl';

const source = APIURL('views');

const YouTubeAPIViews = [
  {
    "id": "1",
    "year": "2017",
    "month": "Jan",
    "views": "2901",
    "slugID": "2017_Jan"
  },
  {
    "id": "2",
    "year": "2017",
    "month": "Feb",
    "views": "2903",
    "slugID": "2017_Feb"
  },
  {
    "id": "3",
    "year": "2017",
    "month": "Mar",
    "views": "10815",
    "slugID": "2017_Mar"
  },
  {
    "id": "4",
    "year": "2017",
    "month": "Apr",
    "views": "13559",
    "slugID": "2017_Apr"
  },
  {
    "id": "5",
    "year": "2017",
    "month": "May",
    "views": "8691",
    "slugID": "2017_May"
  },
  {
    "id": "6",
    "year": "2017",
    "month": "June",
    "views": "6779",
    "slugID": "2017_June"
  },
  {
    "id": "7",
    "year": "2017",
    "month": "July",
    "views": "9491",
    "slugID": "2017_July"
  },
  {
    "id": "8",
    "year": "2017",
    "month": "Aug",
    "views": "13003",
    "slugID": "2017_Aug"
  },
  {
    "id": "9",
    "year": "2017",
    "month": "Sept",
    "views": "1542",
    "slugID": "2017_Sept"
  },
  {
    "id": "10",
    "year": "2017",
    "month": "Oct",
    "views": "0",
    "slugID": "2017_Oct"
  },
  {
    "id": "11",
    "year": "2017",
    "month": "Nov",
    "views": "0",
    "slugID": "2017_Nov"
  },
  {
    "id": "12",
    "year": "2017",
    "month": "Dec",
    "views": "0",
    "slugID": "2017_Dec"
  },
];

class YouTubeViews extends Component {
  constructor(props) {
    super(props);
    this.updateViews = this._updateViews.bind(this);
    this.state = { views: YouTubeAPIViews };
  }
  componentDidMount() {
    // this.serviceRequest =
    //   axios.get(source)
    //     .then((result) => {
    //       this.updateViews(result.data.views);
    //     });
  }
  componentDidUpdate() {
    // if (this.props.rerender) {
    //   this.props.handleRerendered();
    //   this.serviceRequest =
    //     axios.get(source)
    //       .then((result) => {
    //         this.updateViews(result.data.views);
    //       });
    // }
  }

  componentWillUnmount() {
    // this.serverRequest.abort();
  }

  _updateViews(views) {
    // const updatedViews = views.filter((month) => {
    //   if (month.year != '2015') {
    //     return month;
    //   }
    // });
    // this.setState({ views: updatedViews });
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
      <div className="ytviews-widget">
        <h5>YouTube Video Views
          <span> - average views {this._renderAvg()} p/m</span>
        </h5>
        <div className="base-widget" style={{height:420}}>
          {this.state.views
            ? <Chart views={views} chartType='line' {...this.props} />
            : <div></div>
          }
        </div>
      </div>
    );
  }
}

export default YouTubeViews;
