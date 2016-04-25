import React, { Component } from 'react';
import Header from './Header';
import SocialStats from './SocialStats';
import ViewsChart from './ViewsChart';
import NewslettersWidget from './NewslettersWidget/';
import NewViewersWidget from './NewViewersWidget/';
import AdminPanel from './AdminPanel';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.openAdmin = this.openAdmin.bind(this);
    this.closeAdmin = this.closeAdmin.bind(this);
    this.state = {
      isAdminOpen: false,
      rerender: false
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
            <h1>
              <small>Welcom to the stats</small>
              Dashboard
            </h1>
            {/* <div className="admin-btn">
              <i className="fa fa-cogs" onClick={this.openAdmin}></i>
            </div> */}
          </div>
          <div className="grid-flex">
            <div className="app-sidebar--wrap">
              <SocialStats />
              <NewslettersWidget />
            </div>
            <div className="app-content--wrap">
              <ViewsChart rerender={this.state.rerender} handleRerendered={this._handleRerendered.bind(this)} />
            </div>
            <div className="app-sidebar--wrap">
              <NewViewersWidget />
            </div>
          </div>
        </div>
        {this.state.isAdminOpen
          ? <AdminPanel handleClose={this.closeAdmin} handleUpdate={this.handleAdminUpdate.bind(this)} />
          : <div></div>
        }
        <footer className="app-footer">
          <small>Thanks for checking out our stats - with ♥ from Texans - visit <a href="http://txgarage.com" target="_blank">txGarage.com</a></small>
        </footer>
      </div>
    );
  }
}

export default Layout;
