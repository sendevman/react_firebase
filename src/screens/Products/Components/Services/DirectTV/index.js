import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import DirectTVSlider from './DirectTVSlider';
import DirectTVReliability from './DirectTVReliability';
import InputEvent from 'components/InputEvent';

class DirectTV extends InputEvent {
	render() {
		const { currentProduct } = this.props;
		return (
			<div id="products-services-directtv" className="Container-box">
				<div className="default-inner-container">
					<DirectTVSlider currentProduct={currentProduct} />
					<div className="service-directv-txtTitle">Find the Package that is right for you</div>

					<div className="service-directv-txtTitle">RELIABILITY</div>
					<Grid container spacing={24}>
						{this.renderGrid('white', <DirectTVReliability />)}
					</Grid>
				</div>
			</div>
		);
	}
}

DirectTV.propTypes = {
	currentProduct: PropTypes.object,
};

DirectTV.defaultProps = {
	currentProduct: {},
};

export default DirectTV;
