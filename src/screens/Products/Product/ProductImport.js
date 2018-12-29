/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

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
      subType: props.currentProduct.subType || '',
      type: props.currentProduct.type || '',
      typeChildren: [
        { value: 'accessory', name: 'Accessory' },
        { value: 'device', name: 'Device' },
        { value: 'experience', name: 'Experience' },
        { value: 'service', name: 'Service' }
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentProduct !== nextProps.currentProduct) {
      this.setState({
        apiUrl: nextProps.currentProduct.apiUrl || '',
        manufacture: nextProps.currentProduct.manufacture || '',
        model: nextProps.currentProduct.model || '',
        opusId: nextProps.currentProduct.opusId || '',
        subType: nextProps.currentProduct.subType || '',
        type: nextProps.currentProduct.type || '',
      });
    }
  }

  handleCancel = () => {
    this.props.handleCancel();
  };

  handleImport = () => {
    console.log('Handle Import');
  };

  handleSave = () => {
    const { apiUrl, manufacture, model, opusId, subType, type } = this.state;

    if (type === 'accessory' || type === 'device') {
      this.props.handleSave({ apiUrl, manufacture, model, opusId, subType, type });
    } else {
      this.props.handleSave({ apiUrl, opusId, subType, type });
    }
  };

  handleTypeChange = (e, type) => {
    this.handleInputChange(e, type);

    const value = e.target.value;

    if (!value || value === 'experience' || value === 'service') {
      this.setState({ apiUrl: '', manufacture: '', model: '', opusId: '', subType: '' });
    } else {
      this.setState({ subType: '' });
    }
  };

  handleSubTypeChange = (e, type) => {
    this.handleInputChange(e, type);
  };

  setSubTypeFromType = () => {
    const { type } = this.state;

    switch (type) {
      case 'accessory':
        return ([
          { value: 'entertainment', name: 'Entertainment' },
          { value: 'power', name: 'Power' },
          { value: 'protection', name: 'Protection' },
        ]);
        break;
      case 'device':
        return ([
          { value: 'phone', name: 'Phone' },
          { value: 'tablet', name: 'Tablet' },
          { value: 'watch', name: 'Watch' },
        ]);
        break;
      case 'experience':
        return ([]);
        break;
      case 'service':
        return ([
          { value: 'directv', name: 'DirecTV' },
          { value: 'directv_now', name: 'DirecTV Now' },
          { value: 'directv_watch', name: 'DirecTV Watch' },
          { value: 'internet', name: 'Internet' },
        ]);
        break;
    }
  };

  setDisableSaveBtn = () => {
    const { manufacture, model, subType, type } = this.state;
    const showInput = (type === 'accessory' || type === 'device');

    if (!type || !subType) return true;
    if (showInput && (!manufacture || !model)) return true;
    return false;
  };

  render() {
    const { type } = this.state;
    const subTypeChildren = this.setSubTypeFromType();
    const showInput = (type === 'accessory' || type === 'device');
    const disableSaveBtn = this.setDisableSaveBtn();

    return (
      <Grid item xs={12}>
        <div className="label-products-table select-text">Import Product</div>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <FormControl className="select-zone-box">
              {this.renderSelect('type', 'Product Type', this.handleTypeChange, this.state.typeChildren)}
              {showInput && this.renderText('manufacture', 'Manufacture')}
              {this.renderText('opusId', 'OPUS ID')}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl className="select-zone-box">
              {this.renderSelect('subType', 'Product SubType', this.handleSubTypeChange, subTypeChildren)}
              {showInput && this.renderText('model', 'Model')}
              {this.renderText('apiUrl', 'API Url to Import')}
            </FormControl>
          </Grid>
        </Grid>

        <div className="buttons-box">
          {this.renderButton('Import Product', 'blue', this.handleImport, <ImportIcon />, 'contained', 'small', true)}
          {this.renderButton('Save', 'green', this.handleSave, <SaveIcon />, 'contained', 'small', disableSaveBtn)}
          {this.renderButton('Cancel', 'red', this.handleCancel, <CancelIcon />, 'contained', 'small')}
        </div>
      </Grid>
    );
  }
}

ProductImport.propTypes = {
  currentProduct: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default ProductImport;
