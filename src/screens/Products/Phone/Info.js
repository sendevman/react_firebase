// import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

// import { getProducts } from 'redux/firebase/actions';
// import { productsSelector } from 'redux/firebase/selectors';

import Offer from 'components/Offer';
import Colors from 'components/Colors';
import Display from 'components/Display';
import Camera from 'components/Camera';
import Battery from 'components/Battery';
import InputEvent from 'components/InputEvent';

class Info extends InputEvent {
	render() {
		const { product } = this.props;
		console.log(product);
		return (
			<div id="products-man-phone-info">
				<div className="info-container">
					{this.renderGrid('white', <Offer offer={product.offer} />)}
				</div>
				<div className="info-container">
					{this.renderGrid('white', product.description)}
				</div>
				<div className="info-container">
					{this.renderGrid('white', <Colors colors={product.colors} />)}
				</div>
				<div className="info-container">
					{this.renderGrid('white', <Display display={product.display} />)}
				</div>
				<div className="info-container">
					{this.renderGrid('white', <Camera camera={product.camera} />)}
				</div>
				<div className="info-container">
					{this.renderGrid('white', <Battery battery={product.battery} />)}
				</div>
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
