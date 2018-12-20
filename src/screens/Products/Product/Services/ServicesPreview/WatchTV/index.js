/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { TopIcon } from './TopIcon';
import { LiveTV } from './LiveTV';
import { GetMore } from './GetMore';
import { Destination } from './Destination';
import { Channel } from './Channel';

import InputEvent from 'components/InputEvent';

class WatchTV extends InputEvent {
	render() {
		return (
			<div id="products-services-watchtv" className="Container-box">
				<TopIcon />
				<div className="default-inner-container">
					<Grid container spacing={24}>
						{this.renderGrid('white', <LiveTV />)}
						{this.renderGrid('white', <GetMore />)}
						{this.renderGrid('white', <Destination />)}
						{this.renderGrid('white', <Channel />)}
					</Grid>
				</div>
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
