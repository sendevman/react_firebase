import React from 'react';
import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';
import CardView from 'components/CardView';

class Cards extends InputEvent {
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

	handleSave = (data, src, type, index) => {
		let stateCopy = Object.assign({}, this.state.currentProduct);
		if (type === '') {
			stateCopy = { ...stateCopy, ...data };
		} else {
			stateCopy[type] = data;
		}
		this.setState({ currentProduct: stateCopy });
		this.props.handleSave(stateCopy);
	}

	// generateFake = element => [0, 1, 2].map(value => React.cloneElement(element, { key: value }));

	render() {
		const { currentProduct } = this.state;

		return (
			<div>
				{currentProduct.carouselData.length > 0 &&
					currentProduct.carouselData.map((item, index) => (
						<div key={index} style={{ marginBottom: '20px' }}>
							{this.renderGrid('white',
								<CardView
									index={index}
									data={item}
									title="Carousel Card"
									handleSave={this.handleSave}
									handleCancel={this.handleCancel} />)}
						</div>))}
			</div>
		);
	}
}

Cards.propTypes = {
	currentProduct: PropTypes.object,
	updateCards: PropTypes.func.isRequired,
	handleSave: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
};

Cards.defaultProps = {
	currentProduct: {},
};

export default Cards;
