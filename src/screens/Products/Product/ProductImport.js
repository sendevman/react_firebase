import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

import CancelIcon from '@material-ui/icons/Close';
import ImportIcon from '@material-ui/icons/ImportExport';
import SaveIcon from '@material-ui/icons/Save';

import InputEvent from 'components/InputEvent';

class ProductImport extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: props.currentProduct.apiUrl || '',
      manufacture: props.currentProduct.manufacture || '',
      model: props.currentProduct.model || '',
      opusId: props.currentProduct.opusId || '',
      type: props.currentProduct.type || '',
    };
  }

  handleSave = () => {
    // const data = [
    //   { apiUrl: this.state.apiUrl },
    //   { manufacture: this.state.manufacture },
    //   { model: this.state.model },
    //   { opusId: this.state.opusId },
    //   { type: this.state.type },
    // ];
    this.props.handleSave(this.state);
  }

  render() {
    return (
      <Grid item xs={12}>
        <div className="label-products-table select-text">Import Product</div>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <FormControl className="select-zone-box">
              {this.renderText('manufacture', 'Manufacture')}
              {this.renderText('opusId', 'OPUS ID')}
              {this.renderText('type', 'Product Type')}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl className="select-zone-box">
              {this.renderText('model', 'Model')}
              {this.renderText('apiUrl', 'API Url to Import')}
            </FormControl>
          </Grid>
        </Grid>

        <div className="buttons-box">
          {this.renderButton('Import Product', 'blue', this.handleImport, <ImportIcon />, 'contained', 'small')}
          {this.renderButton('Save', 'green', this.handleSave, <SaveIcon />, 'contained', 'small')}
          {this.renderButton('Cancel', 'red', this.handleCancel, <CancelIcon />, 'contained', 'small')}
        </div>
      </Grid>
    );
  }
}

ProductImport.propTypes = {
  currentProduct: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default ProductImport;
