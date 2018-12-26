/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

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
				imageNameHeroSrc: nextProps.data.heroImg || '',
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
			this.props.handleChangeState(true, this.props.index);
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
		const data = Object.assign({}, this.props.data);
		if (this.props.data.title !== undefined) {
			data.title = title;
		}
		if (this.props.data.subtitle !== undefined) {
			data.subtitle = subtitle;
		}
		if (this.props.data.body !== undefined) {
			data.body = body;
		}
		if (this.props.data.legal !== undefined) {
			data.legal = legal;
		}
		data.heroImg = heroImg;
		data.type = type;
		this.props.updateCurrentProduct(data, index);
		this.setState({
			changeState: false,
		});
	}

	handleSave = () => {
		const { index, handleSave } = this.props;
		const { body, heroImg, imgHeroSrcType, legal, subtitle, title, type } = this.state;
		const data = Object.assign({}, this.props.data);
		if (this.props.data.title !== undefined) {
			data.title = title;
		}
		if (this.props.data.subtitle !== undefined) {
			data.subtitle = subtitle;
		}
		if (this.props.data.body !== undefined) {
			data.body = body;
		}
		if (this.props.data.legal !== undefined) {
			data.legal = legal;
		}
		data.heroImg = imgHeroSrcType ? '' : heroImg;
		data.type = type;
		handleSave(
			index,
			{
				data,
				uploadImage: imgHeroSrcType,
			},
		);
		// this.setState({ imageNameHeroSrc: this.props.data.heroImg });
		this.props.handleChangeState(false, -1);
	}

	handleCancel = () => {
		this.props.handleCancel();
	}

	render() {
		const { index, changeState } = this.props;
		const { title, subtitle, body, legal } = this.props.data;

		return (
			<Grid item xs={12}>

				<Grid container spacing={24}>
					<Grid item xs={12} sm={12}>
						<FormGroup>
							{title !== undefined && this.renderText('title', 'Title')}
							{subtitle !== undefined && this.renderText('subtitle', 'Subtitle')}
							{body !== undefined && this.renderText('body', 'Body')}
							{legal !== undefined && this.renderText('legal', 'Legal')}
						</FormGroup>

						<div className="cardview-upload-box">
							<input
								id={`flat-button-file-hero-${index}`}
								className="file-input"
								accept="image/*"
								type="file"
								onChange={event => (changeState ? this.handleInputFileChange(event) : {})} />

							<label className="flat-button-file" htmlFor={`flat-button-file-hero-${index}`}>
								<Button component="span" variant="contained" size="small" className="upload-button" disabled={!changeState}>
									Upload
								</Button>
							</label>

							<FormControl className="select-zone-box">
								{this.renderText('imageNameHeroSrc', '', 'upload-text-field', 'Hero Image')}
							</FormControl>
						</div>
					</Grid>
				</Grid>
				<div className="buttons-box" style={{ marginBottom: '20px' }}>
					{this.renderButton('Save', 'green', this.handleSave, <SaveIcon />, 'contained', 'small', !changeState)}
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
	changeState: PropTypes.bool,
	handleSave: PropTypes.func,
	handleCancel: PropTypes.func,
	addSubCollectionField: PropTypes.func.isRequired,
	updateCurrentProduct: PropTypes.func,
	handleChangeState: PropTypes.func.isRequired,
};

CardView.defaultProps = {
	type: 'edit',
	changeState: true,
	data: {},
	handleSave: () => {},
	handleCancel: () => {},
	updateCurrentProduct: () => {},
};

export default connect(null, mapDispatchToProps)(CardView);
