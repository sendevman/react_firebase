import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import InputEvent from 'components/InputEvent';

import { addSubCollectionField } from 'redux/firebase/actions';

class CardView extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			body: props.data.body || '',
			legal: props.data.legal || '',
			title: props.data.title || '',
			subtitle: props.data.subtitle || '',
			imageNameHeroSrc: props.data.heroImg || '',
			type: props.data.type || '',
			heroImg: props.data.heroImg || '',
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
				imageNameHeroSrc: this.state.imageNameHeroSrc !== '' ? this.state.imageNameHeroSrc : nextProps.data.heroImg || '',
				heroImg: nextProps.data.heroImg || '',
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
					heroImg: reader.result,
					imageNameHeroSrc: file.name,
					imgHeroSrcType: file,
					changeState: true,
				}, () => this.updateCurrentProduct());
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
		}, () => this.updateCurrentProduct());
	};

	updateCurrentProduct = () => {
		const { body, heroImg, legal, subtitle, title, type } = this.state;
		const { index } = this.props;
		const data = {
			title,
			subtitle,
			body,
			legal,
			heroImg,
			type,
		};
		this.props.updateCurrentProduct(data, index);
		this.setState({
			changeState: false,
		});
	}

	handleSave = () => {
		const { index, handleSave } = this.props;
		const { body, imgHeroSrcType, legal, subtitle, title, type } = this.state;
		const data = {
			title,
			subtitle,
			body,
			legal,
			heroImg: '',
			type,
		};
		handleSave(
			index,
			{
				data,
				uploadImage: imgHeroSrcType,
			},
		);
		this.setState({ imageNameHeroSrc: imgHeroSrcType ? '' : this.props.data.heroImg });
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

const mapDispatchToProps = dispatch => ({
	addSubCollectionField: (parent, id, child, childId, field, data) => dispatch(addSubCollectionField(parent, id, child, childId, field, data)),
});

CardView.propTypes = {
	index: PropTypes.number.isRequired,
	data: PropTypes.object,
	handleSave: PropTypes.func,
	handleCancel: PropTypes.func,
	addSubCollectionField: PropTypes.func.isRequired,
	updateCurrentProduct: PropTypes.func,
};

CardView.defaultProps = {
	type: 'edit',
	data: {},
	handleSave: () => {},
	handleCancel: () => {},
	updateCurrentProduct: () => {},
};

export default connect(null, mapDispatchToProps)(CardView);
