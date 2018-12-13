import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import DirecTVSlider from './DirecTVSlider';
import DirecTVPackage from './DirecTVPackage';
import DirecTVReliability from './DirecTVReliability';
import InputEvent from 'components/InputEvent';

class DirecTV extends InputEvent {
	render() {
		const { currentProduct } = this.props;
		return (
			<div id="products-services-directv" className="Container-box">
				<div className="default-inner-container">
					<DirecTVSlider currentProduct={currentProduct} />
					<div className="service-directv-txtTitle">Find the Package that is right for you</div>
					<DirecTVPackage />
					<div className="service-directv-txtTitle">RELIABILITY</div>
					<Grid container spacing={24}>
						{this.renderGrid('white', <DirecTVReliability />)}
					</Grid>
				</div>
			</div>
		);
	}
}

DirecTV.propTypes = {
	currentProduct: PropTypes.object,
};

DirecTV.defaultProps = {
	currentProduct: {},
};

export default DirecTV;
