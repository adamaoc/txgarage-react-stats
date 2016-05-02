import React, { Component } from 'react';
import axios from 'axios';
import APIURL from '../../helpers/ApiUrl';

const source = APIURL('newsletters');

const getState = () => {
    return {
      subscribers: null,
      monthlySent: null
    }
};

class NewslettersWidgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = getState();
  }

  componentDidMount() {
    this.serviceRequest =
      axios.get(source)
        .then((result) => {
          this.setState({
            subscribers: result.data.newsletter[0].stat,
            monthlySent: result.data.newsletter[1].stat
          });
        });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const { subscribers, monthlySent } = this.state;
    return (
      <div className="newsletters-widget">
        <h5>txGarage Newsletter</h5>
        <div className="base-widget">
          <p>Subscribers: <strong>{subscribers}</strong></p>
          <p>Monthly Sent: <strong>{monthlySent}</strong></p>
        </div>
      </div>
    );
  }
}

export default NewslettersWidgetContainer;
