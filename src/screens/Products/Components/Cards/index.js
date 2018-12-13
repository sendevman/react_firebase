import React from 'react';
import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';
import HomeView from 'components/HomeView';

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

	updateCards = (data, type) => {
		let stateCopy = Object.assign({}, this.state.currentProduct);
		if (type === '') {
			stateCopy = { ...stateCopy, ...data };
		} else {
			stateCopy[type] = data;
		}
		this.setState({ currentProduct: stateCopy });
		this.props.updateCards(stateCopy);
	}

	// generateFake = element => [0, 1, 2].map(value => React.cloneElement(element, { key: value }));

	render() {
		const { currentProduct } = this.state;
		const cardProductComponent = {
			title: true,
			subtitle: true,
			footer: true,
			body: true,
			legal: true,
			heroImage: true,
		};

		return (
			<div>
				{currentProduct.carouselData.length > 0 &&
					currentProduct.carouselData.map((item, index) => (
						<div key={index} style={{ marginBottom: '20px' }}>
							{this.renderGrid('white',
								<HomeView
									data={item}
									title="Carousel Card"
									activeComponent={cardProductComponent}
									savebtn
									handleSave={this.handleTitleSave} />)}
						</div>))}

			</div>
		);
	}
}

Cards.propTypes = {
	currentProduct: PropTypes.object,
	updateCards: PropTypes.func.isRequired,
};

Cards.defaultProps = {
	currentProduct: {},
};

export default Cards;
