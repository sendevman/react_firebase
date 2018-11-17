import React from 'react';
import _ from 'lodash';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

import AddIcon from '@material-ui/icons/Add';

class DeviceOptions extends InputEvent {
	constructor(props) {
		super(props);
		const dState = this.settingState(props.deviceOptions);
		this.state = {
			deviceOptions: props.deviceOptions,
			...dState,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.deviceOptions !== nextProps.deviceOptions) {
			const dState = this.settingState(nextProps.deviceOptions);
			this.setState({
				deviceOptions: nextProps.deviceOptions,
				...dState,
			});
		}
	}

	settingState = (deviceOptions) => {
		const dState = {};
		_.each(deviceOptions, (deviceOption, index) => {
			const deviceOptionKeys = _.keys(deviceOption);
			_.each(deviceOptionKeys, deviceOptionKey => {
				dState[`${index} ${deviceOptionKey}`] = deviceOption[deviceOptionKey];
			});
		});
		return dState;
	}

	handleInputChange = (e, type) => {
		const items = type.split(' ');
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		stateCopy.deviceOptions[items[0]][items[1]] = e.target.value;
		this.setState({ ...stateCopy });
		this.props.updateDeviceOptions(stateCopy.deviceOptions, 'deviceOptions');
	}

	render() {
		const { deviceOptions } = this.state;
		return (
			this.renderExpansionPanel('Device Options',
				<div className="expand-div">
					{deviceOptions.map((deviceOption, index) => (
						<Grid container spacing={16} className="upload-box" key={index}>
							<Grid item xs={12} md={6}>
								{this.renderText(`${index} storage`, 'Storage', 'text-field-width', '', 'dense')}
								{this.renderText(`${index} simCount`, 'SIM: Count', 'text-field-width', '', 'dense', 'number')}
								{this.renderCheckBox(`${index} expandableStorage`, 'Expandable', 'text-field-width margin-top-twelve item-box')}
							</Grid>

							<Grid item xs={12} md={6}>
								{this.renderText(`${index} price`, 'Price', 'text-field-width', '', 'dense')}
								{this.renderText(`${index} simType`, 'SIM: Type', 'text-field-width', '', 'dense')}
								{this.renderText(`${index} expandableStorageType`, 'Expandable: Type', 'text-field-width', '', 'dense')}
							</Grid>
						</Grid>))}

					<div className="buttons-box mt-block">
						{this.renderButton('Add Option', 'blue', () => {}, <AddIcon />, 'contained', 'small')}
					</div>
				</div>)
		);
	}
}

DeviceOptions.propTypes = {
	deviceOptions: PropTypes.array,
	updateDeviceOptions: PropTypes.func.isRequired,
};

DeviceOptions.defaultProps = {
	deviceOptions: [],
};

export default DeviceOptions;
