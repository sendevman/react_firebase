import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import InputEvent from 'components/InputEvent';

class DirectTV extends InputEvent {
	render() {
		return (
			<div id="products-services-directtv" className="Container-box">
				<div className="default-inner-container">
					<Grid container spacing={24}>
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
