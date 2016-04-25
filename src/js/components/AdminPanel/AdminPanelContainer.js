import React, { Component } from 'react';
import UpdatePageViews from './UpdatePageViews';

class AdminPanelContainer extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.state = {
      isVerifying: false,
      isLoggedIn: false
    };
  }
  validate() {
    // TODO: hit api to verify user
    this.setState({ isVerifying: true });
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    setTimeout(() => {
      if (username === 'adam' && password === '1234') {
        this.setState({ isLoggedIn: true });
      } else {
        this.props.handleClose();
      }
    }, 3000);
  }
  _renderAdmin() {
    return (
      <div>
        <label>Username</label>
        <input className="txt-input--lg" type="text" ref="username" />
        <label>Password</label>
        <input className="txt-input--lg" type="password" ref="password" />
        <button className="btn-pri btn--xlarge" onClick={this.validate}>Login</button>
      </div>
    );
  }
  _renderLogin() {
    return (
      <div className="admin-panel--login">
        {this.state.isVerifying
          ? <div>Verifying...</div>
          : this._renderAdmin()
        }
      </div>
    )
  }
  _renderLoggedInAdmin() {
    return (
      <div>
        <UpdatePageViews {...this.props} />
      </div>
    )
  }
  render() {
    return (
      <div className="admin-panel">
        <div className="admin-panel--header">
          <h5>admin</h5>
          <span className="admin-panel--closer" onClick={this.props.handleClose}>
            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
          </span>
        </div>
        {this.state.isLoggedIn
          ? this._renderLoggedInAdmin()
          : this._renderLogin()
        }
      </div>
    );
  }
}

export default AdminPanelContainer;
