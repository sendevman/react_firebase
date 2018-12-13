import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

import Cards from './Cards';

import { getCardTypes } from 'redux/firebase/actions';
import { cardTypesSelector } from 'redux/firebase/selectors';

class ProductForm extends Component {
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

	updateCards = (cards) => {
		this.props.updateCurrentProduct(cards);
	}

	render() {
		const { cardTypes, type } = this.props;
		const { cardType, currentProduct } = this.state;

		return (
			<div>
				<div style={{ marginBottom: '20px' }}>
					<Tooltip title="Add Card" placement="bottom">
						<div>
							<Button
								variant="contained"
								size="medium"
								aria-label="Add Card"
								className="att-white margin-top margin-left"
								onClick={this.handleOnClick}>
								<AddIcon /> Card
							</Button>
						</div>
					</Tooltip>
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

				<Cards
					type={type}
					currentProduct={currentProduct}
					updateCards={this.updateCards}
					handleSave={this.props.handleSave}
					handleCancel={this.props.handleCancel} />
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
