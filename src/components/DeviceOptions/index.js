/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeviceOptions extends Component {
	render() {
		const { deviceOptions } = this.props;
		return (
			<div id="components-device-options" className="component-device-options-container">
				<div className="content-box">
					<div className="title">
						Device Options
					</div>
					<div className="device-options-container">
						{deviceOptions.map((deviceOption, index) => (
							<div className="device-option-item-container" key={index}>
								<div className="device-option-item-storage">
									{`${deviceOption.storage}GB`}
								</div>
								<div className="device-option-item-price">
									{`$${deviceOption.price}`}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

DeviceOptions.propTypes = {
	deviceOptions: PropTypes.array,
};

DeviceOptions.defaultProps = {
	deviceOptions: [],
};

export default DeviceOptions;
