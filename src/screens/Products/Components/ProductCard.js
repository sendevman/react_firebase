import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

import CancelIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import InputEvent from 'components/InputEvent';
import imgDefault from 'assets/images/imgDefault.png';

class ProductCard extends InputEvent {
  constructor(props) {
    super(props);

    this.state = {
      footer: '',
      image: '',
      subtitle: '',
      title: '',
      imgSrc: '',
      file: '',
    };
  }

  handleInputFileChange = (event) => {
    const target = event.target;
    const file = target.files[0];

    if (file) {
      this.setState({ image: file.name });
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ imgSrc: reader.result, file });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({ image: '' });
    }
  }

  render() {
    const { imgSrc } = this.state;
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent className="left-border-dark-green single">
            <div className="label-products-table select-text">Product Card</div>

            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <CardMedia
                  className="product-card-media"
                  image={imgSrc || imgDefault}
                  title="Contemplative Reptile"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <FormControl className="select-zone-box">
                      {this.renderText('title', 'Title')}
                      {this.renderText('subtitle', 'Subtitle')}
                      {this.renderText('footer', 'Footer')}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} className="upload-box">
                    <input
                      id="flat-button-file"
                      className="file-input"
                      accept="image/*"
                      type="file"
                      onChange={this.handleInputFileChange} />

                    <label className="flat-button-file" htmlFor="flat-button-file">
                      <Button component="span" variant="contained" size="small" className="upload-button">
                        Choose File
                      </Button>
                    </label>

                    <FormControl className="select-zone-box">
                      {this.renderText('image', '', 'upload-text-field', 'No file chosen')}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div className="buttons-box">
              {this.renderButton('Save', 'green', () => {}, <SaveIcon />, 'contained', 'small')}
              {this.renderButton('Cancel', 'red', () => {}, <CancelIcon />, 'contained', 'small')}
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default ProductCard;
