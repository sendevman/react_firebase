/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

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
			ownSelector: false,
			changeSubCardState: false,
			changeSubCardIndex: -1,
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

	handleChangeState = (changeState, changeIndex) => {
		this.setState({ ownSelector: changeState });
		this.props.handleChangeState(changeState, changeIndex);
	}

	handleChangeSubCardState = (changeSubCardState, changeSubCardIndex) => {
		this.setState({ changeSubCardState, changeSubCardIndex });
		this.props.handleChangeState(changeSubCardState, changeSubCardState ? this.props.index : -1);
	}

	render() {
		const {
			cardData,
			changeSubCardState,
			changeSubCardIndex,
			ownSelector,
		} = this.state;
		const {
			changeState,
			index,
			type,
			handleBulletSave,
			handleSubCardSave,
			updateCurrentProduct,
		} = this.props;

		return (
			<div id="services-card">
				<CardView
					index={index}
					type={type}
					data={cardData}
					changeState={changeState && !changeSubCardState}
					handleSave={this.props.handleSave}
					handleCancel={this.handleCancel}
					updateCurrentProduct={updateCurrentProduct}
					handleChangeState={this.handleChangeState} />

				{(cardData.bullets && cardData.bullets.length > 0) &&
					this.renderExpansionPanel('Bullets',
						<Bullet
							data={cardData.bullets}
							updateCurrentProduct={this.updateBullet}
							handleSave={handleBulletSave}
							changeState={changeState && !changeSubCardState} />, 10 + index)}

				{(cardData.subCards && cardData.subCards.length > 0) &&
					cardData.subCards.map((item, cardIndex) => (
						this.renderExpansionPanel(`Sub Card ${cardIndex}`,
							<SubCard
								index={index}
								data={item}
								cardIndex={cardIndex}
								handleSave={handleSubCardSave}
								changeState={!ownSelector && changeState && (!changeSubCardState || (changeSubCardIndex === cardIndex && changeSubCardState))}
								updateCurrentProduct={this.updateSubCards}
								handleChangeState={this.handleChangeSubCardState} />, 10 * (index + 1) + cardIndex)))}
			</div>
		);
	}
}

Card.propTypes = {
	index: PropTypes.number.isRequired,
	type: PropTypes.string,
	cardData: PropTypes.object,
	changeState: PropTypes.bool,
	title: PropTypes.string.isRequired,
	handleSave: PropTypes.func.isRequired,
	handleBulletSave: PropTypes.func.isRequired,
	handleSubCardSave: PropTypes.func.isRequired,
	updateCurrentProduct: PropTypes.func.isRequired,
	handleChangeState: PropTypes.func.isRequired,
};

Card.defaultProps = {
	type: 'edit',
	cardData: {},
	changeState: true,
};

export default Card;
