import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import InputEvent from './InputEvent';

class IPog extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      autoUpdate: false,

      siteId: '',
      data1: '',
      data2: '',
    };
  }

  render() {
    const { autoUpdate } = this.state;
    return (
      <Grid item xs={12}>
        <div className="border-shadow">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <div className="sub-container">
              <FormLabel component="legend">IPog</FormLabel>
              <FormGroup>
                <TextField
                  className="Text-Field"
                  type="text"
                  name="siteId"
                  label="Site ID"
                  value={this.state.siteId}
                  onChange={e => this.handleInputChange(e, 'siteId')}
                  required
                  margin="normal"
                />
                <TextField
                  className="Text-Field"
                  type="text"
                  name="data1"
                  label="Data1"
                  value={this.state.data1}
                  onChange={e => this.handleInputChange(e, 'Data1')}
                  required
                  margin="normal"
                />
                <TextField
                  className="Text-Field"
                  type="text"
                  name="data2"
                  label="Data2"
                  value={this.state.data2}
                  onChange={e => this.handleInputChange(e, 'Data2')}
                  required
                  margin="normal"
                />
              </FormGroup>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="sub-container">
                <FormLabel component="legend">IPog Info</FormLabel>
                <FormGroup>
                  <div>Last Update</div>
                  <FormControlLabel
                    label="Auto Update"
                    control={
                      <Checkbox
                        checked={autoUpdate}
                        onChange={e => this.handleCheckChange(e, 'autoUpdate')}
                        value="autoUpdate" />
                    }
                  />
                </FormGroup>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default IPog;
