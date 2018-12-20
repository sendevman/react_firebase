import PropTypes from 'prop-types';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

class DeviceProtection extends InputEvent {
	constructor(props) {
		super(props);
		const { insurance } = props;
		const dState = this.settingState(insurance);
		this.state = {
			...dState,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { insurance } = nextProps;
		if (this.props.insurance !== insurance) {
			const dState = this.settingState(insurance);
			this.setState({
				...dState,
			});
		}
	}

	settingState = (insurance) => {
			const insuranceKeys = _.keys(insurance);
			const dState = {};
			_.each(insuranceKeys, item => {
				const itemKeys = _.keys(insurance[item]);
				dState[item] = insurance[item];
				_.each(itemKeys, sItem => {
					dState[`${item} ${sItem}`] = insurance[item][sItem];
				});
			});
		return dState;
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
					{this.state.mobileInsurance &&
						<div>
							<div className="subtitle-features">AT&T Multi-Device Protection Pack</div>

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									{this.renderText('mobileInsurance deviceProtected', 'Device Protected', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('mobileInsurance monthlyCost', 'Monthly Cost', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>
						</div>}

					{this.state.mobileProtection &&
						<div>
							<div className="subtitle-features">AT&T Mobile Protection Pack</div>

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									{this.renderText('mobileProtection deviceProtected', 'Device Protected', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('mobileProtection monthlyCost', 'Monthly Cost', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>
						</div>}

					{this.state.mobileProtectionMulit &&
						<div>
							<div className="subtitle-features">AT&T Mobile Insurance</div>

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									{this.renderText('mobileProtectionMulit deviceProtected', 'Device Protected', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('mobileProtectionMulit monthlyCost', 'Monthly Cost', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>
						</div>}
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
