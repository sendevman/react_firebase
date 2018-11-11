import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

// import { getProducts } from 'redux/firebase/actions';
// import { productsSelector } from 'redux/firebase/selectors';

class Cost extends Component {
	render() {
		return (
			<div id="products-man-phone-cost" className="Container-box">
				Cost & Plans
			</div>
		);
	}
}

Cost.propTypes = {
	product: PropTypes.object,
};

Cost.defaultProps = {
	product: {},
};

export default Cost;
