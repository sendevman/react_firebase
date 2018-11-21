import React, { Component } from 'react';

// React Router Dom
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// My Customs
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';

// My Pages
import HomePage from 'screens/Home';
import LoginPage from 'screens/Login';
import LocationsAdd from 'screens/Locations/Add/index';
import LocationsManage from 'screens/Locations/Manage/index';
import LocationsManTab from 'screens/Locations/Manage/Manage';
import ProductsMain from 'screens/Products/Main/index';
import ProductsAdd from 'screens/Products/Add/index';
import Devices from 'screens/Products/Product/Devices/index';
import Services from 'screens/Products/Product/Services/index';

const AuthRoute = (props) => (
  localStorage.getItem('token') !== null
    ? <Route {...props} />
    : <Redirect to="/login" />
);

const GuestRoute = (props) => (
  localStorage.getItem('token') === null
    ? <Route {...props} />
    : <Redirect to="/" />
);

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDrawer: false,
    };
  }

  toggleDrawer = (open) => () => {
    this.setState({ showDrawer: open });
  };

  render() {
    return (
      <Router>
        <div>
          <NavBar onShowDrawer={(value) => this.toggleDrawer(value)} />

          <SideBar
            showDrawer={this.state.showDrawer}
            onShowDrawer={(value) => this.toggleDrawer(value)} />

          <main className="Main-Content">
            <Switch>
              <GuestRoute exact path="/login" component={LoginPage} />
              <AuthRoute exact path="/" component={HomePage} />
              <AuthRoute exact path="/locations/add" component={LocationsAdd} />
              <AuthRoute exact path="/locations/manage" component={LocationsManage} />
              <AuthRoute exact path="/locations/manage/:store_id/:tab" component={LocationsManTab} />
              <AuthRoute exact path="/products/new" component={ProductsAdd} />
              <AuthRoute exact path="/products/manage" component={ProductsMain} />
              <AuthRoute exact path="/products/manage/devices/phone/:store_id" component={Devices} />
              <AuthRoute exact path="/products/manage/devices/tablet/:store_id" component={Devices} />
              <AuthRoute exact path="/products/manage/devices/watch/:store_id" component={Devices} />
              <AuthRoute exact path="/products/manage/services/watch_tv/:store_id" component={Services} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default Routes;
