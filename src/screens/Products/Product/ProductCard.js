/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import ImgDefault from 'assets/images/imgDefault.png';

import InputEvent from 'components/InputEvent';

import { addSubCollectionField } from 'redux/firebase/actions';

class ProductCard extends InputEvent {
	constructor(props) {
		super(props);

		let storage = '';
		_.each(props.deviceOptions, deviceOption => {
			storage = storage + deviceOption.storage + ' ';
		});
		let camera = '';
		if (props.camera && props.camera.rear && props.camera.rear.sensor) {
			camera += props.camera.rear.sensor;
		}
		if (props.camera && props.camera.front && props.camera.front.sensor) {
			camera += props.camera.front.sensor;
		}
		this.state = {
			camera,
			firstnet: true,
			img: props.img || '',
			manufacture: props.manufacture || '',
			memory: props.memory || '',
			model: props.model || '',
			storage,
			title: props.title || '',
			subtitle: props.title || '',
			fbId: props.fbId || '',

			imageNameSrc: props.img || '',
			type: props.type || '',
			imgSrcType: undefined,
			changeState: false,
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
					img: reader.result,
					imageNameSrc: file.name,
					imgSrcType: file,
					changeState: true,
				});
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
		});
	};

	handleSave = () => {
		const { fbId, img, manufacture, memory, model, camera, subtitle, storage, title, imgSrcType, type } = this.state;
		const data = Object.assign({}, this.props.data);
		if (data.title !== undefined) {
			data.title = title;
		}
		if (data.subtitle !== undefined) {
			data.subtitle = subtitle;
		}
		if (data.camera !== undefined) {
			data.camera = camera;
		}
		if (data.manufacture !== undefined) {
			data.manufacture = manufacture;
		}
		if (data.model !== undefined) {
			data.model = model;
		}
		if (data.memory !== undefined) {
			data.memory = memory;
		}
		if (data.deviceOptions && data.deviceOptions.length > 0) {
			data.storage = storage;
		}
		data.img = img;
		if (type === 'service') {
			if (data.uploadImage) {
				this.props.addDocImageField(
					'products',
					fbId,
					'pnyCard',
					undefined,
					data,
					'img',
					imgSrcType,
				);
			} else {
				this.props.addDocImageField(
					'products',
					fbId,
					'pnyCard',
					undefined,
					'img',
					data,
				);
			}
		} else if (data.uploadImage) {
			this.props.addDocImageField(
				'products',
				fbId,
				'',
				undefined,
				data,
				'img',
				imgSrcType,
			);
		} else {
			this.props.addDocImageField(
				'products',
				fbId,
				'',
				undefined,
				'img',
				data,
			);
		}
		this.setState({ imageNameSrc: imgSrcType ? '' : this.props.img });
	}

	handleCancel = () => {
		this.props.handleCancel();
	}

	render() {
		const { img, title, camera, subtitle, deviceOptions, model, manufacture, memory } = this.props;
		const { changeState, firstnet, imageNameSrc } = this.state;

		return (
			<Grid item xs={12}>
				<div className="label-products-table select-text">Product Card</div>

				<Grid container spacing={24}>
					<Grid item xs={12} sm={6}>
						<div className="homeviewer-cardmedia-contaienr">
							<CardMedia
								className="homeview-back-media"
								image={img || imageNameSrc || ImgDefault}
								title="Contemplative Reptile"
							/>
						</div>
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormGroup>
							{camera && this.renderText('camera', 'Camera')}
							{firstnet && this.renderText('firstnet', 'Firstnet')}
							{manufacture && this.renderText('manufacture', 'Manufacture')}
							{memory && this.renderText('memory', 'Memory')}
							{model && this.renderText('model', 'Model')}
							{deviceOptions && deviceOptions.length > 0 && this.renderText('storage', 'Storage')}
							{title && this.renderText('title', 'Title')}
							{subtitle && this.renderText('subtitle', 'Subtitle')}
						</FormGroup>

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
						</div>
					</Grid>
				</Grid>

				<div className="buttons-box">
					{this.renderButton('Save', 'green', this.handleSave, <SaveIcon />, 'contained', 'medium', !changeState)}
					{this.renderButton('Cancel', 'red', this.handleCancel, <CloseIcon />)}
				</div>
			</Grid>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addSubCollectionField: (parent, id, child, childId, field, imgItem, data) => dispatch(addSubCollectionField(parent, id, child, childId, field, imgItem, data)),
});

ProductCard.propTypes = {
	camera: PropTypes.object,
	img: PropTypes.string,
	manufacture: PropTypes.string,
	memory: PropTypes.string,
	model: PropTypes.string,
	deviceOptions: PropTypes.array,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	fbId: PropTypes.string,
	type: PropTypes.string.isRequired,
	addSubCollectionField: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
	data: {},
};

export default connect(null, mapDispatchToProps)(ProductCard);
