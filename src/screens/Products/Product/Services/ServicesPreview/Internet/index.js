import React from 'react';
import PropTypes from 'prop-types';

import InternetSlider from './InternetSlider';
import InputEvent from 'components/InputEvent';

class Internet extends InputEvent {
	render() {
		const { currentProduct } = this.props;
		return (
			<div id="products-services-internet" className="Container-box">
				<div className="default-inner-container">
					<InternetSlider currentProduct={currentProduct} />
					<div className="learn-more">
						To Learn more ask a sales associate
					</div>
				</div>
			</div>
		);
	}
}

Internet.propTypes = {
	currentProduct: PropTypes.object,
};

Internet.defaultProps = {
	currentProduct: {},
};

export default Internet;
