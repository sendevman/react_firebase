import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';
import DirectTVNowSlider from './DirectTVNowSlider';
import BasePackages from './BasePackages';

class DirectTVNow extends InputEvent {
	render() {
		const { currentProduct } = this.props;
		return (
			<div id="products-services-directvnow" className="Container-box">
				<DirectTVNowSlider currentProduct={currentProduct} />
				{this.renderGrid('', <BasePackages />, { background: 'black', margin: '1rem' })}
			</div>
		);
	}
}

DirectTVNow.propTypes = {
	currentProduct: PropTypes.object,
};

DirectTVNow.defaultProps = {
	currentProduct: {},
};

export default DirectTVNow;
