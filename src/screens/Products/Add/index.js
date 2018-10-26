import React, { Component } from 'react';

// Material-UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

// Material-UI Icons
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import RemoveIcon from '@material-ui/icons/Delete';

// Products - My Components
import ProductCard from '../Components/ProductCard';
import ProductForm from '../Components/ProductForm';
import ProductImport from '../Components/ProductImport';
import ProductsTable from '../Components/ProductsTable';

class ProductsAdd extends Component {
  render() {
    return (
      <div id="locations-add" className="Container-box">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card>
              <CardContent className="left-border-dark-green single">
                <div className="label-products-table">Products Catalog</div>

                <ProductsTable />

                <div className="buttons-box">
                  <Tooltip title="Add Product" placement="top">
                    <Button variant="contained" size="small" aria-label="Add" className="btn-icon-text att-blue margin-top">
                      <AddIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip title="Edit Product" placement="top">
                    <Button variant="contained" size="small" aria-label="Edit" className="btn-icon-text att-orange margin-top margin-left">
                      <CreateIcon />
                    </Button>
                  </Tooltip>

                  <Tooltip title="Remove Products" placement="top">
                    <Button variant="contained" size="small" aria-label="Remove" className="btn-icon-text att-red margin-top margin-left">
                      <RemoveIcon />
                    </Button>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <ProductImport />

          <ProductCard />

          <Grid item xs={12}>
            <Card>
              <CardContent className="left-border-dark-green single">
                <div className="label-products-table select-text">Info & Specs</div>

                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <div>Mostrando el Preview</div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <ProductForm />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProductsAdd;
