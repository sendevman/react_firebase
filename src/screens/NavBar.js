import React, { Component } from 'react';

// React Router Dom
import { Link } from "react-router-dom";

// My Firebase
import { auth } from '../firebase';

// Material-UI
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';

// Material-UI - Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

// My Styles
import './App.css';

class Apps extends Component {
  constructor(props) {
    super(props);

    this.state = { anchorEl: null };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="NavBar-Box">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu"
              className="NavBar-Menu-Btn"
              onClick={this.props.onShowDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <div className="NavBar-Logo">
              <Link to="/" className="NavBar-Logo-Link">RC Web Interface</Link>
            </div>

            {this.props.authUser && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={auth.doSignOut}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Apps;
