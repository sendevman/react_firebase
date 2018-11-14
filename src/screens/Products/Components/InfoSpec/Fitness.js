import PropTypes from 'prop-types';
import InputEvent from 'components/InputEvent';

import Grid from '@material-ui/core/Grid';

class Fitness extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			pedometer: false,
			runTracking: false,
			heartRateMonitor: false,
			activityTracker: false,
			gpsTracking: false,
			standAloneMusic: false,
			ekg: false,
			titnessTracking: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.fitness !== nextProps.fitness) {
			this.setState({ ...nextProps.fitness });
		}
	}

	handleInputCheckChange = (event, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = event.target.checked;
		this.setState({ ...stateCopy });
		// this.props.updateFitness(stateCopy, 'fitness');
	}

	render() {
		return (
			this.renderExpansionPanel('Fitness',
				<div className="expand-div">
					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.renderCheckBox('pedometer', 'Pedometer')}
							{this.renderCheckBox('runTracking', 'Run Tracking')}
							{this.renderCheckBox('heartRateMonitor', 'Heart Rate Monitor')}
							{this.renderCheckBox('activityTracker', 'Activity Tracker')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderCheckBox('gpsTracking', 'GPS Tracking')}
							{this.renderCheckBox('standAloneMusic', 'Stand Alone Music')}
							{this.renderCheckBox('ekg', 'EKG')}
							{this.renderCheckBox('titnessTracking', 'Fitness Tracking')}
						</Grid>
					</Grid>
				</div>)
		);
	}
}

Fitness.propTypes = {
	fitness: PropTypes.object,
	updateFitness: PropTypes.func.isRequired,
};

Fitness.defaultProps = {
	fitness: {},
};

export default Fitness;
