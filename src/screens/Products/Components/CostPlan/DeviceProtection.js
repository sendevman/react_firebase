import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

class DeviceProtection extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			mobileInsurance: props.insurance.mobileInsurance,
			mobileProtection: props.insurance.mobileProtection,
			mobileProtectionMulit: props.insurance.mobileProtectionMulit,
			'mobileInsurance deviceProtected': props.insurance.mobileInsurance.deviceProtected,
			'mobileInsurance monthlyCost': props.insurance.mobileInsurance.monthlyCost,
			'mobileProtection deviceProtected': props.insurance.mobileProtection.deviceProtected,
			'mobileProtection monthlyCost': props.insurance.mobileProtection.monthlyCost,
			'mobileProtectionMulit deviceProtected': props.insurance.mobileProtectionMulit.deviceProtected,
			'mobileProtectionMulit monthlyCost': props.insurance.mobileProtectionMulit.monthlyCost,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.insurance !== nextProps.insurance) {
			this.setState({
				...nextProps.insurance,
				'mobileInsurance deviceProtected': nextProps.insurance.mobileInsurance.deviceProtected,
				'mobileInsurance monthlyCost': nextProps.insurance.mobileInsurance.monthlyCost,
				'mobileProtection deviceProtected': nextProps.insurance.mobileProtection.deviceProtected,
				'mobileProtection monthlyCost': nextProps.insurance.mobileProtection.monthlyCost,
				'mobileProtectionMulit deviceProtected': nextProps.insurance.mobileProtectionMulit.deviceProtected,
				'mobileProtectionMulit monthlyCost': nextProps.insurance.mobileProtectionMulit.monthlyCost,
			});
		}
	}

	handleInputChange = (e, type) => {
		const items = type.split(' ');
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = parseInt(e.target.value);
		stateCopy[items[0]][items[1]] = parseInt(e.target.value);
		this.setState({ ...stateCopy });
		this.updateInsurance(stateCopy);
	}

	updateInsurance = (stateCopy) => {
		const data = {
			mobileInsurance: stateCopy.mobileInsurance,
			mobileProtection: stateCopy.mobileProtection,
			mobileProtectionMulit: stateCopy.mobileProtectionMulit,
		};
		this.props.updateInsurance(data, 'insurance');
	}

	render() {
		return (
			this.renderExpansionPanel('Device Protection',
				<div className="expand-div">
					<div className="subtitle-features">AT&T Multi-Device Protection Pack</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.renderText('mobileInsurance deviceProtected', 'Device Protected', 'text-field-width', '', 'dense', 'number')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderText('mobileInsurance monthlyCost', 'Monthly Cost', 'text-field-width', '', 'dense', 'number')}
						</Grid>
					</Grid>

					<div className="subtitle-features">AT&T Mobile Protection Pack</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.renderText('mobileProtection deviceProtected', 'Device Protected', 'text-field-width', '', 'dense', 'number')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderText('mobileProtection monthlyCost', 'Monthly Cost', 'text-field-width', '', 'dense', 'number')}
						</Grid>
					</Grid>

					<div className="subtitle-features">AT&T Mobile Insurance</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.renderText('mobileProtectionMulit deviceProtected', 'Device Protected', 'text-field-width', '', 'dense', 'number')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderText('mobileProtectionMulit monthlyCost', 'Monthly Cost', 'text-field-width', '', 'dense', 'number')}
						</Grid>
					</Grid>
				</div>)
		);
	}
}

DeviceProtection.propTypes = {
	insurance: PropTypes.object,
	updateInsurance: PropTypes.func.isRequired,
};

DeviceProtection.defaultProps = {
	insurance: {},
};

export default DeviceProtection;
