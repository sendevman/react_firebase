/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';
import SelectZone from 'components/SelectZone';

import {
	addSubCollectionField,
	getLocations,
	getProducts,
	getSubCollection,
} from 'redux/firebase/actions';
import {
	locationsSelector,
	productsSelector,
} from 'redux/firebase/selectors';

class Products extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			selectedZone: {},
			selectedZoneId: '',
			catalogProduct: {},
			catalogProductIndex: null,
			currentProduct: '',
			currentProductIndex: null,
		};
	}

	componentDidMount() {
		const {
			locations,
			getLocations,
			getProducts,
			getZones,
			storeId,
			categoryProducts,
		} = this.props;

		if (locations.length === 0) {
			getLocations();
		} else {
			const subCollection = _.find(locations, { fbId: storeId }).subCollection;
			if (subCollection === undefined || (subCollection && !subCollection.zones === undefined)) {
				getZones('locations', storeId, 'zones');
			}
		}
		if (categoryProducts.length === 0) {
			getProducts();
		}
	}

	componentWillReceiveProps(nextProps) {
		const { locations, storeId, getZones } = this.props;
		const { selectedZoneId } = this.state;
		if (locations !== nextProps.locations) {
			const subCollection = _.find(nextProps.locations, { fbId: storeId }).subCollection;
			if (subCollection === undefined || (subCollection && !subCollection.zones === undefined)) {
				getZones('locations', storeId, 'zones');
			} else if (subCollection && subCollection.zones) {
				if (selectedZoneId !== '') {
					this.handleSelectZone(selectedZoneId);
				}
			}
		}
	}

	handleDeleteProducts = () => {
		const { addSubCollectionField, getZones, storeId } = this.props;
		const {	currentProduct, selectedZone, selectedZoneId } = this.state;
		if (selectedZoneId !== '') {
			const products = selectedZone.products.slice();
			_.remove(products, product => product === currentProduct);
			addSubCollectionField(
				'locations',
				storeId,
				'zones',
				selectedZoneId,
				'products',
				{
					data: products,
				},
			);
			getZones('locations', storeId, 'zones');
		}
	}

	handleAddProducts = () => {
		const { addSubCollectionField, getZones, storeId } = this.props;
		const {	catalogProduct, selectedZone, selectedZoneId } = this.state;
		if (selectedZoneId !== '') {
			addSubCollectionField(
				'locations',
				storeId,
				'zones',
				selectedZoneId,
				'products',
				{
					data: selectedZone.products.concat([catalogProduct.fbId]),
				},
			);
			getZones('locations', storeId, 'zones');
		}
	}

	handleSelectZone = (idx) => {
		const { locations, storeId } = this.props;
		const selectedZone = _.find(_.find(locations, { fbId: storeId }).subCollection.zones, { fbId: idx });
		this.setState({
			selectedZone,
			selectedZoneId: idx,
		});
	}

	handleCurrentClick = (row, index) => {
		this.setState({
			currentProduct: row._original,
			currentProductIndex: index,
		});
	}

	handleCatalogClick = (row, index) => {
		this.setState({
			catalogProduct: row,
			catalogProductIndex: index,
		});
	}

	updateCurrentRowStyle = (state, rowInfo) => ({
		style: {
			background: rowInfo && rowInfo.index === this.state.currentProductIndex ? 'green' : null,
		},
	});

	updateCatalogRowStyle = (state, rowInfo) => ({
		style: {
			background: rowInfo && rowInfo.index === this.state.catalogProductIndex ? 'green' : null,
		},
	});

	render() {
		const { locations, categoryProducts, storeId } = this.props;
		const { selectedZoneId } = this.state;
		const currentProductsColumn = [
			{
				Header: () => this.renderHeader('id'),
				Cell: ({ row, index }) => this.renderCell(row._original, () => this.handleCurrentClick(row, index)),
				accessor: '',
			},
		];
		const catalogProductsColumn = [
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
				Header: () => this.renderHeader('id'),
				Cell: ({ row, index }) => this.renderCell(row.fbId, () => this.handleCatalogClick(row, index)),
				accessor: 'fbId',
			},
			{
				Header: () => this.renderHeader('type'),
				Cell: ({ row, index }) => this.renderCell(row.type, () => this.handleCatalogClick(row, index)),
				accessor: 'type',
			},
			{
				Header: () => this.renderHeader('subtype'),
				Cell: ({ row, index }) => this.renderCell(row.subtype, () => this.handleCatalogClick(row, index)),
				accessor: 'subtype',
			},
		];
		return (
			<div id="locations-add" className="Container-box">
				<Card className="card-box">
					<CardContent className="left-border-green">
						<Grid container spacing={24}>
							{this.renderGrid('white',
								<div>
									<SelectZone
										data={locations.length > 0 ? _.find(locations, { fbId: storeId }) : {}}
										handleSelectZone={this.handleSelectZone} />
								</div>)}

							{this.renderGrid('white',
								<TableList
									columns={currentProductsColumn}
									tables={selectedZoneId !== '' ? _.find(_.find(locations, { fbId: storeId }).subCollection.zones, { fbId: selectedZoneId }).products : []}
									pageSize={10}
									showPagination
									label="Current Products"
									deletebtnTooltip="Delete User"
									deletebtn
									searchEnable
									handleDelete={this.handleDeleteProducts}
									updateRowStyle={this.updateCurrentRowStyle} />)}

							{this.renderGrid('white',
								<TableList
									columns={catalogProductsColumn}
									tables={categoryProducts}
									pageSize={10}
									showPagination
									label="Products Catalog"
									addbtnTooltip="Add Product"
									addbtn
									searchEnable
									handleAdd={this.handleAddProducts}
									updateRowStyle={this.updateCatalogRowStyle} />)}
						</Grid>
					</CardContent>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	locations: locationsSelector(state),
	categoryProducts: productsSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getLocations: () => dispatch(getLocations()),
	getZones: (parent, id, child) => dispatch(getSubCollection(parent, id, child)),
	getProducts: () => dispatch(getProducts()),
	addSubCollectionField: (parent, id, child, childId, field, data) => dispatch(addSubCollectionField(parent, id, child, childId, field, data)),
});

Products.propTypes = {
	locations: PropTypes.array.isRequired,
	storeId: PropTypes.string,
	categoryProducts: PropTypes.array.isRequired,
	addSubCollectionField: PropTypes.func.isRequired,
	getLocations: PropTypes.func.isRequired,
	getZones: PropTypes.func.isRequired,
};

Products.defaultProps = {
	storeId: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
