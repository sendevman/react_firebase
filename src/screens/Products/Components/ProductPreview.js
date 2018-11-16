import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import ProductForm from './ProductForm';
import Device from './Device';

import { updateDoc } from 'redux/firebase/actions';
// import { addCollection } from 'redux/firebase/actions';

class ProductPreview extends Component {
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

	updateCurrentProduct = (updatedProduct) => {
		this.setState({ currentProduct: { ...this.state.currentProduct, ...updatedProduct } });
	}

	handleSave = () => {
		const data = Object.assign({}, this.state.currentProduct);
		delete data.fbId;
		delete data.subCollection;
		// const subCollectionKeys = _.keys(this.state.currentProduct.subCollection);
		this.props.updateDoc('products', this.state.currentProduct.fbId, this.state.currentProduct);
		// this.props.addCollection('products', this.state.currentProduct.fbId, subCollectionKeys[0], this.state.currentProduct.subCollection[subCollectionKeys[0]]);
	}

	handleCancel = () => {
		this.setState = {
			currentProduct: this.props.currentProduct,
		};
	}

	render() {
		const { currentProduct } = this.state;
		return (
			<Grid item xs={12}>
				<div className="label-products-table select-text">Info & Specs</div>

				{currentProduct.fbId !== undefined &&
					<Grid container spacing={24}>
						<Grid item xs={12} sm={6}>
							<Device currentProduct={currentProduct} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<ProductForm
								currentProduct={currentProduct}
								updateCurrentProduct={this.updateCurrentProduct}
								handleSave={this.handleSave}
								handleCancel={this.handleCancel} />
						</Grid>
					</Grid>}
			</Grid>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	updateDoc: (collection, id, data) => dispatch(updateDoc(collection, id, data)),
	// addCollection: (field, id, childCollection, user) => dispatch(addCollection(field, id, childCollection, user)),
});

ProductPreview.propTypes = {
	currentProduct: PropTypes.object,
	updateDoc: PropTypes.func.isRequired,
	// addCollection: PropTypes.func.isRequired,
};

ProductPreview.defaultProps = {
	currentProduct: {},
};

export default connect(null, mapDispatchToProps)(ProductPreview);
