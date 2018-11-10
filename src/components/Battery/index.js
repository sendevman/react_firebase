import React, { Component } from 'react';
import PropTypes from 'prop-types';
import batterybg from 'assets/images/battery.png';

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
					<img className="battery-bg" src={batterybg} alt="" />
					<div className="battery-content-container">
						{talkTime &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div>CALLING</div>
									<div>{life.talkTime}</div>
									<div>hours</div>
								</div>
							</div>}
						{video &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div>VIDEO</div>
									<div>{life.video}</div>
									<div>hours</div>
								</div>
							</div>}
						{audio &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div>AUDIO</div>
									<div>{life.audio.replace(' hrs', '')}</div>
									<div>hours</div>
								</div>
							</div>}
						{wifi &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div>Wi-Fi</div>
									<div>{life.internetWifi}</div>
									<div>hours</div>
								</div>
							</div>}
						{lte &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div>LTE</div>
									<div>{life.internetL4G}</div>
									<div>hours</div>
								</div>
							</div>}
						{workout &&
							<div className="battery-content-item">
								<div className="battery-header" />
								<div className="battery-body">
									<div>WORKOUT</div>
									<div>{life.workout}</div>
									<div>hours</div>
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
