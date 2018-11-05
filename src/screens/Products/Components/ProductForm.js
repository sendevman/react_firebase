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
      // webReviews: [
      //   { cons: [], pros: [], publication: 'consumer_reports', summary: '' },
      //   { cons: [], pros: [], publication: 'cnet', summary: '' },
      //   { cons: [], pros: [], publication: 'digital_trends', summary: '' },
      // ],

      // videoContent: [
      //   { author: '', src: '', title: '' },
      //   { author: '', src: '', title: '' },
      // ],

      // productType: '',
      // subType: '',

      // sku: '',

      // sim: { options: 0, type: '' },

      // releaseDate: '',

      // processor: { long: '', short: '' },

      // powerAdapterType: '',

      // offer: { description: '', img: '', opusCode: '', title: 'LIMITED TIME OFFER' },

      // model: '',
      // memory: '',
      // manufacture: '',

      // insurance: {
      //   mobileInsurance: { deviceProtected: 1, monthlyCost: 8.99 },
      //   mobileProtection: { deviceProtected: 1, monthlyCost: 11.99 },
      //   mobileProtectionMulit: { deviceProtected: 3, monthlyCost: 34.99 },
      // },

      // image: '',

      // headphoneJack: false,

      // geekbench: { multiCore: 0, singleCore: 0 },

      // fitness: {
      //   activityTracker: false,
      //   ekg: false,
      //   fitnessTracking: false,
      //   gpsTracking: false,
      //   heartRateMonitor: false,
      //   pedometer: false,
      //   runTracking: false,
      //   standAloneMusic: false,
      // },

      // expandableStorage: { available: false, type: '' },

      // display: { description: '', ppi: '', resolution: '', size: '' },

      // deviceOptions: [
      //   {
      //     expandableStorage: false,
      //     expandableStorageType: 'NA',
      //     price: '779.99',
      //     simCount: 1,
      //     simType: 'Nano',
      //     storage: '64',
      //   }, {
      //     expandableStorage: false,
      //     expandableStorageType: 'NA',
      //     price: '929.99',
      //     simCount: 1,
      //     simType: 'Nano',
      //     storage: '256',
      //   }, {
      //     expandableStorage: false,
      //     expandableStorageType: 'NA',
      //     price: '1,129.99',
      //     simCount: 1,
      //     simType: 'Nano',
      //     storage: '512',
      //   },
      // ],

      // description: '',

      // customerReviews: [
      //   {
      //     name: 'Karin M.',
      //     review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet. Nam tempus lectus quisan and Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet.',
      //     stars: 4.0,
      //   }, {
      //     name: 'Joseph H.',
      //     review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet. Nam tempus lectus quisan and Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet.',
      //     stars: 5.0,
      //   }, {
      //     name: 'Felix L.',
      //     review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet. Nam tempus lectus quisan and Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet.',
      //     stars: 4.5,
      //   },
      // ],

      // cost: {
      //   next: {
      //     description: 'Upgrade every 2 years. 0% APR; 30-month installment.',
      //     dueToday: 0,
      //     monthly: 26.34,
      //     title: 'AT&T Next',
      //     tradeIn: "May '20",
      //   },
      //   nextEveryYear: {
      //     description: 'Upgrade every year. 0% APR; 24-month installment.',
      //     dueToday: 0,
      //     monthly: 32.92,
      //     title: 'AT&T Next Every Year',
      //     tradeIn: "May '19",
      //   },
      //   noContract: {
      //     description: 'Upgrade every year. 0% APR; 24-month installment.',
      //     dueToday: 789.99,
      //     monthly: 0,
      //     title: 'No annual contract',
      //     tradeIn: 'UPGRADE ANYTIME',
      //   },
      // },

      // footer: '',
      // subtitle: '',
      // title: '',
      // capacity: '',
      // lifeTalk: '',
      // lifeAudio: '',
      // lifeVideo: '',
      // lifeInternetLfourG: '',
      // lifeInternetWiFi: '',
      // chargingWired: false,
      // chargingWireless: false,

      // feature1: '',
      // feature2: '',
      // feature3: '',
      // feature4: '',

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
