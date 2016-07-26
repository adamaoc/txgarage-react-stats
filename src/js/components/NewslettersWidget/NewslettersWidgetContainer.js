import React, { Component } from 'react';
import axios from 'axios';
import APIURL from '../../helpers/ApiUrl';

const source = APIURL('newsletters');

const getState = () => {
    return {
      subscribers: null,
      campaignsSent: null,
      openPercent: null
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
          const stats = result.data.newsletter;
          this.setState({
            subscribers: stats.subscribers,
            campaignsSent: stats.campaigns,
            openPercent: stats.opens
          });
        });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const { subscribers, campaignsSent, openPercent } = this.state;
    return (
      <div className="newsletters-widget">
        <h5>txGarage Newsletter</h5>
        <div className="base-widget">
          <p>Subscribers: <strong>{subscribers}</strong></p>
          <p>Campaigns Sent: <strong>{campaignsSent}</strong></p>
          <p>Average Opens: <strong>{openPercent}%</strong></p>
        </div>
      </div>
    );
  }
}

export default NewslettersWidgetContainer;
