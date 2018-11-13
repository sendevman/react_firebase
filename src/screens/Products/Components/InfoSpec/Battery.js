import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

class Battery extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			capacity: '',
			life: {},
			'life internetL4G': '',
			'life internetWifi': '',
			'life talkTime': '',
			'life audio': '',
			'life video': '',
			'life chargingWired': false,
			'life chargingWireless': false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.battery !== nextProps.battery) {
			this.setState({
				...nextProps.battery,
				'life internetL4G': nextProps.battery.life.internetL4G,
				'life internetWifi': nextProps.battery.life.internetWifi,
				'life talkTime': nextProps.battery.life.talkTime,
				'life audio': nextProps.battery.life.audio,
				'life video': nextProps.battery.life.video,
				'life chargingWired': nextProps.battery.life.chargingWired,
				'life chargingWireless': nextProps.battery.life.chargingWireless,
			});
		}
	}

	handleInputChange = (e, type) => {
		const items = type.split(' ');
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		if (items[0] === 'capacity') {
			stateCopy.capacity = e.target.value;
		} else {
			stateCopy[items[0]][items[1]] = e.target.value;
		}
		this.setState({ ...stateCopy });
		this.updateBattery(stateCopy);
	}

	handleInputCheckChange = (event, type) => {
		const items = type.split(' ');
		const stateCopy = Object.assign({}, this.state);
		stateCopy[items[0]][items[1]] = event.target.checked;
		this.setState({ ...stateCopy });
		this.updateBattery(stateCopy);
	}

	updateBattery = (stateCopy) => {
		const data = {
			capacity: stateCopy.capacity,
			life: {
				internetL4G: stateCopy.life.internetL4G,
				talkTime: stateCopy.life.talkTime,
				internetWifi: stateCopy.life.internetWifi,
				audio: stateCopy.life.audio,
				video: stateCopy.life.video,
				chargingWired: stateCopy.life.chargingWired,
				chargingWireless: stateCopy.life.chargingWireless,
			},
		};
		this.props.updateBattery(data, 'battery');
	}

	render() {
		return (
			this.renderExpansionPanel('Battery',
				<div className="expand-div">
					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.renderText('capacity', 'Capacity', 'text-field-width', '', 'dense')}
							{this.renderText('life internetL4G', 'Life: L4G', 'text-field-width', '', 'dense')}
							{this.renderText('life internetWifi', 'Life: WiFi', 'text-field-width', '', 'dense')}
							{this.renderCheckBox('life chargingWired', 'Charging Wired')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderText('life talkTime', 'Life: Talk', 'text-field-width', '', 'dense')}
							{this.renderText('life audio', 'Life: Audio', 'text-field-width', '', 'dense')}
							{this.renderText('life video', 'Life: Video', 'text-field-width', '', 'dense')}
							{this.renderCheckBox('life chargingWireless', 'Charging Wireless')}
						</Grid>
					</Grid>
				</div>)
		);
	}
}

Battery.propTypes = {
	battery: PropTypes.object,
	updateBattery: PropTypes.func.isRequired,
};

Battery.defaultProps = {
	battery: {},
};

export default Battery;
