import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'lodash';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import AddIcon from '@material-ui/icons/Add';

import InputEvent from 'components/InputEvent';
import Card from './Card';

import { addDocImageField, getCardTypes } from 'redux/firebase/actions';
import { cardTypesSelector } from 'redux/firebase/selectors';

class ProductForm extends InputEvent {
	constructor(props) {
		super(props);

		const cardTypeValue = _.findIndex(props.cardTypes, cardType => cardType.subType === props.currentProduct.carouselData[0].type);
		this.state = {
			currentProduct: props.currentProduct,
			cardTypeValue,
		};
	}

	handleOnClick = () => {
		const { cardTypes } = this.props;
		const { cardTypeValue } = this.state;
		if (cardTypeValue > 0) {
			const currentProduct = Object.assign({}, this.state.currentProduct);
			currentProduct.carouselData.push({ ...cardTypes[cardTypeValue - 1].field, type: cardTypes[cardTypeValue - 1].subType });
			this.setState({
				currentProduct,
			});
		}
	}

	handleChange = (event) => {
		this.setState({
			cardTypeValue: event.target.value,
		});
	}

	updateCurrentProduct = (data, index) => {
		const currentProduct = Object.assign({}, this.state.currentProduct);
		if (currentProduct.carouselData) {
			currentProduct.carouselData[index] = data;
			this.setState({ currentProduct });
			this.props.updateCurrentProduct(currentProduct);
		}
	}

	handleSave = (index, data) => {
		const { currentProduct } = this.state;
		const carouselData = currentProduct.carouselData.slice();
		carouselData[index] = data.data;
		if (data.uploadImage) {
			this.props.addDocImageField(
				'products',
				currentProduct.fbId,
				'carouselData',
				index,
				carouselData,
				data.uploadImage,
			);
		} else {
			this.props.addDocImageField(
				'products',
				currentProduct.fbId,
				'carouselData',
				index,
				carouselData,
			);
		}
	}

	render() {
		const { cardTypes, type } = this.props;
		const { cardTypeValue, currentProduct } = this.state;

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
						value={cardTypeValue}
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
							<MenuItem key={index} value={index}>{item.subType}</MenuItem>
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
								storeId={currentProduct.fbId}
								title="Carousel Card"
								handleSave={this.handleSave}
								updateCurrentProduct={this.updateCurrentProduct} />, index))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cardTypes: cardTypesSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getCardTypes: () => dispatch(getCardTypes()),
	addDocImageField: (parent, id, field, index, data, img) => dispatch(addDocImageField(parent, id, field, index, data, img)),
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
