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

import { addDocField, addDocImageField, addDocSubImageField, getCardTypes } from 'redux/firebase/actions';
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
			currentProduct.carouselData.push({ ...cardTypes[cardTypeValue].fields, type: cardTypes[cardTypeValue].subType });
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

	handleBulletSave = () => {
		const { addDocField, currentProduct } = this.props;
		addDocField('products', currentProduct.fbId, { carouselData: this.state.currentProduct.carouselData });
	}

	handleSubCardSave = (index, subIndex, data) => {
		const { currentProduct } = this.state;
		const carouselData = currentProduct.carouselData.slice();
		carouselData[index].subCards[subIndex] = data.data;
		if (data.uploadImage) {
			this.props.addDocSubImageField(
				'products',
				currentProduct.fbId,
				'carouselData',
				index,
				'subCards',
				subIndex,
				carouselData,
				data.uploadImage,
			);
		} else {
			this.props.addDocSubImageField(
				'products',
				currentProduct.fbId,
				'carouselData',
				index,
				'subCards',
				subIndex,
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
								handleBulletSave={this.handleBulletSave}
								handleSubCardSave={this.handleSubCardSave}
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
	addDocSubImageField: (parent, id, field, index, subField, subIndex, data, img) => dispatch(addDocSubImageField(parent, id, field, index, subField, subIndex, data, img)),
	addDocField: (field, id, data) => dispatch(addDocField(field, id, data)),
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
