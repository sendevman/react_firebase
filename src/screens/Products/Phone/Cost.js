import PropTypes from 'prop-types';

import Costs from 'components/Costs';
import DeviceOptions from 'components/DeviceOptions';
import InputEvent from 'components/InputEvent';

class Cost extends InputEvent {
	render() {
		const { product } = this.props;
		console.log(product);
		return (
			<div id="products-man-phone-cost" className="Container-box">
				<div className="info-container">
					{this.renderGrid('', <DeviceOptions deviceOptions={product.deviceOptions} />, { background: 'rgb(255,255,255, 0)' })}
				</div>
				<div className="info-container">
					<Costs cost={product.cost} />
				</div>
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
