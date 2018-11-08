import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';
import SelectZone from 'components/SelectZone';

import { getProducts } from 'redux/firebase/actions';
import { productsSelector } from 'redux/firebase/selectors';

class ProductsMain extends InputEvent {
	componentDidMount() {
		this.props.getProducts();
	}

	handleOnClick = (row) => {
		this.props.history.push(`/products/manage/device/${row.subType}/${row.fbId}`);
	}

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
				accessor: 'model',
			},
			{
				Header: () => this.renderHeader('Manufacture'),
				accessor: 'manufacture',
			},
			{
				Header: () => this.renderHeader('id'),
				accessor: 'id',
			},
			{
				Header: () => this.renderHeader('type'),
				accessor: 'type',
			},
			{
				Header: () => this.renderHeader('subtype'),
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
									<SelectZone />
								</div>)}

							{this.renderGrid('white',
								<TableList
									columns={currentProductsColumn}
									tables={this.props.currentProducts}
									label="Current Products"
									deletebtnTooltip="Delete User"
									pageSize={10}
									deletebtn
									searchEnable
									showPagination
									handleSave={this.saveUsers} />)}

							{this.renderGrid('white',
								<TableList
									columns={categoryProductsColumn}
									tables={this.props.categoryProducts}
									label="Products Catalog"
									addbtnTooltip="Add Product"
									addbtn
									searchEnable
									handleSave={this.saveUsers} />)}
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
});

ProductsMain.propTypes = {
	currentProducts: PropTypes.array.isRequired,
	categoryProducts: PropTypes.array,
	getProducts: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

ProductsMain.defaultProps = {
	categoryProducts: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsMain);
