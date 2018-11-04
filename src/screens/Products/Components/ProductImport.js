import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
      apiUrl: '',
      manufacture: '',
      model: '',
      opusId: '',
    };
  }

  render() {
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent className="left-border-dark-green single">
            <div className="label-products-table select-text">Import Product</div>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <FormControl className="select-zone-box">
                  {this.renderText('manufacture', 'Manufacture')}
                  {this.renderText('opusId', 'OPUS ID')}
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
              {this.renderButton('Import Product', 'blue', this.props.handleSave, <ImportIcon />, 'contained', 'small')}
              {this.renderButton('Save', 'green', this.props.handleSave, <SaveIcon />, 'contained', 'small')}
              {this.renderButton('Cancel', 'red', this.props.handleSave, <CancelIcon />, 'contained', 'small')}
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default ProductImport;
