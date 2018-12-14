import React from 'react';
import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';
import CardView from './CardView';

class Card extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			cardData: props.cardData,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.cardData !== nextProps.cardData) {
			this.setState({ cardData: nextProps.cardData });
		}
	}

	render() {
		const { cardData } = this.state;
		const { index, storeId, type, updateCurrentProduct } = this.props;

		return (
			<div id="services-card">
				<CardView
					index={index}
					type={type}
					data={cardData}
					storeId={storeId}
					handleSave={this.props.handleSave}
					handleCancel={this.handleCancel}
					updateCurrentProduct={updateCurrentProduct} />
			</div>
		);
	}
}

Card.propTypes = {
	index: PropTypes.number.isRequired,
	type: PropTypes.string,
	cardData: PropTypes.object,
	storeId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	handleSave: PropTypes.func.isRequired,
	updateCurrentProduct: PropTypes.func.isRequired,
};

Card.defaultProps = {
	type: 'edit',
	cardData: {},
};

export default Card;
