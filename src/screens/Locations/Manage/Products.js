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
			currentProduct: '',
			currentProductIndex: [],
		};
		this.selected = {};
		this.rProductsList = [];
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

	getCategoryProductsList = () => {
		const { categoryProducts } = this.props;

		const newList = [];
		if (categoryProducts.length > 0) {
			categoryProducts.forEach(item => {
				const newItem = [
					item.manufacture || '',
					item.model || '',
					item.type || '',
					item.subType || '',
					item.sku || '',
				];
				newList.push(newItem);
			});
		}
		return newList;
	};

	getCurrentProductsList = () => {
		const { selectedZoneId } = this.state;
		const { categoryProducts, locations, storeId } = this.props;

		const products = selectedZoneId !== '' ? _.find(_.find(locations, { fbId: storeId }).subCollection.zones, { fbId: selectedZoneId }).products : [];
		const newList = [];
		if (products.length > 0) {
			products.forEach(item => {
				if (item !== 'titleCard') {
					const data = _.find(categoryProducts, { fbId: item });
					const newItem = [
						data.manufacture || '',
						data.model || '',
						data.type || '',
						data.subType || '',
						data.sku || '',
					];
					newList.push(newItem);
				}
			});
		}
		return newList;
	}

	handleDeleteProducts = () => {
		const { addSubCollectionField, getZones, storeId } = this.props;
		const {	currentProduct, selectedZone, selectedZoneId } = this.state;
		if (selectedZoneId !== '') {
			const products = selectedZone.products.slice();
			_.remove(products, product => product === currentProduct[0]);
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
			this.setState({ currentProductIndex: [] });
			getZones('locations', storeId, 'zones');
		}
	}

	handleAddProducts = () => {
		const { addSubCollectionField, getZones, storeId } = this.props;
		const {	selectedZone, selectedZoneId } = this.state;
		if (selectedZoneId !== '') {
			const products = _.uniq(selectedZone.products.concat(this.rProductsList.map(item => item.fbId)));
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

	handleSelectZone = (idx) => {
		const { locations, storeId } = this.props;
		const selectedZone = _.find(_.find(locations, { fbId: storeId }).subCollection.zones, { fbId: idx });
		this.setState({
			selectedZone,
			selectedZoneId: idx,
		});
	}

	handlePageSizeSelected = size => {
		this.setState({ pageSize: size });
	};

	handleRowsSelected = index => {
		const { selectedZoneId } = this.state;
		const { locations, storeId } = this.props;

		const products = selectedZoneId !== '' ? _.find(_.find(locations, { fbId: storeId }).subCollection.zones, { fbId: selectedZoneId }).products : [];
		this.setState({
			currentProduct: products.length > 0 ? [products[index + 1]] : [],
			currentProductIndex: [index],
		});
	}

	handleSelectedRows = (dataRows, selectedRows) => {
		const { categoryProducts } = this.props;
		const selected = {};
		_.each(selectedRows.data, item => {
			selected[categoryProducts[item.dataIndex].fbId] = true;
		});
		const data = [];
		_.each(_.keys(selected), item => {
			if (selected[item]) {
				data.push(_.find(categoryProducts, { fbId: item }));
			}
		});
		this.selected = selected;
		this.rProductsList = data;
	};

	render() {
		const { locations, storeId } = this.props;
		const { currentProductIndex } = this.state;

		const currentProductsColumn = [
			{ name: 'Manufacture' },
			{ name: 'Model' },
			{ name: 'Type' },
			{ name: 'Subtype' },
			{ name: 'Opus ID' },
		];
		const catalogProductsColumn = [
			{ name: 'Manufacture' },
			{ name: 'Model' },
			{ name: 'Type' },
			{ name: 'Subtype' },
			{ name: 'Opus ID' },
		];

		const categoryProductsList = this.getCategoryProductsList();
		const currentProductsList = this.getCurrentProductsList();

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
									tables={currentProductsList}
									pageSize={10}
									showPagination
									label="Current Products"
									deletebtnTooltip="Delete User"
									deletebtn
									searchEnable
									multiSelectEnable={false}
									selectableRowsEnable={false}
									rowsSelected={currentProductIndex}
									handlePageSizeSelected={this.handlePageSizeSelected}
									handleRowsSelected={this.handleRowsSelected}
									handleDelete={this.handleDeleteProducts} />)}

							{this.renderGrid('white',
								<TableList
									columns={catalogProductsColumn}
									tables={categoryProductsList}
									pageSize={10}
									showPagination
									label="Products Catalog"
									addbtnTooltip="Add Product"
									addbtn
									searchEnable
									selectableRowsEnable
									// selectedRows={selectedRows}
									handlePageSizeSelected={this.handlePageSizeSelected}
									handleSelectedRows={this.handleSelectedRows}
									handleAdd={this.handleAddProducts} />)}
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
