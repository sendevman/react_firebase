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

	handleSave = (data, src, type) => {
		let stateCopy = Object.assign({}, this.state.cardData);
		if (type === '') {
			stateCopy = { ...stateCopy, ...data };
		} else {
			stateCopy[type] = data;
		}
		this.setState({ cardData: stateCopy });
		this.props.handleSave(stateCopy);
	}

	render() {
		const { cardData } = this.state;
		const { index, type } = this.props;

		return (
			<div id="services-card">
				<CardView
					index={index}
					type={type}
					data={cardData}
					handleSave={this.handleSave}
					handleCancel={this.handleCancel} />
			</div>
		);
	}
}

Card.propTypes = {
	index: PropTypes.number.isRequired,
	type: PropTypes.string,
	cardData: PropTypes.object,
	title: PropTypes.string.isRequired,
	handleSave: PropTypes.func.isRequired,
};

Card.defaultProps = {
	type: 'edit',
	cardData: {},
};

export default Card;
