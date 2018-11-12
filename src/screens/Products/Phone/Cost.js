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
				<div className="info-container">
					{this.renderGrid('', <DeviceOptions deviceOptions={product.deviceOptions} />, { background: 'rgb(255,255,255, 0)', boxShadow: 'none' })}
				</div>
				<div className="info-container" style={{ marginTop: 0 }}>
					<Costs cost={product.cost} />
				</div>
				<div className="info-container" style={{ marginTop: 0 }}>
					<DeviceProtected insurance={product.insurance} />
				</div>
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
