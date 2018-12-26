/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import fitnessbg from 'assets/images/fitness.png';
import emptybg from 'assets/images/empty.png';
import activityTracker from 'assets/images/activity.png';
import fitnessTracking from 'assets/images/tracking.png';
import gps from 'assets/images/gps.png';
import heartRateMonitor from 'assets/images/heart.png';
import music from 'assets/images/music.png';
import pedometer from 'assets/images/pedometer.png';
import runTracking from 'assets/images/run.png';

const features = {
	activityTracker: {
		img: activityTracker,
		name: 'Activity Tracker',
	},
	ekg: {
		img: heartRateMonitor,
		name: 'EKG',
	},
	fitnessTracking: {
		img: fitnessTracking,
		name: 'Fitness Tracking',
	},
	gps: {
		img: gps,
		name: 'GPS Tracking',
	},
	heartRateMonitor: {
		img: heartRateMonitor,
		name: 'Heart Rate Monitor',
	},
	music: {
		img: music,
		name: 'Stand Alone Music',
	},
	pedometer: {
		img: pedometer,
		name: 'Pedometer',
	},
	runTracking: {
		img: runTracking,
		name: 'Run Tracking',
	},
};

class Fitness extends Component {
	render() {
		const { fitness } = this.props;
		return (
			<div id="components-fitness" className="component-fitness-container">
				<div className="content-box">
					<div className="bg-image">
						<img className="fitness-bg" src={fitnessbg} alt="" />
						<img className="empty-bg" src={emptybg} alt="" />
					</div>
					<div className="fitness-container">
						{_.keys(fitness).map((item, index) => (
							<div className="fitness-item-container" style={!fitness[item] ? { display: 'none' } : {}} key={index}>
								{fitness[item] && <img className="fitness-item-image" src={features[item].img} alt="" />}
								{fitness[item] &&
									<div className="fitness-item-title">
										{features[item].name}
									</div>}
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

Fitness.propTypes = {
	fitness: PropTypes.object,
};

Fitness.defaultProps = {
	fitness: {},
};

export default Fitness;
