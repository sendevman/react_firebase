import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WatchTV from './WatchTV/index';
import DirecTV from './DirecTV/index';
import DirecTVNow from './DirecTVNow/index';
import Internet from './Internet/index';

class ServicesPreview extends Component {
	render() {
		const { currentProduct } = this.props;
		return (
			<div>
				{currentProduct.subType === 'watch_tv' && <WatchTV currentProduct={currentProduct} />}
				{currentProduct.subType === 'directv' && <DirecTV currentProduct={currentProduct} />}
				{currentProduct.subType === 'directv_now' && <DirecTVNow currentProduct={currentProduct} />}
				{currentProduct.subType === 'internet' && <Internet currentProduct={currentProduct} />}
			</div>
		);
	}
}

ServicesPreview.propTypes = {
	currentProduct: PropTypes.object,
};

ServicesPreview.defaultProps = {
	currentProduct: {},
};

export default ServicesPreview;
