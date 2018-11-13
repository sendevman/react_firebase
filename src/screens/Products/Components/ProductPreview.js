import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import ProductProp from './ProductProp';
import Phone from './Phone';

class ProductPreview extends Component {
	render() {
		const { currentProduct } = this.props;
		return (
		<Grid item xs={12}>
			<div className="label-products-table select-text">Info & Specs</div>

			<Grid container spacing={24}>
				<Grid item xs={12} sm={6}>
					<Phone currentProduct={currentProduct} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<ProductProp />
				</Grid>
			</Grid>
		</Grid>
		);
	}
}

ProductPreview.propTypes = {
	currentProduct: PropTypes.object,
};

ProductPreview.defaultProps = {
	currentProduct: {},
};

export default ProductPreview;
