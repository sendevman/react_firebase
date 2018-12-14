import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import InputEvent from 'components/InputEvent';

class CardView extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			body: props.data.body || '',
			legal: props.data.legal || '',
			title: props.data.title || '',
			subtitle: props.data.subtitle || '',
			imageNameHeroSrc: props.data.heroImg || '',
			imgHeroSrc: '',
			imgHeroSrcType: undefined,
			changeState: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { data } = this.props;
		if (data !== nextProps.data) {
			this.setState({
				body: nextProps.data.body || '',
				legal: nextProps.data.legal || '',
				title: nextProps.data.title || '',
				subtitle: nextProps.data.subtitle || '',
				imageNameHeroSrc: nextProps.data.heroImg || '',
			});
		}
	}

	handleInputFileChange = (event) => {
		const target = event.target;
		const file = target.files[0];

		if (file) {
			this.setState({ });
			const reader = new FileReader();
			reader.onload = () => {
				this.setState({
					imgHeroSrc: reader.result,
					imageNameHeroSrc: file.name,
					imgHeroSrcType: file,
					changeState: true,
				}, () => this.handleSave());
			};
			reader.readAsDataURL(file);
		}
	}

	handleInputChange = (e, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		this.setState({
			...stateCopy,
			changeState: true,
		}, () => this.handleSave());
	};

	handleSave = () => {
		const { title, subtitle, imgHeroSrc, imgHeroSrcType, imageNameHeroSrc } = this.state;
		const data = {
			title,
			subtitle,
			heroImg: imageNameHeroSrc,
		};
		this.props.handleSave(data, imgHeroSrcType, imgHeroSrc);
		this.setState({
			changeState: false,
		});
	}

	handleCancel = () => {
		this.props.handleCancel();
	}

	render() {
		const { index } = this.props;

		return (
			<Grid item xs={12}>

				<Grid container spacing={24}>
					<Grid item xs={12} sm={12}>
						<FormGroup>
							{this.renderText('title', 'Title')}
							{this.renderText('subtitle', 'Subtitle')}
							{this.renderText('body', 'Body')}
							{this.renderText('legal', 'Legal')}
						</FormGroup>

						<div className="cardview-upload-box">
							<input
								id={`flat-button-file-hero-${index}`}
								className="file-input"
								accept="image/*"
								type="file"
								onChange={event => this.handleInputFileChange(event)} />

							<label className="flat-button-file" htmlFor={`flat-button-file-hero-${index}`}>
								<Button component="span" variant="contained" size="small" className="upload-button">
									Upload
								</Button>
							</label>

							<FormControl className="select-zone-box">
								{this.renderText('imageNameHeroSrc', '', 'upload-text-field', 'Hero Image')}
							</FormControl>
						</div>
					</Grid>
				</Grid>
				<div className="buttons-box">
					{this.renderButton('Save', 'green', this.handleSave, <SaveIcon />, 'contained', 'small')}
					{this.renderButton('Cancel', 'red', this.handleCancel, <CloseIcon />)}
				</div>

			</Grid>
		);
	}
}

CardView.propTypes = {
	index: PropTypes.number.isRequired,
	data: PropTypes.object,
	handleSave: PropTypes.func,
	handleCancel: PropTypes.func,
};

CardView.defaultProps = {
	type: 'edit',
	data: {},
	handleSave: () => {},
	handleCancel: () => {},
};

export default CardView;
