import React, { Component } from 'react';
import PropTypes from 'prop-types';

// React Router Dom
import { Link } from 'react-router-dom';

// My Firebase
import { auth } from '../../firebase';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 240
  }
});

class SideBar extends Component {
  render() {
    const { classes, authUser, onShowDrawer, showDrawer } = this.props;

    return (
      <Drawer
        open={showDrawer}
        onClose={onShowDrawer(false)}
        classes={{ paper: classes.drawerPaper }}>
        <div
          tabIndex={0}
          role="button"
          onClick={onShowDrawer(false)}
          onKeyDown={onShowDrawer(false)}>
          <List>
            <Link to="/" className="Drawer-List-Link">
              <Button className="Drawer-List-Btn">Home</Button>
            </Link>
            <Link to="/login" className="Drawer-List-Link">
              <Button className="Drawer-List-Btn">Login</Button>
            </Link>
            {authUser && (
              <div>
                <Divider />
                <List>
                  <Button onClick={auth.doSignOut} className="Drawer-List-Btn">Logout</Button>
                </List>
              </div>
            )}
          </List>
        </div>
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  authUser: PropTypes.bool.isRequired,
  onShowDrawer: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool.isRequired
};

export default withStyles(styles)(SideBar);
