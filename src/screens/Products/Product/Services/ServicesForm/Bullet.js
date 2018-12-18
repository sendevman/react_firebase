import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';

import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import InputEvent from 'components/InputEvent';

import { addDocField, addSubCollectionField } from 'redux/firebase/actions';

class Bullet extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			data: props.data || '',
			changeState: false,
		};
	}

	handleInputChange = (e, index) => {
		const data = this.state.data.slice();
		data[index] = e.target.value;
		this.setState({
			data,
			changeState: true,
		}, () => this.updateCurrentProduct());
	};

	updateCurrentProduct = () => {
		const { data } = this.state;
		this.props.updateCurrentProduct(data);
		this.setState({
			changeState: false,
		});
	}

	handleSave = () => {
		const { data } = this.state;
		this.props.handleSave(data);
		this.setState({
			changeState: false,
		});
	}

	handleCancel = () => {
		this.props.handleCancel();
	}

	render() {
		const { data } = this.state;

		return (
			<Grid item xs={12}>

				<Grid container spacing={24}>
					<Grid item xs={12} sm={12}>
						<FormGroup>
							{data.map((item, index) => (
								<TextField
									key={index}
									className="Text-Field"
									value={item}
									onChange={e => this.handleInputChange(e, index)}
									required
									margin="normal"
								/>))}
						</FormGroup>
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
	addDocField: (field, id, data) => dispatch(addDocField(field, id, data)),
});

Bullet.propTypes = {
	data: PropTypes.array,
	handleSave: PropTypes.func,
	handleCancel: PropTypes.func,
	addSubCollectionField: PropTypes.func.isRequired,
	updateCurrentProduct: PropTypes.func,
};

Bullet.defaultProps = {
	type: 'edit',
	data: [],
	handleSave: () => {},
	handleCancel: () => {},
	updateCurrentProduct: () => {},
};

export default connect(null, mapDispatchToProps)(Bullet);
