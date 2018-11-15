import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

class Plans extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			next: props.cost.next,
			nextEveryYear: props.cost.nextEveryYear,
			noContract: props.cost.noContract,
			'next description': props.cost.next.description,
			'next dueToday': props.cost.next.dueToday,
			'next monthly': props.cost.next.monthly,
			'next title': props.cost.next.title,
			'next tradeIn': props.cost.next.tradeIn,
			// 'nextEveryYear description': props.cost.nextEveryYear.description,
			// 'nextEveryYear dueToday': props.cost.nextEveryYear.dueToday,
			// 'nextEveryYear monthly': props.cost.nextEveryYear.monthly,
			// 'nextEveryYear title': props.cost.nextEveryYear.title,
			// 'nextEveryYear tradeIn': props.cost.nextEveryYear.tradeIn,
			'noContract description': props.cost.noContract.description,
			'noContract dueToday': props.cost.noContract.dueToday,
			'noContract monthly': props.cost.noContract.monthly,
			'noContract title': props.cost.noContract.title,
			'noContract tradeIn': props.cost.noContract.tradeIn,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.cost !== nextProps.cost) {
			this.setState({
				...nextProps.cost,
				'next description': nextProps.cost.next.description,
				'next dueToday': nextProps.cost.next.dueToday,
				'next monthly': nextProps.cost.next.monthly,
				'next title': nextProps.cost.next.title,
				'next tradeIn': nextProps.cost.next.tradeIn,
				// 'nextEveryYear description': nextProps.cost.nextEveryYear.description,
				// 'nextEveryYear dueToday': nextProps.cost.nextEveryYear.dueToday,
				// 'nextEveryYear monthly': nextProps.cost.nextEveryYear.monthly,
				// 'nextEveryYear title': nextProps.cost.nextEveryYear.title,
				// 'nextEveryYear tradeIn': nextProps.cost.nextEveryYear.tradeIn,
				'noContract description': nextProps.cost.noContract.description,
				'noContract dueToday': nextProps.cost.noContract.dueToday,
				'noContract monthly': nextProps.cost.noContract.monthly,
				'noContract title': nextProps.cost.noContract.title,
				'noContract tradeIn': nextProps.cost.noContract.tradeIn,
			});
		}
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

					{/* <div className="subtitle-features">AT&T Next Every Year</div>
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
					</Grid> */}

					<div className="subtitle-features">No annual contract</div>
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
