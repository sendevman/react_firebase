/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

class Plans extends InputEvent {
	constructor(props) {
		super(props);
		const dState = this.settingState(props.cost);
		this.state = {
			...dState,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { cost } = nextProps;
		if (this.props.cost !== cost) {
			const dState = this.settingState(cost);
			this.setState({
				...dState,
			});
		}
	}

	settingState = (cost) => {
		const costKeys = _.keys(cost);
		const dState = {};
		_.each(costKeys, item => {
			const itemKeys = _.keys(cost[item]);
			dState[item] = cost[item];
			_.each(itemKeys, sItem => {
				dState[`${item} ${sItem}`] = cost[item][sItem];
			});
		});
		return dState;
	}

	handleInputChange = (e, type) => {
		const items = type.split(' ');
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		stateCopy[items[0]][items[1]] = e.target.value;
		this.setState({ ...stateCopy });
		this.updateCost(stateCopy);
	}

	updateCost = (stateCopy) => {
		const data = {
			next: stateCopy.next,
			nextEveryYear: stateCopy.nextEveryYear,
			noContract: stateCopy.noContract,
		};
		this.props.updateCost(data, 'cost');
	}

	render() {
		return (
			this.renderExpansionPanel('Plans',
				<div className="expand-div">
					{this.state.next &&
						<div>
							<div className="subtitle-features">AT&T Next</div>
							{this.renderText('next description', 'Description', 'text-field-width', '', 'dense')}

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									{this.renderText('next title', 'Title', 'text-field-width', '', 'dense')}
									{this.renderText('next dueToday', 'Due Today', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('next tradeIn', 'Trade In', 'text-field-width', '', 'dense')}
									{this.renderText('next monthly', 'Monthly', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>
						</div>}

					{this.state.nextEveryYear &&
						<div>
							<div className="subtitle-features">AT&T Next Every Year</div>
							{this.renderText('nextEveryYear description', 'Description', 'text-field-width', '', 'dense')}

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									{this.renderText('nextEveryYear title', 'Title', 'text-field-width', '', 'dense')}
									{this.renderText('nextEveryYear dueToday', 'Due Today', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('nextEveryYear tradeIn', 'Trade In', 'text-field-width', '', 'dense')}
									{this.renderText('nextEveryYear monthly', 'Monthly', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>
						</div>}

					{this.state.noContract &&
						<div>
							<div className="subtitle-features">No Annual Contract</div>
							{this.renderText('noContract title', 'Description', 'text-field-width', '', 'dense')}

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									{this.renderText('noContract title', 'Title', 'text-field-width', '', 'dense')}
									{this.renderText('noContract dueToday', 'Due Today', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('noContract tradeIn', 'Trade In', 'text-field-width', '', 'dense')}
									{this.renderText('noContract monthly', 'Monthly', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>
						</div>}
				</div>)
		);
	}
}

Plans.propTypes = {
	cost: PropTypes.object,
	updateCost: PropTypes.func.isRequired,
};

Plans.defaultProps = {
	cost: {},
};

export default Plans;
