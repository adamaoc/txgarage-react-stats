import React, { Component } from 'react';
import axios from 'axios';
import APIURL from '../../helpers/ApiUrl';

const source = APIURL('stats');

class SocialStatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { stats: [] };
  }

  componentDidMount() {
    this.serviceRequest =
      axios.get(source)
        .then((result) => {
          this.setState({
            stats: result.data.stats
          });
        });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const { stats } = this.state;
    return (
      <div className="app">
        <h5>Social Stats</h5>
        <div className="stats-widget">
          {stats.map(({ id, title, stat, slug, link, color }) => {
            const icnClass = 'fa fa-' + slug;
            const statValue = stat.toLocaleString();
            return (
              <a
                key={id}
                href={link}
                target="_blank"
                className="base-widget"
              >
                <div className="stats-widget__icon">
                  <i className={icnClass} aria-hidden="true"></i>
                </div>
                <div className="stats-widget__title">
                  {title}
                </div>
                <div className="stats-widget__stat">{statValue}</div>
              </a>
            )
          })}
        </div>
      </div>
    );
  }
}

export default SocialStatsContainer;
