import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

// import { getProducts } from 'redux/firebase/actions';
// import { productsSelector } from 'redux/firebase/selectors';

class Review extends Component {
	render() {
		return (
			<div id="products-man-phone-review" className="Container-box">
				Reviews
			</div>
		);
	}
}

Review.propTypes = {
	product: PropTypes.object,
};

Review.defaultProps = {
	product: {},
};

export default Review;
