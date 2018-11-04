// import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import ProductCard from '../Components/ProductCard';
import ProductForm from '../Components/ProductForm';
import ProductImport from '../Components/ProductImport';
import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';

class ProductsAdd extends InputEvent {
  render() {
    const catalogProductsColumn = [
			{
				Header: () => this.renderHeader('Model'),
				accessor: 'model',
			},
			{
				Header: () => this.renderHeader('Manufacture'),
				accessor: 'manufacture',
			},
			{
				Header: () => this.renderHeader('ID'),
				accessor: 'id',
			},
			{
				Header: () => this.renderHeader('Type'),
				accessor: 'type',
			},
			{
				Header: () => this.renderHeader('Subtype'),
				accessor: 'subtype',
			},
		];
    return (
      <div id="locations-add" className="Container-box">
        <Grid container spacing={24}>
          {this.renderGrid('dark-green',
            <TableList
              columns={catalogProductsColumn}
              tables={this.props.catalogProducts}
              label="Products Catalog"
              addbtnTooltip="Add Product"
              editbtnTooltip="Edit Product"
              deletebtnTooltip="Remove Products"
              addbtn
              editbtn
              deletebtn
              searchEnable
              handleAdd={this.saveAdd}
              handleEdit={this.saveEdit}
              handleDelete={this.saveDelete} />)}

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
