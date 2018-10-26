import React, { Component } from 'react';

// Material-UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

// Material-UI Icons
import CancelIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

// My Assets
import imgDefault from '../../../assets/images/imgDefault.png';

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      footer: '',
      image: '',
      subtitle: '',
      title: '',
    };
  }

  componentWillMount() {
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleInputFileChange = this._handleInputFileChange.bind(this);
  }

  _handleInputChange = (event, type) => {
    const stateCopy = Object.assign({}, this.state);
    stateCopy[type] = event.target.value;
    this.setState({ ...stateCopy });
  };

  _handleInputFileChange = (event) => {
    const target = event.target;
    const file = target.files[0];

    if (file) this.setState({ image: file.name });
    else this.setState({ image: '' });
  }

  render() {
    const { footer, image, subtitle, title } = this.state;

    return (
      <Grid item xs={12}>
        <Card>
          <CardContent className="left-border-dark-green single">
            <div className="label-products-table select-text">Product Card</div>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <CardMedia
                  className="product-card-media"
                  image={imgDefault}
                  title="Contemplative Reptile"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <FormControl className="select-zone-box">
                      <TextField
                        id="title"
                        label="Title"
                        value={title}
                        onChange={e => this._handleInputChange(e, 'title')}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl className="select-zone-box">
                      <TextField
                        id="subtitle"
                        label="Subtitle"
                        value={subtitle}
                        onChange={e => this._handleInputChange(e, 'subtitle')}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl className="select-zone-box">
                      <TextField
                        id="footer"
                        label="Footer"
                        value={footer}
                        onChange={e => this._handleInputChange(e, 'footer')}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} className="upload-box">
                    <input
                      id="flat-button-file"
                      className="file-input"
                      accept="image/*"
                      type="file"
                      onChange={this._handleInputFileChange} />

                    <label className="flat-button-file" htmlFor="flat-button-file">
                      <Button component="span" variant="contained" size="small" className="upload-button">
                        Choose File
                      </Button>
                    </label>

                    <FormControl className="select-zone-box">
                      <TextField
                        className="upload-text-field"
                        type="text"
                        placeholder="No file chosen"
                        value={image}
                        required
                        margin="normal"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div className="buttons-box">
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

export default ProductCard;
