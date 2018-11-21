import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WatchTV from './WatchTV/index';

class Services extends Component {
	render() {
		const { currentProduct } = this.props;
		return (
			<div>
				{currentProduct.subType === 'watch_tv' && <WatchTV currentProduct={currentProduct} />}
			</div>
		);
	}
}

Services.propTypes = {
	currentProduct: PropTypes.object,
};

Services.defaultProps = {
	currentProduct: {},
};

export default Services;
