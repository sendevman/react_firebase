import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import CancelIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import InputEvent from 'components/InputEvent';

import CostPlan from './CostPlan.js';
import InfoSpec from './InfoSpec.js';

class ProductForm extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: 0,
    };
  }

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  }

  render() {
    const { tabValue } = this.state;

    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <AppBar position="static" color="default">
              <Tabs
                value={tabValue}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto"
              >
                <Tab label="Info & Specs" />
                <Tab label="Cost & Plans" />
              </Tabs>
            </AppBar>
            {tabValue === 0 &&
              <InfoSpec />
            }
            {tabValue === 1 &&
              <CostPlan />
            }
          </Grid>
        </Grid>

        <div className="buttons-box mt-block">
          {this.renderButton('Save', 'green', () => {}, <SaveIcon />, 'contained', 'small')}
          {this.renderButton('Cancel', 'red', () => {}, <CancelIcon />, 'contained', 'small')}
        </div>
      </div>
    );
  }
}

export default ProductForm;
