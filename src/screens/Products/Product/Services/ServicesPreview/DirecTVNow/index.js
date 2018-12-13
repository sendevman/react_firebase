import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';
import DirecTVNowSlider from './DirecTVNowSlider';
import BasePackages from './BasePackages';

class DirecTVNow extends InputEvent {
	render() {
		const { currentProduct } = this.props;
		return (
			<div id="products-services-directvnow" className="Container-box">
				<DirecTVNowSlider currentProduct={currentProduct} />
				{this.renderGrid('', <BasePackages />, { background: 'black', margin: '1rem' })}
			</div>
		);
	}
}

DirecTVNow.propTypes = {
	currentProduct: PropTypes.object,
};

DirecTVNow.defaultProps = {
	currentProduct: {},
};

export default DirecTVNow;
