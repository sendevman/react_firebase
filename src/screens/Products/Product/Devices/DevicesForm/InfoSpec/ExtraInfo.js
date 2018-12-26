/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

class ExtraInfo extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			model: props.model,
			manufacture: props.manufacture,
			powerAdapterType: props.powerAdapterType,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.model !== nextProps.model) {
			this.setState({ model: nextProps.model });
		}
		if (this.props.manufacture !== nextProps.manufacture) {
			this.setState({ manufacture: nextProps.manufacture });
		}
		if (this.props.powerAdapterType !== nextProps.powerAdapterType) {
			this.setState({ powerAdapterType: nextProps.powerAdapterType });
		}
	}

	handleInputChange = (e, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		this.setState({ ...stateCopy });
		this.props.updateExtraInfo(stateCopy, '');
	}

	render() {
		return (
			this.renderExpansionPanel('Extra Information',
				<div className="expand-div">
					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.renderText('model', 'Model', 'text-field-width', '', 'dense')}
							{this.renderText('manufacture', 'Manufacture', 'text-field-width', '', 'dense')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderText('powerAdapterType', 'Power Adapter Type', 'text-field-width', '', 'dense')}
						</Grid>
					</Grid>
				</div>)
		);
	}
}

ExtraInfo.propTypes = {
	model: PropTypes.string,
	manufacture: PropTypes.string,
	powerAdapterType: PropTypes.string,
	updateExtraInfo: PropTypes.func.isRequired,
};

ExtraInfo.defaultProps = {
	model: '',
	manufacture: '',
	powerAdapterType: '',
};

export default ExtraInfo;
