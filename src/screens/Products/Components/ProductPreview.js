import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import ProductForm from '../Components/ProductForm';

class ProductPreview extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <div className="label-products-table select-text">Info & Specs</div>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <div>Mostrando el Preview</div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ProductForm />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default ProductPreview;
