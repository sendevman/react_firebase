import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import InputEvent from 'components/InputEvent';
import Card from './Card';

import { getCardTypes } from 'redux/firebase/actions';
import { cardTypesSelector } from 'redux/firebase/selectors';

class ProductForm extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			currentProduct: props.currentProduct,
			cardType: '',
		};
	}

	componentDidMount() {
		const { cardTypes, getCardTypes } = this.props;
		if (cardTypes.length === 0) {
			getCardTypes();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.currentProduct !== nextProps.currentProduct) {
			this.setState({ currentProduct: nextProps.currentProduct });
		}
	}

	handleChange = (event) => {
		this.setState({
			cardType: event.target.value,
		});
	}

	handleSave = (cards) => {
		this.props.updateCurrentProduct(cards);
	}

	render() {
		const { cardTypes, type } = this.props;
		const { cardType, currentProduct } = this.state;

		return (
			<div>
				<div style={{ marginBottom: '20px' }}>
					{this.renderButton(
						'Add Card',
						'white',
						this.handleOnClick,
						<div className="d-flex align-items-center">
							<AddIcon /> Card
						</div>)}
				</div>

				<FormControl variant="outlined" style={{ width: '75%', marginBottom: '20px' }}>
					<InputLabel
						ref={ref => {
							this.InputLabelRef = ref;
						}}
						htmlFor="outlined-age-simple"
					>
						Card Type
					</InputLabel>
					<Select
						value={cardType}
						onChange={this.handleChange}
						input={
							<OutlinedInput
								labelWidth={80}
								name="age"
								id="outlined-age-simple"
							/>
						}
					>
						<MenuItem value=""><em>None</em></MenuItem>
						{cardTypes.map((item, index) => (
							<MenuItem key={index} value={(index + 1) * 10}>{item.subType}</MenuItem>
						))}
					</Select>
				</FormControl>

				{currentProduct.carouselData.length > 0 &&
					currentProduct.carouselData.map((item, index) =>
						this.renderExpansionPanel(`Carousel Card ${index}`,
							<Card
								index={index}
								type={type}
								cardData={item}
								title="Carousel Card"
								handleSave={this.handleSave} />, index))}

				<div className="buttons-box mt-block">
					{this.renderButton('Save', 'green', this.props.handleSave, <SaveIcon />, 'contained', 'small')}
					{this.renderButton('Cancel', 'red', this.props.handleCancel, <CancelIcon />, 'contained', 'small')}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cardTypes: cardTypesSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getCardTypes: () => dispatch(getCardTypes()),
});

ProductForm.propTypes = {
	type: PropTypes.string,
	currentProduct: PropTypes.object,
	cardTypes: PropTypes.array.isRequired,
	getCardTypes: PropTypes.func.isRequired,
	updateCurrentProduct: PropTypes.func.isRequired,
	handleSave: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
	type: 'edit',
	currentProduct: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
