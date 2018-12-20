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

class SubCard extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			body: props.data.body || '',
			title: props.data.title || '',
			imageNameSrc: props.data.img || '',
			type: props.data.type || '',
			img: props.data.img || '',
			imgSrcType: undefined,
			changeState: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { data } = this.props;
		if (data !== nextProps.data) {
			this.setState({
				body: nextProps.data.body || '',
				title: nextProps.data.title || '',
				imageNameSrc: nextProps.data.img || '',
				img: nextProps.data.img || '',
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
					img: reader.result,
					imageNameSrc: file.name,
					imgSrcType: file,
					changeState: true,
				}, () => this.updateCurrentProduct());
			};
			reader.readAsDataURL(file);
			this.props.handleChangeState(true, this.props.cardIndex);
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
		const { body, img, title } = this.state;
		const { cardIndex } = this.props;
		const data = Object.assign({}, this.props.data);
		if (this.props.data.title !== undefined) {
			data.title = title;
		}
		if (this.props.data.body !== undefined) {
			data.body = body;
		}
		data.img = img;
		this.props.updateCurrentProduct(data, cardIndex);
		this.setState({
			changeState: false,
		});
	}

	handleSave = () => {
		const { index, cardIndex, handleSave } = this.props;
		const { body, img, imgSrcType, title } = this.state;
		const data = Object.assign({}, this.props.data);
		if (this.props.data.title !== undefined) {
			data.title = title;
		}
		if (this.props.data.body !== undefined) {
			data.body = body;
		}
		data.img = imgSrcType ? '' : img;
		handleSave(
			index,
			cardIndex,
			{
				data,
				uploadImage: imgSrcType,
			},
		);
		// this.setState({ imageNameSrc: this.props.data.img });
		this.props.handleChangeState(false, -1);
	}

	handleCancel = () => {
		this.props.handleCancel();
	}

	render() {
		const { index, cardIndex, changeState } = this.props;

		return (
			<Grid item xs={12}>

				<Grid container spacing={24}>
					<Grid item xs={12} sm={12}>
						<FormGroup>
							{this.renderText('title', 'Title')}
							{this.renderText('body', 'Body')}
						</FormGroup>

						<div className="cardview-upload-box">
							<input
								id={`flat-button-file-subCard-${index}-${cardIndex}`}
								className="file-input"
								accept="image/*"
								type="file"
								onChange={event => (changeState ? this.handleInputFileChange(event) : {})} />

							<label className="flat-button-file" htmlFor={`flat-button-file-subCard-${index}-${cardIndex}`}>
								<Button component="span" variant="contained" size="small" className="upload-button" disabled={!changeState}>
									Upload
								</Button>
							</label>

							<FormControl className="select-zone-box">
								{this.renderText('imageNameSrc', '', 'upload-text-field', 'Hero Image')}
							</FormControl>
						</div>
					</Grid>
				</Grid>
				<div className="buttons-box">
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

SubCard.propTypes = {
	index: PropTypes.number.isRequired,
	cardIndex: PropTypes.number.isRequired,
	changeState: PropTypes.bool,
	data: PropTypes.object,
	handleSave: PropTypes.func,
	handleCancel: PropTypes.func,
	addSubCollectionField: PropTypes.func.isRequired,
	updateCurrentProduct: PropTypes.func,
	handleChangeState: PropTypes.func.isRequired,
};

SubCard.defaultProps = {
	type: 'edit',
	changeState: true,
	data: {},
	handleSave: () => {},
	handleCancel: () => {},
	updateCurrentProduct: () => {},
};

export default connect(null, mapDispatchToProps)(SubCard);
