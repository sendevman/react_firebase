import React from 'react';
import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';

class WatchTV extends InputEvent {
	render() {
		return (
			<div id="products-services-watchtv" className="Container-box">
			</div>
		);
	}
}

WatchTV.propTypes = {
	currentProduct: PropTypes.object,
};

WatchTV.defaultProps = {
	currentProduct: {},
};

export default WatchTV;
