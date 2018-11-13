import PropTypes from 'prop-types';
import InputEvent from 'components/InputEvent';

class Offer extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: '',
			opusCode: '',
			img: '',
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.offer !== nextProps.offer) {
			this.setState({ ...nextProps.offer });
		}
	}

	handleInputChange = (e, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		this.setState({ ...stateCopy });
		this.props.updateOffer(stateCopy, 'offer');
	}

	render() {
		return (
			this.renderExpansionPanel('Offer',
				<div className="expand-div">
					{this.renderText('title', 'Title', 'text-field-width', '', 'dense')}
					{this.renderText('description', 'Description', 'text-field-width', '', 'dense')}
					{this.renderText('opusCode', 'OPUS Code', 'text-field-width', '', 'dense')}
					{this.renderText('img', 'Img Url', 'text-field-width', '', 'dense')}
				</div>)
		);
	}
}

Offer.propTypes = {
	offer: PropTypes.object,
	updateOffer: PropTypes.func.isRequired,
};

Offer.defaultProps = {
	offer: {},
};

export default Offer;
