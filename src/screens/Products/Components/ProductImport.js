import React, { Component } from 'react';

// Material-UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

// Material-UI Icons
import CancelIcon from '@material-ui/icons/Close';
import ImportIcon from '@material-ui/icons/ImportExport';
import SaveIcon from '@material-ui/icons/Save';

class ProductImport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: '',
      manufacture: '',
      model: '',
      opusId: '',
    };
  }

  componentWillMount() {
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  _handleInputChange = (event, type) => {
    const stateCopy = Object.assign({}, this.state);
    stateCopy[type] = event.target.value;
    this.setState({ ...stateCopy });
  };

  render() {
    const { apiUrl, manufacture, model, opusId } = this.state;

    return (
      <Grid item xs={12}>
        <Card>
          <CardContent className="left-border-dark-green single">
            <div className="label-products-table select-text">Import Product</div>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FormControl className="select-zone-box">
                  <TextField
                    id="manufacture"
                    label="Manufacture"
                    value={manufacture}
                    onChange={e => this._handleInputChange(e, 'manufacture')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl className="select-zone-box">
                  <TextField
                    id="model"
                    label="Model"
                    value={model}
                    onChange={e => this._handleInputChange(e, 'model')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl className="select-zone-box">
                  <TextField
                    id="opus-id"
                    label="OPUS ID"
                    value={opusId}
                    onChange={e => this._handleInputChange(e, 'opusId')}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl className="select-zone-box">
                  <TextField
                    id="api-url"
                    label="API Url to Import"
                    value={apiUrl}
                    onChange={e => this._handleInputChange(e, 'apiUrl')}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <div className="buttons-box">
              <Tooltip title="Import Product" placement="top">
                <Button variant="contained" size="small" aria-label="Import" className="btn-icon-text att-blue margin-top">
                  <ImportIcon />
                </Button>
              </Tooltip>

              <Tooltip title="Save" placement="top">
                <Button variant="contained" size="small" aria-label="Save" className="btn-icon-text att-green margin-top margin-left">
                  <SaveIcon />
                </Button>
              </Tooltip>

              <Tooltip title="Cancel" placement="top">
                <Button variant="contained" size="small" aria-label="Cancel" className="btn-icon-text att-red margin-top margin-left">
                  <CancelIcon />
                </Button>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default ProductImport;
