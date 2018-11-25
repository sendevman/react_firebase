import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DirecTVSlider from './DirecTVSlider';
import BasePackages from './BasePackages';

class DirectTVNow extends Component {
	render() {
		const { currentProduct } = this.props;
		return (
			<div id="products-services-directvnow" className="Container-box">
				<DirecTVSlider currentProduct={currentProduct} />
				<BasePackages />
			</div>
		);
	}
}

DirectTVNow.propTypes = {
	currentProduct: PropTypes.object,
};

DirectTVNow.defaultProps = {
	currentProduct: {},
};

export default DirectTVNow;
