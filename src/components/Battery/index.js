/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import batterybg from 'assets/images/battery.png';
import emptybg from 'assets/images/empty.png';

class Battery extends Component {
	render() {
		const { life } = this.props.battery;
		const talkTime = life && life.talkTime && life.talkTime !== '';
		const video = life && life.video && life.video !== '';
		const audio = life && life.audio && life.audio !== '';
		const wifi = life && life.internetWifi && life.internetWifi !== '';
		const lte = life && life.internetL4G && life.internetL4G !== '';
		const workout = life && life.workout && life.workout !== '';
		return (
			<div id="components-battery" className="component-battery-container">
				<div className="content-box">
					<div className="bg-image">
						<img className="battery-bg" src={batterybg} alt="" />
						<img className="empty-bg" src={emptybg} alt="" />
					</div>
					<div className="battery-content-container">
						{talkTime &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div className="battery-inner-text">CALLING</div>
									<div className="battery-inner-text">{life.talkTime}</div>
									<div>hours</div>
								</div>
							</div>}
						{video &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div className="battery-inner-text">VIDEO</div>
									<div className="battery-inner-text">{life.video}</div>
									<div className="battery-inner-text">hours</div>
								</div>
							</div>}
						{audio &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div className="battery-inner-text">AUDIO</div>
									<div className="battery-inner-text">{life.audio.replace(' hrs', '')}</div>
									<div className="battery-inner-text">hours</div>
								</div>
							</div>}
						{wifi &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div className="battery-inner-text">Wi-Fi</div>
									<div className="battery-inner-text">{life.internetWifi}</div>
									<div className="battery-inner-text">hours</div>
								</div>
							</div>}
						{lte &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div className="battery-inner-text">LTE</div>
									<div className="battery-inner-text">{life.internetL4G}</div>
									<div className="battery-inner-text">hours</div>
								</div>
							</div>}
						{workout &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div className="battery-inner-text">WORKOUT</div>
									<div className="battery-inner-text">{life.workout}</div>
									<div className="battery-inner-text">hours</div>
								</div>
							</div>}
					</div>
				</div>
			</div>
		);
	}
}

Battery.propTypes = {
	battery: PropTypes.object,
};

Battery.defaultProps = {
	battery: {},
};

export default Battery;
