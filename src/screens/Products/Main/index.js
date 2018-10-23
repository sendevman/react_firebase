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
import ProductsTable from '../Components/ProductsTable';
import SelectZone from '../Components/SelectZone';

class ProductsMain extends Component {
  render() {
    return (
      <div id="locations-add" className="Container-box">
        <Card>
          <CardContent className="left-border-dark-blue">
            <Grid container spacing={24}>
              <SelectZone />

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <div className="label-products-table">Current Products</div>
                    <ProductsTable />

                    <div className="buttons-box">
                      <Tooltip title="Remove Products" placement="top">
                        <Button variant="contained" size="small" aria-label="Remove" className="btn-icon-text att-red margin-top">
                          <RemoveIcon />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <div className="label-products-table">Products Catalog</div>
                    <ProductsTable />

                    <div className="buttons-box">
                      <Tooltip title="Add Products" placement="top">
                        <Button variant="contained" size="small" aria-label="Add" className="btn-icon-text att-blue margin-top">
                          <AddIcon />
                        </Button>
                      </Tooltip>

                      <Tooltip title="Create Product" placement="top">
                        <Button variant="contained" size="small" aria-label="Create" className="btn-icon-text att-blue margin-top margin-left">
                          <CreateIcon />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default ProductsMain;
