// import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import ProductPreview from '../Components/ProductPreview';
import ProductImport from '../Components/ProductImport';
import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';

import HomeView from 'components/HomeView';

import { getProducts, getSubCollection } from 'redux/firebase/actions';
import { productsSelector } from 'redux/firebase/selectors';

class Product extends InputEvent {
	constructor(props) {
		super(props);
		const currentProduct = props.products.length > 0
			? props.products[_.findIndex(props.products, product => product.fbId === props.match.params.store_id)]
			: {};
		this.state = {
			currentProduct,
		};
	}

	componentDidMount() {
		if (this.props.products.length === 0) {
			this.props.getProducts();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.products !== nextProps.products) {
			const index = _.findIndex(nextProps.products, product => product.fbId === this.props.match.params.store_id);
			this.setState({ currentProduct: nextProps.products[index] });
			if (this.props.products.length === 0) {
				this.props.getSubCollection('products', this.props.match.params.store_id, 'web-reviews');
			}
		}
	}

	handleCardSave = () => {}

	handleCardCancel = () => {}

	render() {
		const { currentProduct } = this.state;
		const cardProductComponent = {
			title: true,
			subtitle: true,
			footer: true,
			cardImage: false,
			backTitle: false,
			backImage: true,
		};
		const catalogProductsColumn = [
			{
				Header: () => this.renderHeader('Model'),
				accessor: 'model',
			},
			{
				Header: () => this.renderHeader('Manufacture'),
				accessor: 'manufacture',
			},
			{
				Header: () => this.renderHeader('ID'),
				accessor: 'id',
			},
			{
				Header: () => this.renderHeader('Type'),
				accessor: 'type',
			},
			{
				Header: () => this.renderHeader('Subtype'),
				accessor: 'subtype',
			},
		];
		return (
			<div id="locations-add" className="Container-box">
				<Grid container spacing={24}>
					{this.renderGrid('dark-green',
						<TableList
							columns={catalogProductsColumn}
							tables={this.props.catalogProducts}
							label="Products Catalog"
							addbtnTooltip="Add Product"
							editbtnTooltip="Edit Product"
							addbtn
							editbtn
							searchEnable
							handleAdd={this.saveAdd}
							handleEdit={this.saveEdit} />)}

					{this.renderGrid('dark-blue', <ProductImport />)}

					{this.renderGrid('dark-blue',
						<HomeView
							title="Product Card"
							activeComponent={cardProductComponent}
							prevbtn
							savebtn
							importbtn
							archbtn
							handlePreview={this.handleTitlePreview}
							handleSave={this.handleTitleSave}
							handleImport={this.handleTitleImport}
							handleArchive={this.handleTitleArchive} />)}

					{this.renderGrid('dark-blue', <ProductPreview currentProduct={currentProduct} />)}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	products: productsSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getProducts: () => dispatch(getProducts()),
	getSubCollection: (parent, id, child) => dispatch(getSubCollection(parent, id, child)),
});

Product.propTypes = {
	products: PropTypes.array.isRequired,
	getProducts: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};

// DevicePhone.defaultProps = {

// }

export default connect(mapStateToProps, mapDispatchToProps)(Product);
