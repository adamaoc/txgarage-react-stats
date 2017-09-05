import React, { Component } from 'react';
import Header from './Header';
import SocialStats from './SocialStats';
import ViewsChart from './ViewsChart';
import NewslettersWidget from './NewslettersWidget/';
import NewViewersWidget from './NewViewersWidget/';
import YouTubeViews from './ViewsChart/YouTubeViews';
import AdminPanel from './AdminPanel';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.openAdmin = this.openAdmin.bind(this);
    this.closeAdmin = this.closeAdmin.bind(this);
    this.handleRerendered = this._handleRerendered.bind(this);
    this.state = {
      isAdminOpen: false,
      rerender: false
    }
  }
  componentDidMount() {
    console.log(window.location);
    if (window.location.hash === '#admin') {
      this.setState({ isAdminOpen: true });
    }
  }
  openAdmin() {
    this.setState({ isAdminOpen: true });
  }
  closeAdmin() {
    this.setState({ isAdminOpen: false });
  }
  handleAdminUpdate() {
    this.setState({ rerender: true });
    this.forceUpdate();
  }
  _handleRerendered() {
    this.setState({ rerender: false });
  }
  render() {
    return (
      <div className="app-wrap">
        <Header />
        <div className="main-wrap">
          <div className="grid-flex">
            <div className="app-sidebar--wrap">
              <SocialStats />
              <NewslettersWidget />
            </div>
            <div className="app-content--wrap">
              <ViewsChart rerender={this.state.rerender} handleRerendered={this.handleRerendered} />
              <YouTubeViews rerender={this.state.rerender} handleRerendered={this.handleRerendered} />
            </div>
            <div className="app-sidebar--wrap">
              <NewViewersWidget />
            </div>
          </div>
        </div>
        <footer className="app-footer">
          <small>Thanks for checking out our stats - with ♥ from Texans - visit <a href="http://txgarage.com" target="_blank">txGarage.com</a></small>
        </footer>
      </div>
    );
  }
}

export default Layout;
