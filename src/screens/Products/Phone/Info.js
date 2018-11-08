import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

// import { getProducts } from 'redux/firebase/actions';
// import { productsSelector } from 'redux/firebase/selectors';

class Info extends Component {
	render() {
		console.log(this.props.product);
		return (
			<div id="products-man-phone-info" className="Container-box">
				Info
			</div>
		);
	}
}

Info.propTypes = {
	product: PropTypes.object,
};

Info.defaultProps = {
	product: {},
};

export default Info;
