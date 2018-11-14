import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Offer from './Offer';
import Description from './Description';
import Colors from './Colors';
import Display from './Display';
import Fitness from './Fitness';
import Camera from './Camera';
import Performances from './Performances';
import Battery from './Battery';
import ExtraInfo from './ExtraInfo';

class InfoSpec extends Component {
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

	updateInfoSpec = (data, type) => {
		let stateCopy = Object.assign({}, this.state.currentProduct);
		if (type === '') {
			stateCopy = { ...stateCopy, ...data };
		} else {
			stateCopy[type] = data;
		}
		this.setState({ currentProduct: stateCopy });
		this.props.updateInfoSpec(stateCopy);
	}

	render() {
		const {	currentProduct } = this.state;

		return (
			<div>
				<Offer
					offer={currentProduct.offer}
					updateOffer={this.updateInfoSpec} />

				<Description
					description={currentProduct.description}
					updateDescription={this.updateInfoSpec} />

				<Colors
					colors={currentProduct.colors}
					updateColors={this.updateInfoSpec} />

				<Display
					display={currentProduct.display}
					updateDisplay={this.updateInfoSpec} />

				<Fitness
					fitness={currentProduct.fitness}
					updateFitness={this.updateInfoSpec} />

				<Camera
					camera={currentProduct.camera}
					updateCamera={this.updateInfoSpec} />

				<Performances
					processor={currentProduct.processor}
					memory={currentProduct.memory}
					expandableStorage={currentProduct.expandableStorage}
					updatePerformance={this.updateInfoSpec} />

				<Battery
					battery={currentProduct.battery}
					updateBattery={this.updateInfoSpec} />

				<ExtraInfo
					model={currentProduct.model}
					manufacture={currentProduct.manufacture}
					powerAdapterType={currentProduct.powerAdapterType}
					updateExtraInfo={this.updateInfoSpec} />

			</div>
		);
	}
}

InfoSpec.propTypes = {
	currentProduct: PropTypes.object,
	updateInfoSpec: PropTypes.func.isRequired,
};

InfoSpec.defaultProps = {
	currentProduct: {},
};

export default InfoSpec;
