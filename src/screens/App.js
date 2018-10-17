import React, { Component } from 'react';
import PropTypes from 'prop-types';

// React Router Dom
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// My Firebase
import { auth, firestore, firebase } from '../firebase';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

// My routes

// My Styles
import './App.css';

// My Customs
import NavBar from './NavBar';

// My Pages
import HomePage from './HomePage';
// import LandingPage from './LandingPage';
// import AdminPage from './AdminPage';
import LoginPage from './LoginPage';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 240
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: false,
      currentUser: null,
      showDrawer: false
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        firestore.getCurrentUser(authUser.uid)
        .then(doc => {
          if (!doc.exists) return false;
          this.setState({ currentUser: doc.data() });
        })
        .catch(err => { console.log('Error getting documents', err); });

        this.setState({ authUser: true });
      } else {
        this.setState({ currentUser: null, authUser: false });
      }
    });
  }

  toggleDrawer = (open) => () => {
    this.setState({ showDrawer: open });
  };

  render() {
    const { classes } = this.props;
    const { authUser } = this.state;

    return (
      <Router>
        <div>
          <NavBar
            onShowDrawer={(value) => this.toggleDrawer(value)}
            authUser={authUser} />
          <Drawer
            open={this.state.showDrawer}
            onClose={this.toggleDrawer(false)}
            classes={{ paper: classes.drawerPaper }}>
            <div tabIndex={0} role="button"
              onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
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
          <main className="Main-Content">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
          </main>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
