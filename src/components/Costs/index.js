import PropTypes from 'prop-types';
import _ from 'lodash';

import InputEvent from 'components/InputEvent';

class Costs extends InputEvent {
	constructor(props) {
		super(props);
		this.state = {
			expandEnable: false,
		};
	}

	handleClickExpand = () => {
		this.setState({
			expandEnable: !this.state.expandEnable,
		});
	}

	render() {
		const { cost } = this.props;
		const { expandEnable } = this.state;
		const costValue = _.values(cost);
		const costKey = _.keys(cost);
		return (
			<div id="components-cost" className="component-cost-container">
				<div className="content-box">
					<div className="cost-container">
						{costValue.map((item, index) => (
							<div key={index}>
								{((index === 0 && !expandEnable) || expandEnable) &&
									<div className="info-container">
										{this.renderGrid('white',
											<div className="cost-item-container">
												<div className="cost-item-title">
													{`AT&T ${_.capitalize(costKey[index])}`}
													<div className="cost-item-description">
														{item.description}
													</div>
												</div>
												<div className="empty-hline-grey" />
												<div className="cost-item-price-container">
													<div className="cost-item-content">
														<div className="cost-item-today">
															{`$${item.dueToday}`}
														</div>
														<div className="cost-item-today-title">
															{'DUE TODAY'}
														</div>
													</div>
													<div className="empty-vline-grey" />
													<div className="cost-item-content">
														<div className="cost-item-monthly">
															{`$${item.monthly}`}
														</div>
														<div className="cost-item-monthly-title">
															{'MONTHLY'}
														</div>
													</div>
													<div className="empty-vline-grey" />
													<div className="cost-item-content">
														<div className="cost-item-tradein">
															{`$${item.tradeIn}`}
														</div>
														<div className="cost-item-tradein-title">
															{'TRADE-IN'}
														</div>
													</div>
												</div>
												{index === 0 && !expandEnable &&
													<div className="costs-expand" onClick={this.handleClickExpand}>
														+ Expand
													</div>
												}
												{index === costValue.length - 1 && expandEnable &&
													<div className="costs-collapse" onClick={this.handleClickExpand}>
														- Collapse
													</div>
												}
											</div>)}
									</div>}
							</div>))}
					</div>
				</div>
			</div>
		);
	}
}

Costs.propTypes = {
	cost: PropTypes.object,
};

Costs.defaultProps = {
	cost: {},
};

export default Costs;
