import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import ProductPreview from './Product/ProductPreview';
import ProductImport from './Product/ProductImport';
import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';
import HomeView from 'components/HomeView';

import { addDocField, getProducts, getCardTypes, getSubCollection } from 'redux/firebase/actions';
import { cardTypesSelector, productsSelector } from 'redux/firebase/selectors';

class ProductsMain extends InputEvent {
	constructor(props) {
		super(props);
		this.state = {
			currentProduct: {},
			currentProductIndex: '',
			addProductEnable: false,
			editProductEnable: false,
			editProductIndex: '',
		};
	}

	componentDidMount() {
		const { catalogProducts, cardTypes, getProducts, getCardTypes } = this.props;
		if (catalogProducts.length === 0) {
			getProducts();
		}
		if (cardTypes.length === 0) {
			getCardTypes();
		}
	}

	handleCatalogClick = (row, index) => {
		this.setState({
			currentProduct: row._original,
			currentProductIndex: index,
			addProductEnable: false,
			editProductEnable: false,
			editProductIndex: '',
		});
	}

	handleAddProduct = () => {
		this.setState({
			addProductEnable: true,
		});
	}

	handleEditProduct = () => {
		this.setState({
			editProductEnable: true,
			editProductIndex: this.state.currentProductIndex,
		});
	}

	handleImportSave = (data) => {
		const { currentProduct } = this.state;
		this.props.addDocField('products', currentProduct.fbId, data);
	};

	updateRowStyle = (state, rowInfo) => ({
		style: {
			background: rowInfo && rowInfo.index === this.state.currentProductIndex ? 'green' : null,
		},
	});

	render() {
		const { addProductEnable, currentProduct, editProductEnable, editProductIndex } = this.state;
		const { catalogProducts } = this.props;
		const categoryProductsColumn = [
			{
				Header: () => this.renderHeader('Model'),
				Cell: ({ row, index }) => this.renderCell(row.model, () => this.handleCatalogClick(row, index)),
				accessor: 'model',
			},
			{
				Header: () => this.renderHeader('Manufacture'),
				Cell: ({ row, index }) => this.renderCell(row.manufacture, () => this.handleCatalogClick(row, index)),
				accessor: 'manufacture',
			},
			{
				Header: () => this.renderHeader('ID'),
				Cell: ({ row, index }) => this.renderCell(row.fbId, () => this.handleCatalogClick(row, index)),
				accessor: 'fbId',
			},
			{
				Header: () => this.renderHeader('Type'),
				Cell: ({ row, index }) => this.renderCell(row.type, () => this.handleCatalogClick(row, index)),
				accessor: 'type',
			},
			{
				Header: () => this.renderHeader('SubType'),
				Cell: ({ row, index }) => this.renderCell(row.subType, () => this.handleCatalogClick(row, index)),
				accessor: 'subType',
			},
		];
		const cardProductComponent = {
			title: true,
			subtitle: true,
			footer: true,
			backImage: true,
		};
		return (
			<div id="locations-add" className="Container-box">
				<Card className="card-box">
					<CardContent className="left-border-green">
						<Grid container spacing={24}>

							{this.renderGrid('white',
								<TableList
									columns={categoryProductsColumn}
									tables={catalogProducts}
									pageSize={10}
									showPagination
									label="Products Catalog"
									editbtnTooltip="Edit Product"
									editbtn
									addbtnTooltip="Add Product"
									addbtn
									searchEnable
									handleEdit={this.handleEditProduct}
									handleAdd={this.handleAddProduct}
									updateRowStyle={this.updateRowStyle} />)}

							{((editProductEnable && editProductIndex !== '') || addProductEnable) &&
								(currentProduct.type === 'service' || currentProduct.type === 'device') &&
								this.renderGrid('dark-blue',
									<ProductImport
										handleSave={this.handleImportSave}
										currentProduct={currentProduct}
										type={addProductEnable ? 'add' : 'edit'} />)}

							{((editProductEnable && editProductIndex !== '') || addProductEnable) &&
								(currentProduct.type === 'service' || currentProduct.type === 'device') &&
								this.renderGrid('dark-blue',
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
										handleArchive={this.handleTitleArchive}
										type={addProductEnable ? 'add' : 'edit'} />)}

							{((editProductEnable && editProductIndex !== '') || addProductEnable) &&
								(currentProduct.type === 'service' || currentProduct.type === 'device') &&
								this.renderGrid('dark-blue',
									<ProductPreview
										currentProduct={currentProduct}
										type={addProductEnable ? 'add' : 'edit'} />)}

						</Grid>
					</CardContent>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	catalogProducts: productsSelector(state),
	cardTypes: cardTypesSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getProducts: () => dispatch(getProducts()),
	getCardTypes: () => dispatch(getCardTypes()),
	getSubCollection: (parent, id, child) => dispatch(getSubCollection(parent, id, child)),
	addDocField: (parent, id, data) => dispatch(addDocField(parent, id, data)),
});

ProductsMain.propTypes = {
	catalogProducts: PropTypes.array.isRequired,
	cardTypes: PropTypes.array.isRequired,
	getProducts: PropTypes.func.isRequired,
	getCardTypes: PropTypes.func.isRequired,
	getSubCollection: PropTypes.func.isRequired,
	addDocField: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsMain);
