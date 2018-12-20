/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

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
				{currentProduct.offer &&
					<Offer
						offer={currentProduct.offer}
						updateOffer={this.updateInfoSpec} />}

				{currentProduct.description &&
					<Description
						description={currentProduct.description}
						updateDescription={this.updateInfoSpec} />}

				{currentProduct.colors &&
					<Colors
						colors={currentProduct.colors}
						updateColors={this.updateInfoSpec} />}

				{currentProduct.display &&
					<Display
						display={currentProduct.display}
						updateDisplay={this.updateInfoSpec} />}

				{currentProduct.fitness &&
					<Fitness
						fitness={currentProduct.fitness}
						updateFitness={this.updateInfoSpec} />}

				{currentProduct.camera &&
					<Camera
						camera={currentProduct.camera}
						updateCamera={this.updateInfoSpec} />}

				<Performances
					processor={currentProduct.processor}
					memory={currentProduct.memory}
					expandableStorage={currentProduct.expandableStorage}
					updatePerformance={this.updateInfoSpec} />

				{currentProduct.battery &&
					<Battery
						battery={currentProduct.battery}
						updateBattery={this.updateInfoSpec} />}

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
