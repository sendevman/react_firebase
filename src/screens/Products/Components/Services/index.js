import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WatchTV from './WatchTV/index';
import DirectTV from './DirectTV/index';
import DirectTVNow from './DirectTVNow/index';
import Internet from './Internet/index';

class Services extends Component {
	render() {
		const { currentProduct } = this.props;
		return (
			<div>
				{currentProduct.subType === 'watch_tv' && <WatchTV currentProduct={currentProduct} />}
				{currentProduct.subType === 'directv' && <DirectTV currentProduct={currentProduct} />}
				{currentProduct.subType === 'directv_now' && <DirectTVNow currentProduct={currentProduct} />}
				{currentProduct.subType === 'internet' && <Internet currentProduct={currentProduct} />}
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
