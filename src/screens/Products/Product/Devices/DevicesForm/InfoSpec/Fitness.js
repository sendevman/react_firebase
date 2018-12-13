import PropTypes from 'prop-types';
import _ from 'lodash';
import InputEvent from 'components/InputEvent';

import Grid from '@material-ui/core/Grid';

class Fitness extends InputEvent {
	constructor(props) {
		super(props);
		const dState = this.settingState(props.fitness);
		this.state = {
			...dState,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.fitness !== nextProps.fitness) {
			this.setState({ ...nextProps.fitness });
		}
	}

	settingState = (fitness) => {
		const fitnessKeys = _.keys(fitness);
		const dState = {};
		_.each(fitnessKeys, item => {
			dState[item] = fitness[item];
		});
		return dState;
	}

	handleInputCheckChange = (event, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = event.target.checked;
		this.setState({ ...stateCopy });
		this.props.updateFitness(stateCopy, 'fitness');
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
							{this.renderCheckBox('gps', 'GPS Tracking')}
							{this.renderCheckBox('music', 'Stand Alone Music')}
							{this.renderCheckBox('ekg', 'EKG')}
							{this.renderCheckBox('fitnessTracking', 'Fitness Tracking')}
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
