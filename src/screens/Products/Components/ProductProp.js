// import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import ArchivelIcon from '@material-ui/icons/Archive';
import SaveIcon from '@material-ui/icons/Save';
import PreviewIcon from '@material-ui/icons/Streetview';
import ImportIcon from '@material-ui/icons/ImportExport';

import InputEvent from 'components/InputEvent';

class ProductProp extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			footer: '',
			displaySize: '',
			displayText: '',
			cameraFront: '',
			cameraRear: '',
			cameraFeature1: '',
			cameraFeature2: '',
			cameraFeature3: '',
			cameraFeature4: '',
			imgColorSrc: '',
			imageNameColorSrc: '',
		};
	}

	handleInputFileChange = (event) => {
		const target = event.target;
		const file = target.files[0];

		if (file) {
			this.setState({ });
			const reader = new FileReader();
			reader.onload = () => {
				this.setState({
					imgColorSrc: reader.result,
					imageNameColorSrc: file.name,
				});
			};
			reader.readAsDataURL(file);
		} else {
			this.setState({ image: '' });
		}
	}

	render() {
		// const {} = this.state;
		// const {} = this.props;
		return (
			<Grid item xs={12}>


				<FormGroup>
					{/* <div className="summary-fields">
					</div> */}
					<div className="color-fields">
						<input
							id="flat-button-color-field"
							className="file-input"
							accept="image/*"
							type="file"
							onChange={this.handleInputFileChange} />

						<label className="flat-button-file" htmlFor="flat-button-color-field">
							<Button component="span" variant="contained" size="small" className="upload-button">
								Upload
							</Button>
						</label>
						<FormControl className="select-zone-box">
							{this.renderText('imageNameColorSrc', '', 'upload-text-field', 'Color Image')}
						</FormControl>
					</div>
					<div className="display-fields">
						<FormControl className="select-zone-box">
							{this.renderText('displaySize', 'Display Size')}
							{this.renderText('displayText', 'Display Text')}
						</FormControl>
					</div>
					<div className="camera-fields">
						<FormControl className="select-zone-box">
							{this.renderText('cameraFront', 'Camera Front MP')}
							{this.renderText('cameraRear', 'Camera Rear MP')}
							{this.renderText('cameraFeature1', 'Camera Feature1')}
							{this.renderText('cameraFeature2', 'Camera Feature2')}
							{this.renderText('cameraFeature3', 'Camera Feature3')}
							{this.renderText('cameraFeature4', 'Camera Feature4')}
						</FormControl>
					</div>
				</FormGroup>
				<div className="buttons-box">
					{this.renderButton('Preview', 'blue', () => {}, <PreviewIcon />)}
					{this.renderButton('Save', 'green', () => {}, <SaveIcon />)}
					{this.renderButton('Import', 'purple', () => {}, <ImportIcon />)}
					{this.renderButton('Archive', 'orange', () => {}, <ArchivelIcon />)}
				</div>
			</Grid>
		);
	}
}

// ProductProp.propTypes = {
// };

// ProductProp.defaultProps = {
// };

export default ProductProp;
