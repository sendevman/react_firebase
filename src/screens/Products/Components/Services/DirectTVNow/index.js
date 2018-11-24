import React from 'react';
// import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import InputEvent from 'components/InputEvent';
import BasePackages from './BasePackages';

class DirectTVNow extends InputEvent {
	render() {
		// const { currentProduct } = this.props;
		return (
			<div id="products-services-directvnow" className="Container-box">
				<BasePackages />
				{/* <Grid container spacing={24}>
					{this.renderGrid('black', <BasePackages />, { background: 'black' })}
				</Grid> */}
			</div>
		);
	}
}

// DirectTVNow.propTypes = {
// 	currentProduct: PropTypes.object,
// };

// DirectTVNow.defaultProps = {
// 	currentProduct: {},
// };

export default DirectTVNow;
