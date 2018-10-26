import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import InputEvent from 'components/InputEvent';

class GeneralInfo extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      storeId: '',
      city: '',
      state: '',
      reigon: '',
      type: '',
      fileName: '',
    };
  }

  render() {
    return (
      <Grid item xs={12} sm={6}>
        <div className="border-shadow">
          <Grid container>
            <Grid item xs={12}>
              <div className="sub-container">
                <FormLabel component="legend">General Info</FormLabel>
                <FormGroup>
                  <TextField
                    className="Text-Field"
                    type="text"
                    name="name"
                    label="Name"
                    value={this.state.name}
                    onChange={e => this.handleInputChange(e, 'name')}
                    required
                    margin="normal"
                  />
                  <TextField
                    className="Text-Field"
                    type="text"
                    name="storeId"
                    label="Store ID"
                    value={this.state.storeId}
                    onChange={e => this.handleInputChange(e, 'storeId')}
                    required
                    margin="normal"
                  />
                  <TextField
                    className="Text-Field"
                    type="text"
                    name="city"
                    label="City"
                    value={this.state.city}
                    onChange={e => this.handleInputChange(e, 'city')}
                    required
                    margin="normal"
                  />
                  <TextField
                    className="Text-Field"
                    type="text"
                    name="state"
                    label="State"
                    value={this.state.state}
                    onChange={e => this.handleInputChange(e, 'state')}
                    required
                    margin="normal"
                  />
                  <TextField
                    className="Text-Field"
                    type="text"
                    name="reigon"
                    label="Reigon"
                    value={this.state.reigon}
                    onChange={e => this.handleInputChange(e, 'reigon')}
                    required
                    margin="normal"
                  />
                  <TextField
                    className="Text-Field"
                    type="text"
                    name="type"
                    label="Type"
                    value={this.state.type}
                    onChange={e => this.handleInputChange(e, 'type')}
                    required
                    margin="normal"
                  />
                </FormGroup>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="sub-container">
                <FormLabel component="legend">Floorplan Upload</FormLabel>
                <FormGroup>
                  <div className="d-flex">
                    <TextField
                      className="Text-Field w-50"
                      type="text"
                      name="fileName"
                      label="File Name.png"
                      value={this.state.fileName}
                      onChange={e => this.handleInputChange(e, 'fileName')}
                      required
                      margin="normal"
                    />
                    <Button
                      className="Submit-Button"
                      variant="contained"
                      size="medium"
                      color="primary"
                      onClick={() => this._signIn()}>
                      Upload
                    </Button>
                  </div>
                </FormGroup>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default GeneralInfo;
