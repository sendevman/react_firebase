import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

import InputEvent from './InputEvent';

class GeneralInfo extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      siteId: '',
      floorId1: '',
      floorId2: '',
    };
  }

  render() {
    return (
      <Grid item xs={12} sm={6}>
        <div className="sub-container border-shadow">
          <FormLabel component="legend">Walkbase</FormLabel>
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
              name="floorId1"
              label="Floor ID1"
              value={this.state.floorId1}
              onChange={e => this.handleInputChange(e, 'floorId1')}
              required
              margin="normal"
            />
            <TextField
              className="Text-Field"
              type="text"
              name="floorId2"
              label="Floor ID2"
              value={this.state.floorId2}
              onChange={e => this.handleInputChange(e, 'floorId2')}
              required
              margin="normal"
            />
          </FormGroup>
        </div>
      </Grid>
    );
  }
}

export default GeneralInfo;
