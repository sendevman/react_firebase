import React, { Component } from 'react';

// React Router Dom
import { BrowserRouter as Router, Route } from 'react-router-dom';

// My Firebase
import { firestore, firebase } from '../firebase';

// My Customs
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';

// My Pages
import HomePage from 'screens/Home';
// import LandingPage from './LandingPage';
// import AdminPage from './AdminPage';
import LoginPage from 'screens/Login';

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: false,
      showDrawer: false,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        firestore.getCurrentUser(authUser.uid)
          .then(doc => {
            if (!doc.exists) return false;
            return true;
          })
          .catch(err => { console.log('Error getting documents', err); });

        this.setState({ authUser: true });
      } else {
        this.setState({ authUser: false });
      }
    });
  }

  toggleDrawer = (open) => () => {
    this.setState({ showDrawer: open });
  };

  render() {
    const { authUser } = this.state;

    return (
      <Router>
        <div>
          <NavBar
            onShowDrawer={(value) => this.toggleDrawer(value)}
            authUser={authUser} />

          <SideBar
            showDrawer={this.state.showDrawer}
            onShowDrawer={(value) => this.toggleDrawer(value)} />

          <main className="Main-Content">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
          </main>
        </div>
      </Router>
    );
  }
}

export default Routes;
