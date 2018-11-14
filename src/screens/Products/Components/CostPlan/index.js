import React from 'react';
import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';

import AvailabeStore from './AvailabeStore';
import DeviceOptions from './DeviceOptions';
import Plans from './Plans';
import DeviceProtection from './DeviceProtection';

class CostPlan extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			currentProduct: props.currentProduct,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.currentProduct !== nextProps.currentProduct) {
			this.setState({ currentProduct: nextProps.currentProduct });
		}
	}

	updateCostPlan = (data, type) => {
		let stateCopy = Object.assign({}, this.state.currentProduct);
		if (type === '') {
			stateCopy = { ...stateCopy, ...data };
		} else {
			stateCopy[type] = data;
		}
		this.setState({ currentProduct: stateCopy });
		this.props.updateCostPlan(stateCopy);
	}

	generateFake = element => [0, 1, 2].map(value => React.cloneElement(element, { key: value }));

	render() {
		const { currentProduct } = this.state;

		return (
			<div>
				<AvailabeStore
					releaseDate={currentProduct.releaseDate}
					updateReleaseDate={this.updateCostPlan} />

				<DeviceOptions
					deviceOptions={currentProduct.deviceOptions}
					updateDeviceOptions={this.updateCostPlan} />

				<Plans
					cost={currentProduct.cost}
					updateCost={this.updateCostPlan} />

				<DeviceProtection
					insurance={currentProduct.insurance}
					updateInsurance={this.updateCostPlan} />

			</div>
		);
	}
}

CostPlan.propTypes = {
	currentProduct: PropTypes.object,
	updateCostPlan: PropTypes.func.isRequired,
};

CostPlan.defaultProps = {
	currentProduct: {},
};

export default CostPlan;
