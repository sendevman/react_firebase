/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';
import _ from 'lodash';

import InputEvent from 'components/InputEvent';

class DeviceProtected extends InputEvent {
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
		const { insurance } = this.props;
		const { expandEnable } = this.state;
		const insuranceValue = _.values(insurance);
		const insuranceKey = _.keys(insurance);
		return (
			<div id="components-device-protected" className="component-device-protected-container">
				<div className="content-box">
					<div className="device-protected-container">
						{insuranceValue.map((item, index) => {
							const key = insuranceKey[index] === 'mobileProtectionMulit'
								? 'Multi-Device Protection Pack'
								: insuranceKey[index] === 'mobileProtection'
									? 'Mobile Protection Pack'
									: insuranceKey[index] === 'mobileInsurance'
										? 'Mobile Insurance'
										: '';
							return (
								<div key={index}>
									{((index === 0 && !expandEnable) || expandEnable) &&
										<div className="info-container">
											{this.renderGrid('white',
												<div className="device-protected-item-container">
													<div className="device-protected-item-title">
														{`AT&T ${key}`}
														<div className="device-protected-item-description">
															{item.description}
														</div>
													</div>
													<div className="empty-hline-grey" />
													<div className="device-protected-item-price-container">
														<div className="device-protected-item-content">
															<div className="device-protected-item-deviceProtected">
																{item.deviceProtected}
															</div>
															<div className="device-protected-item-deviceProtected-title">
																{'DEVICE PROTECTED'}
															</div>
														</div>
														<div className="empty-vline-grey" />
														<div className="device-protected-item-content">
															<div className="device-protected-item-monthlyCost">
																{`$${item.monthlyCost}`}
															</div>
															<div className="device-protected-item-monthlyCost-title">
																{'MONTHLY'}
															</div>
														</div>
													</div>
													{index === 0 && !expandEnable &&
														<div className="device-protected-expand" onClick={this.handleClickExpand}>
															+ Expand
														</div>
													}
													{index === insuranceValue.length - 1 && expandEnable &&
														<div className="device-protected-collapse" onClick={this.handleClickExpand}>
															- Collapse
														</div>
													}
												</div>)}
										</div>}
								</div>);
							})}
					</div>
				</div>
			</div>
		);
	}
}

DeviceProtected.propTypes = {
	insurance: PropTypes.object,
};

DeviceProtected.defaultProps = {
	insurance: {},
};

export default DeviceProtected;
