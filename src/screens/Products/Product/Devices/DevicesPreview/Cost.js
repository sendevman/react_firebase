/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';

import DeviceProtected from 'components/DeviceProtected';
import Costs from 'components/Costs';
import DeviceOptions from 'components/DeviceOptions';
import InputEvent from 'components/InputEvent';

class Cost extends InputEvent {
	handleClickSurvey = () => {}

	render() {
		const { product } = this.props;
		return (
			<div id="products-man-phone-cost" className="Container-box">
				{product.deviceOptions &&
					<div className="info-container">
						<DeviceOptions deviceOptions={product.deviceOptions} />
					</div>}
				{product.cost &&
					<div className="info-container" style={{ marginTop: 0 }}>
						<Costs cost={product.cost} />
					</div>}
				{product.insurance &&
					<div className="info-container" style={{ marginTop: 0 }}>
						<div className="device-protection-title">Device Protection</div>
						<DeviceProtected insurance={product.insurance} />
					</div>}
				{this.renderButton('', 'blue', this.handleClickSurvey, 'Feedback Survey', 'contained', 'large')}
			</div>
		);
	}
}

Cost.propTypes = {
	product: PropTypes.object,
};

Cost.defaultProps = {
	product: {},
};

export default Cost;
