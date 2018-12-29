/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import ImgDefault from 'assets/images/imgDefault.png';

import InputEvent from 'components/InputEvent';

import { uploadImage } from 'redux/firebase/actions';

class ServiceCard extends InputEvent {
  constructor(props) {
    super(props);

    let img = props.currentProduct.pnyCard ? props.currentProduct.pnyCard.img : '';
    let subtitle = props.currentProduct.pnyCard ? props.currentProduct.pnyCard.subtitle : '';
    let title = props.currentProduct.pnyCard ? props.currentProduct.pnyCard.title : '';

    this.state = {
      img: img || '',
      subtitle: subtitle || '',
      title: title || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentProduct.pnyCard !== nextProps.currentProduct.pnyCard) {
      let img = nextProps.currentProduct.pnyCard ? nextProps.currentProduct.pnyCard.img : '';
      let subtitle = nextProps.currentProduct.pnyCard ? nextProps.currentProduct.pnyCard.subtitle : '';
      let title = nextProps.currentProduct.pnyCard ? nextProps.currentProduct.pnyCard.title : '';

      this.setState({
        img: img || '',
        subtitle: subtitle || '',
        title: title || '',
      });
    }
  }

  handleInputFileChange = (event) => {
    const { currentProduct } = this.props;
    const { subtitle, title } = this.state;

    const file = event.target.files[0];
    const objFile = { name: file.name, data: file };
    const data = { pnyCard: { subtitle, title } };

    if (file) this.props.uploadImage(`products/${currentProduct.fbId}/pnyCard/`, objFile, data);
  };

  handleCancel = () => {
    this.props.handleCancel();
  };

  handleSave = () => {
    const { img, subtitle, title } = this.state;
    this.props.handleSave({ pnyCard: { img, subtitle, title } });
  };

  render() {
    const { img, title } = this.state;

    return (
      <Grid item xs={12}>
        <div className="label-products-table select-text">Product Card</div>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <div className="homeviewer-cardmedia-contaienr">
              <CardMedia
                className="homeview-back-media"
                image={img || ImgDefault}
                title="Contemplative Reptile"
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormGroup>
              {this.renderText('title', 'Title')}
              {this.renderText('subtitle', 'Subtitle')}
            </FormGroup>

            <div className="homeview-upload-box">
              <input
                id={`flat-button-file-card-${title}`}
                className="file-input"
                accept="image/*"
                type="file"
                onChange={event => this.handleInputFileChange(event, 'card')} />

              <label className="flat-button-file right-btn" htmlFor={`flat-button-file-card-${title}`}>
                <Button component="span" variant="contained" size="small" className="upload-button">
                  Browse
                </Button>
              </label>

              <FormControl className="text-field-img" margin={'normal'}>
                {this.renderText('img', '', 'upload-text-field-right-btn', 'Card Image', 'normal', 'text', true)}
              </FormControl>
            </div>
          </Grid>
        </Grid>

        <div className="buttons-box">
          {this.renderButton('Save', 'green', this.handleSave, <SaveIcon />, 'contained', 'medium')}
          {this.renderButton('Cancel', 'red', this.handleCancel, <CloseIcon />)}
        </div>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  uploadImage: (path, file, data) => dispatch(uploadImage(path, file, data)),
});

ServiceCard.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  currentProduct: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ServiceCard);
