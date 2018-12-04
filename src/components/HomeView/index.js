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
			footer: props.data.footer || '',
			title: props.data.title || '',
			subtitle: props.data.subtitle || '',
			backTitle: props.data.backTitle || '',
			imageNameBackSrc: props.data.bgImg || '',
			imageNameCardSrc: props.data.img || '',
			imgBackSrc: '',
			imgCardSrc: '',
			imgBackSrcType: undefined,
			imgCardSrcType: undefined,
			changeState: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { changeState, data } = this.props;
		if (data !== nextProps.data) {
			this.setState({
				footer: nextProps.data.footer || '',
				title: nextProps.data.title || '',
				subtitle: nextProps.data.subtitle || '',
				backTitle: nextProps.data.backTitle || '',
				imageNameBackSrc: nextProps.data.bgImg || '',
				imageNameCardSrc: nextProps.data.img || '',
			});
		}
		if (changeState !== nextProps.changeState) {
			this.setState({ changeState: nextProps.changeState });
		}
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
						imgBackSrcType: file,
						changeState: true,
					});
				} else {
					this.setState({
						imgCardSrc: reader.result,
						imageNameCardSrc: file.name,
						imgCardSrcType: file,
						changeState: true,
					});
				}
			};
			reader.readAsDataURL(file);
		} else {
			this.setState({ image: '' });
		}
	}

	handleInputChange = (e, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		this.setState({
			...stateCopy,
			changeState: true,
		});
	};

	handleSave = () => {
		const { footer, title, subtitle, imgBackSrcType, imageNameBackSrc, imgCardSrcType, imageNameCardSrc } = this.state;
		const data = {
			footer,
			title,
			subtitle,
			img: imageNameCardSrc,
			bgImg: imageNameBackSrc,
		};
		this.props.handleSave(data, imgBackSrcType, imgCardSrcType);
		this.setState({
			changeState: false,
		});
	}

	render() {
		const {
			changeState,
			imageNameBackSrc,
			imgBackSrc,
			imageNameCardSrc,
			imgCardSrc,
		} = this.state;
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
							{(!activeComponent.cardImage || activeComponent.backImage) &&
								<CardMedia
									className="homeview-back-media"
									image={imgBackSrc || imageNameBackSrc || ImgDefault}
									title="Contemplative Reptile"
								/>}
							{(activeComponent.cardImage && (imgCardSrc !== '' || imageNameCardSrc || !activeComponent.backImage)) &&
								<CardMedia
									className={activeComponent.backImage === false ? 'homeview-back-media' : 'homeview-card-media'}
									image={imgCardSrc || imageNameCardSrc || ImgDefault}
									title="Contemplative Reptile"
								/>}
							<div className="homeviewer-cardmedia-content">
								<div className="homeviewer-cardmedia-title">{this.state.title}</div>
								<div className="homeviewer-cardmedia-subtitle">{this.state.subtitle}</div>
								<div className="homeviewer-cardmedia-footer">{this.state.footer}</div>
							</div>
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
					{savebtn && this.renderButton('Save', 'green', () => this.handleSave(), <SaveIcon />, 'contained', 'medium', !changeState)}
					{importbtn && this.renderButton('Import', 'purple', () => {}, <ImportIcon />)}
					{archbtn && this.renderButton('Archive', 'orange', () => {}, <ArchivelIcon />)}
					{cancelbtn && this.renderButton('Cancel', 'red', () => {}, <CloseIcon />)}
				</div>
			</Grid>
		);
	}
}

HomeView.propTypes = {
	data: PropTypes.object,
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
	data: {},
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
