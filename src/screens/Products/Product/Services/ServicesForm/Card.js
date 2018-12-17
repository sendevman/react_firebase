import React from 'react';
import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';
import CardView from './CardView';
import Bullet from './Bullet';
import SubCard from './SubCard';

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

	updateBullet = (data) => {
		const { index } = this.props;
		const cardData = Object.assign({}, this.state.cardData);
		cardData.bullets = data;
		this.setState({ cardData });
		this.props.updateCurrentProduct(cardData, index);
	}

	updateSubCards = (data, cardIndex) => {
		const { index } = this.props;
		const cardData = Object.assign({}, this.state.cardData);
		cardData.subCards[cardIndex] = data;
		this.setState({ cardData });
		this.props.updateCurrentProduct(cardData, index);
	}

	render() {
		const { cardData } = this.state;
		const { index, storeId, type, handleBulletSave, handleSubCardSave, updateCurrentProduct } = this.props;

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

				{(cardData.bullets && cardData.bullets.length > 0) &&
					this.renderExpansionPanel('Bullets',
						<Bullet
							data={cardData.bullets}
							updateCurrentProduct={this.updateBullet}
							handleSave={handleBulletSave} />, 10 + index)}

				{(cardData.subCards && cardData.subCards.length > 0) &&
					cardData.subCards.map((item, cardIndex) => (
						this.renderExpansionPanel(`Sub Card ${cardIndex}`,
							<SubCard
								index={index}
								data={item}
								cardIndex={cardIndex}
								handleSave={handleSubCardSave}
								updateCurrentProduct={this.updateSubCards} />, 10 * (index + 1) + cardIndex)))}
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
	handleBulletSave: PropTypes.func.isRequired,
	handleSubCardSave: PropTypes.func.isRequired,
	updateCurrentProduct: PropTypes.func.isRequired,
};

Card.defaultProps = {
	type: 'edit',
	cardData: {},
};

export default Card;
