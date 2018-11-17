import PropTypes from 'prop-types';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

class Performances extends InputEvent {
	constructor(props) {
		super(props);
		const { processor, memory, expandableStorage } = props;
		const processorState = this.settingState(processor, 'processor');
		const expandableStorageState = this.settingState(expandableStorage, 'expandableStorage');
		this.state = {
			processor,
			memory,
			expandableStorage,
			...processorState,
			...expandableStorageState,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { processor, memory, expandableStorage } = nextProps;
		if (this.props.processor !== processor) {
			const processorState = this.settingState(processor, 'processor');
			this.setState({
				processor,
				...processorState,
			});
		}
		if (this.props.memory !== memory) {
			this.setState({ memory });
		}
		if (this.props.expandableStorage !== expandableStorage) {
			const expandableStorageState = this.settingState(expandableStorage, 'expandableStorage');
			this.setState({
				expandableStorage,
				...expandableStorageState,
			});
		}
	}

	settingState = (data, key) => {
		const dataKeys = _.keys(data);
		const dState = {};
		_.each(dataKeys, item => {
			dState[`${key} ${item}`] = data[item];
		});
		return dState;
	}

	handleInputChange = (e, type) => {
		const items = type.split(' ');
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		if (items[0] !== 'memory') {
			stateCopy[items[0]][items[1]] = e.target.value;
		}
		this.setState({ ...stateCopy });
		this.updatePerformance(stateCopy);
	}

	handleInputCheckChange = (event, type) => {
		const items = type.split(' ');
		const stateCopy = Object.assign({}, this.state);
		stateCopy[items[0]][items[1]] = event.target.checked;
		this.setState({ ...stateCopy });
		this.updatePerformance(stateCopy);
	}

	updatePerformance = (stateCopy) => {
		const data = {
			memory: stateCopy.memory,
			processor: {
				long: stateCopy.processor.long,
				short: stateCopy.processor.short,
			},
			expandableStorage: {
				available: stateCopy.expandableStorage.available,
				type: stateCopy.expandableStorage.type,
			},
		};

		this.props.updatePerformance(data, '');
	}

	render() {
		const { processor, memory, expandableStorage } = this.state;
		return (
			this.renderExpansionPanel('Performance',
				<div className="expand-div">
					{processor &&
						<div>
							<div className="subtitle-features">Processor</div>

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									{this.renderText('processor long', 'Long', 'text-field-width', '', 'dense')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('processor short', 'Short', 'text-field-width', '', 'dense')}
								</Grid>
							</Grid>
						</div>}

					{memory !== '' &&
						<div>
							<div className="subtitle-features">Memory</div>

							{this.renderText('memory', 'Memory', 'text-field-width', '', 'dense')}

							<div className="subtitle-features">SD Card Slot</div>

							<Grid container spacing={16}>
								<Grid item xs={12} sm={6} className="margin-top-twelve item-box">
									{this.renderCheckBox('expandableStorage available', 'Available')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('expandableStorage type', 'Type', 'text-field-width', '', 'dense')}
								</Grid>
							</Grid>
						</div>}

					{expandableStorage !== '' &&
						<div>
							<div className="subtitle-features">Storage</div>

							<Grid item xs={12}>
								<p>This feature can be set in the next tab: <b>Cost & Plans</b> -> <b>Device Options</b></p>
							</Grid>
						</div>}
				</div>)
		);
	}
}

Performances.propTypes = {
	processor: PropTypes.object,
	expandableStorage: PropTypes.object,
	memory: PropTypes.string,
	updatePerformance: PropTypes.func.isRequired,
};

Performances.defaultProps = {
	processor: {},
	memory: '',
	expandableStorage: {},
};

export default Performances;
