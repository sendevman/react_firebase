import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

class Performances extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			processor: props.processor,
			memory: props.memory,
			expandableStorage: props.expandableStorage,
			'processor long': props.processor.long,
			'processor short': props.processor.short,
			'expandableStorage available': props.expandableStorage.available,
			'expandableStorage type': props.expandableStorage.type,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.processor !== nextProps.processor) {
			this.setState({
				processor: nextProps.processor,
				'processor long': nextProps.processor.long,
				'processor short': nextProps.processor.short,
			});
		}
		if (this.props.memory !== nextProps.memory) {
			this.setState({ memory: nextProps.memory });
		}
		if (this.props.expandableStorage !== nextProps.expandableStorage) {
			this.setState({
				expandableStorage: nextProps.expandableStorage,
				'expandableStorage available': nextProps.expandableStorage.available,
				'expandableStorage type': nextProps.expandableStorage.type,
			});
		}
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
		return (
			this.renderExpansionPanel('Performance',
				<div className="expand-div">
					<div className="subtitle-features">Processor</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.renderText('processor long', 'Long', 'text-field-width', '', 'dense')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderText('processor short', 'Short', 'text-field-width', '', 'dense')}
						</Grid>
					</Grid>

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

					<div className="subtitle-features">Storage</div>

					<Grid item xs={12}>
						<p>This feature can be set in the next tab: <b>Cost & Plans</b> -> <b>Device Options</b></p>
					</Grid>
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
	performance: {},
	memory: '',
	expandableStorage: {},
};

export default Performances;
