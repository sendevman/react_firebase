/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import ProductPreview from './Product/ProductPreview';
import ProductImport from './Product/ProductImport';
import ProductCard from './Product/ProductCard';
import InputEvent from 'components/InputEvent';
import TableList from 'components/TableList';
// import HomeView from 'components/HomeView';

import { addDocField, getProducts, getCardTypes, getSubCollection } from 'redux/firebase/actions';
import { cardTypesSelector, productsSelector } from 'redux/firebase/selectors';

class ProductsMain extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: {},
      currentProductIndex: '',
      addProductEnable: false,
      editProductEnable: false,
      editProductIndex: '',
      multiSelectEnable: false, // You have to use with "Table Prop: selectableRowsEnable", both give a specific use.
      pageSize: 10,
      selectedRows: { data: [], lookup: {} },
    };
  }

  componentDidMount() {
    const { catalogProducts, cardTypes, getProducts, getCardTypes } = this.props;
    if (catalogProducts.length === 0) {
      getProducts();
    }
    if (cardTypes.length === 0) {
      getCardTypes();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.catalogProducts !== nextProps.catalogProducts) {
      if (this.state.currentProductIndex !== '') {
        this.setState({ currentProduct: nextProps.catalogProducts[this.state.currentProductIndex] });
      }
    }
  }

  handlePageSizeSelected = (size) => {
    this.setState({ pageSize: size });
  };

  handleRowsSelected = (index) => {
    const { catalogProducts } = this.props;

    if (this.state.currentProductIndex === index) {
      this.setState({ currentProductIndex: '', currentProduct: {} });
    } else {
      this.setState({ currentProductIndex: index, currentProduct: catalogProducts[index] });
    }
  };

  handleSelectedRows = (dataRows) => {
    this.setState({ selectedRows: dataRows });
  };

  handleCatalogClick = (row, index) => {
    this.setState({
      currentProduct: row._original,
      currentProductIndex: index,
      addProductEnable: false,
      editProductEnable: false,
      editProductIndex: '',
    });
  };

  handleAddProduct = () => {
    this.setState({ addProductEnable: true });
  };

  handleEditProduct = () => {
    this.setState({
      editProductEnable: true,
      editProductIndex: this.state.currentProductIndex,
    });
  };

  handleImportSave = (data) => {
    const { currentProduct } = this.state;
    this.props.addDocField('products', currentProduct.fbId, data);
  };

  updateRowStyle = (state, rowInfo) => ({
    style: {
      background: rowInfo && rowInfo.index === this.state.currentProductIndex ? 'green' : null,
    },
  });

  getProductList = () => {
    const { catalogProducts } = this.props;

    var newList = [];
    catalogProducts.forEach(item => {
      let newItem = [
        item.model || '',
        item.manufacture || '',
        item.fbId || '',
        item.type || '',
        item.subType || ''
      ];
      newList.push(newItem);
    });

    return newList;
  };

  render() {
    const {
      currentProductIndex,
      addProductEnable,
      currentProduct,
      editProductEnable,
      editProductIndex,
      multiSelectEnable,
      pageSize,
      selectedRows } = this.state;

    const columns = [
      { name: 'Model' },
      { name: 'Manufacture' },
      { name: 'ID' },
      { name: 'Type' },
      { name: 'SubType' }
    ];

    const catalogProductList = this.getProductList();

    // We can improve when multiSelectEnable is True.
    const productIndex = (currentProductIndex === '') ? [] : [parseInt(currentProductIndex)];

    return (
      <div id="locations-add" className="Container-box">
        <Card className="card-box">
          <CardContent className="left-border-green">
            <Grid container spacing={24}>

              {this.renderGrid('white',
                <TableList
                  columns={columns}
                  tables={catalogProductList}
                  title="Products Catalog"
                  multiSelectEnable={multiSelectEnable}
                  pageSize={pageSize}
                  rowsSelected={productIndex}
                  searchEnable={true}
                  selectableRowsEnable={false}
                  selectedRows={selectedRows}
                  handlePageSizeSelected={this.handlePageSizeSelected}
                  handleRowsSelected={this.handleRowsSelected}
                  handleSelectedRows={this.handleSelectedRows}
                  addbtn
                  addbtnTooltip="Add Product"
                  handleAdd={this.handleAddProduct} />)}

              {((editProductEnable && editProductIndex !== '') || addProductEnable) &&
                (currentProduct.type === 'service' || currentProduct.type === 'device') &&
                this.renderGrid('dark-blue',
                  <ProductImport
                    handleSave={this.handleImportSave}
                    currentProduct={currentProduct}
                    type={addProductEnable ? 'add' : 'edit'} />)}

              {((editProductEnable && editProductIndex !== '') || addProductEnable) &&
                currentProduct.type === 'service' &&
                this.renderGrid('dark-blue',
                  <ProductCard
                    img={currentProduct.img}
                    subtitle={currentProduct.subtitle}
                    title={currentProduct.title}
                    type={currentProduct.type}
                  />)}

              {((editProductEnable && editProductIndex !== '') || addProductEnable) &&
                currentProduct.type === 'device' &&
                this.renderGrid('dark-blue',
                  <ProductCard
                    camera={currentProduct.camera}
                    firstnet
                    img={currentProduct.img}
                    manufacture={currentProduct.manufacture}
                    memory={currentProduct.memory}
                    model={currentProduct.model}
                    storage={currentProduct.deviceOptions}
                    fbId={currentProduct.fbId}
                    type={currentProduct.type}
                  />)}

              {((editProductEnable && editProductIndex !== '') || addProductEnable) &&
                (currentProduct.type === 'service' || currentProduct.type === 'device') &&
                this.renderGrid('dark-blue',
                  <ProductPreview
                    currentProduct={currentProduct}
                    type={addProductEnable ? 'add' : 'edit'} />)}

            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  catalogProducts: productsSelector(state),
  cardTypes: cardTypesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  getCardTypes: () => dispatch(getCardTypes()),
  getSubCollection: (parent, id, child) => dispatch(getSubCollection(parent, id, child)),
  addDocField: (parent, id, data) => dispatch(addDocField(parent, id, data)),
});

ProductsMain.propTypes = {
  catalogProducts: PropTypes.array.isRequired,
  cardTypes: PropTypes.array.isRequired,
  getProducts: PropTypes.func.isRequired,
  getCardTypes: PropTypes.func.isRequired,
  getSubCollection: PropTypes.func.isRequired,
  addDocField: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsMain);
