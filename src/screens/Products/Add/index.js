// import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import ProductPreview from '../Components/ProductPreview';
import ProductImport from '../Components/ProductImport';
import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';

import HomeView from 'components/HomeView';

class ProductsAdd extends InputEvent {
  handleCardSave = () => {}

  handleCardCancel = () => {}

  render() {
    const cardProductComponent = {
			title: true,
			subtitle: true,
			footer: true,
			cardImage: true,
		};
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

          {this.renderGrid('dark-green', <ProductImport />)}

					{this.renderGrid('dark-green',
						<HomeView
              title="Product Card"
              activeComponent={cardProductComponent}
              savebtn
              cancelbtn
              handleSave={this.handleCardSave}
              handleCancel={this.handleCardCancel} />)}

          {this.renderGrid('dark-green', <ProductPreview />)}
        </Grid>
      </div>
    );
  }
}

export default ProductsAdd;
