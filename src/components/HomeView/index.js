import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import ArchivelIcon from '@material-ui/icons/Archive';
import SaveIcon from '@material-ui/icons/Save';
import PreviewIcon from '@material-ui/icons/Streetview';
import ImportIcon from '@material-ui/icons/ImportExport';
import CloseIcon from '@material-ui/icons/Close';

import InputEvent from 'components/InputEvent';

import ImgDefault from 'assets/images/imgDefault.png';

class HomeView extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			footer: '',
			subtitle: '',
			backTitle: '',
			imgBackSrc: '',
			imgCardSrc: '',
			imageNameBackSrc: '',
			imageNameCardSrc: '',
		};
	}

	handleInputFileChange = (event, type) => {
		const target = event.target;
		const file = target.files[0];

		if (file) {
			this.setState({ });
			const reader = new FileReader();
			reader.onload = () => {
				if (type === 'back') {
					this.setState({
						imgBackSrc: reader.result,
						imageNameBackSrc: file.name,
					});
				} else {
					this.setState({
						imgCardSrc: reader.result,
						imageNameCardSrc: file.name,
					});
				}
			};
			reader.readAsDataURL(file);
		} else {
			this.setState({ image: '' });
		}
	}

	render() {
		const { imgBackSrc, imgCardSrc } = this.state;
		const {
			activeComponent,
			prevbtn,
			savebtn,
			importbtn,
			archbtn,
			cancelbtn,
			title,
		} = this.props;
		return (
			<Grid item xs={12}>
				<div className="label-products-table select-text">{title}</div>

				<Grid container spacing={24}>
					<Grid item xs={12} sm={6}>
						<div className="homeviewer-cardmedia-contaienr">
							<CardMedia
								className="homeview-back-media"
								image={imgBackSrc || ImgDefault}
								title="Contemplative Reptile"
							/>
							{(activeComponent.cardImage && imgCardSrc !== '') && <CardMedia
								className="homeview-card-media"
								image={imgCardSrc || ImgDefault}
								title="Contemplative Reptile"
							/>}
						</div>
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormGroup>
							{activeComponent.title && this.renderText('title', 'Title')}
							{activeComponent.subtitle && this.renderText('subtitle', 'Subtitle')}
							{activeComponent.footer && this.renderText('footer', 'Footer')}
						</FormGroup>

						{activeComponent.cardImage &&
							<div className="homeview-upload-box">
								<input
									id={`flat-button-file-card-${title}`}
									className="file-input"
									accept="image/*"
									type="file"
									onChange={event => this.handleInputFileChange(event, 'card')} />

								<label className="flat-button-file" htmlFor={`flat-button-file-card-${title}`}>
									<Button component="span" variant="contained" size="small" className="upload-button">
										Upload
									</Button>
								</label>
								<FormControl className="select-zone-box">
									{this.renderText('imageNameCardSrc', '', 'upload-text-field', 'Card Image')}
								</FormControl>
							</div>}
						{activeComponent.backTitle &&
							<FormGroup>
								{this.renderText('backTitle', 'Background Title')}
							</FormGroup>}
						{activeComponent.backImage &&
							<div className="homeview-upload-box">
								<input
									id={`flat-button-file-back-${title}`}
									className="file-input"
									accept="image/*"
									type="file"
									onChange={event => this.handleInputFileChange(event, 'back')} />

								<label className="flat-button-file" htmlFor={`flat-button-file-back-${title}`}>
									<Button component="span" variant="contained" size="small" className="upload-button">
										Upload
									</Button>
								</label>

								<FormControl className="select-zone-box">
									{this.renderText('imageNameBackSrc', '', 'upload-text-field', 'Background Image')}
								</FormControl>
							</div>}
					</Grid>
				</Grid>

				<div className="buttons-box">
					{prevbtn && this.renderButton('Preview', 'blue', () => {}, <PreviewIcon />)}
					{savebtn && this.renderButton('Save', 'green', () => {}, <SaveIcon />)}
					{importbtn && this.renderButton('Import', 'purple', () => {}, <ImportIcon />)}
					{archbtn && this.renderButton('Archive', 'orange', () => {}, <ArchivelIcon />)}
					{cancelbtn && this.renderButton('Cancel', 'red', () => {}, <CloseIcon />)}
				</div>
			</Grid>
		);
	}
}

HomeView.propTypes = {
	title: PropTypes.string,
	activeComponent: PropTypes.object,
	prevbtn: PropTypes.bool,
	savebtn: PropTypes.bool,
	importbtn: PropTypes.bool,
	archbtn: PropTypes.bool,
	cancelbtn: PropTypes.bool,
	handlePreview: PropTypes.func,
	handleSave: PropTypes.func,
	handleImport: PropTypes.func,
	handleArchive: PropTypes.func,
	handleCancel: PropTypes.func,
};

HomeView.defaultProps = {
	title: '',
	activeComponent: {},
	prevbtn: false,
	savebtn: false,
	importbtn: false,
	archbtn: false,
	cancelbtn: false,
	handlePreview: () => {},
	handleSave: () => {},
	handleImport: () => {},
	handleArchive: () => {},
	handleCancel: () => {},
};

export default HomeView;
