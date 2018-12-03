import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';
// import SelectZone from 'components/SelectZone';

import { getProducts, getSubCollection } from 'redux/firebase/actions';
import { productsSelector } from 'redux/firebase/selectors';

class ProductsMain extends InputEvent {
	constructor(props) {
		super(props);
		this.state = {
			catalogProduct: {},
			catalogProductIndex: null,
		};
	}

	componentDidMount() {
		this.props.getProducts();
	}

	handleOnClick = (row) => {
		this.props.getSubCollection('products', row.fbId, 'web-reviews');
		// const type = row.subType === 'watch_tv' || row.subType === 'watch_tv' || row.subType === 'watch_tv' ? 'services' : 'devices';
		this.props.history.push(`/products/manage/${row._original.type}/${row.subType}/${row.fbId}`);
	}

	handleCatalogClick = (row, index) => {
		this.setState({
			catalogProduct: row,
			catalogProductIndex: index,
		});
	}

	handleEditProduct = () => {
		// this.props.history.push(`/products/manage/${row._original.type}/${row.subType}/${row.fbId}`);
	}

	updateRowStyle = (state, rowInfo) => ({
		style: {
			background: rowInfo && rowInfo.index === this.state.catalogProductIndex ? 'green' : null,
		},
	});

	render() {
		const currentProductsColumn = [
			{
				Header: () => this.renderHeader('Id'),
				Cell: ({ row }) => this.renderCell(row.fbId, () => this.handleOnClick(row)),
				accessor: 'fbId',
			},
			{
				Header: () => this.renderHeader('Type'),
				Cell: ({ row }) => this.renderCell(row.subType, () => this.handleOnClick(row)),
				accessor: 'subType',
			},
			{
				Header: () => this.renderHeader('Description'),
				Cell: ({ row }) => this.renderCell(row.description, () => this.handleOnClick(row)),
				accessor: 'description',
			},
		];
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
		return (
			<div id="locations-add" className="Container-box">
				<Card className="card-box">
					<CardContent className="left-border-green">
						<Grid container spacing={24}>
							{/* {this.renderGrid('white',
								<div>
									<SelectZone />
								</div>)} */}

							{this.renderGrid('white',
								<TableList
									columns={currentProductsColumn}
									tables={this.props.currentProducts}
									pageSize={10}
									showPagination
									label="Current Products"
									deletebtnTooltip="Delete User"
									deletebtn
									searchEnable
									handleSave={this.saveUsers} />)}

							{this.renderGrid('white',
								<TableList
									columns={categoryProductsColumn}
									tables={this.props.currentProducts}
									pageSize={10}
									showPagination
									label="Products Catalog"
									editbtnTooltip="Edit Product"
									editbtn
									searchEnable
									handleEdit={this.handleEditProduct}
									updateRowStyle={this.updateRowStyle} />)}
						</Grid>
					</CardContent>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentProducts: productsSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getProducts: () => dispatch(getProducts()),
	getSubCollection: (parent, id, child) => dispatch(getSubCollection(parent, id, child)),
});

ProductsMain.propTypes = {
	currentProducts: PropTypes.array.isRequired,
	getProducts: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsMain);
