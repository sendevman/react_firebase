import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';
import SelectZone from 'components/SelectZone';

class Products extends InputEvent {
	render() {
		const currentProductsColumn = [
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
									deletebtn
									searchEnable
									handleSave={this.saveUsers} />)}

							{this.renderGrid('white',
								<TableList
									columns={currentProductsColumn}
									tables={this.props.currentProducts}
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

Products.propTypes = {
	currentProducts: PropTypes.array,
	categoryProducts: PropTypes.array,
};

Products.defaultProps = {
	currentProducts: [],
	categoryProducts: [],
};

export default Products;
