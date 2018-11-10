import PropTypes from 'prop-types';

import Offer from 'components/Offer';
import Colors from 'components/Colors';
import Display from 'components/Display';
import Camera from 'components/Camera';
import Battery from 'components/Battery';
import Accessories from 'components/Accessories';
import InputEvent from 'components/InputEvent';

class Info extends InputEvent {
	render() {
		const { product } = this.props;
		console.log(product);
		return (
			<div id="products-man-phone-info">
				<div className="info-container">
					{this.renderGrid('white', <Offer offer={product.offer} />)}
				</div>
				<div className="info-container">
					{this.renderGrid('', product.description, { background: 'rgb(255,255,255, 0.8)' })}
				</div>
				<div className="info-container">
					{this.renderGrid('', <Colors colors={product.colors} />, { background: 'rgb(255,255,255, 0)' })}
				</div>
				<div className="info-container">
					{this.renderGrid('', <Display display={product.display} />, { background: 'rgb(255,255,255, 0)' })}
				</div>
				<div className="info-container">
					{this.renderGrid('', <Camera camera={product.camera} />, { background: 'rgb(255,255,255, 0)' })}
				</div>
				<div className="info-container">
					{this.renderGrid('', <Battery battery={product.battery} />, { background: 'rgb(255,255,255, 0)' })}
				</div>
				<div className="info-container">
					{this.renderGrid('', <Accessories accessories={product.accessories} />, { background: 'rgb(255,255,255, 0)' })}
				</div>
			</div>
		);
	}
}

Info.propTypes = {
	product: PropTypes.object,
};

Info.defaultProps = {
	product: {},
};

export default Info;
