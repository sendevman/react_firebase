import PropTypes from 'prop-types';

import Offer from 'components/Offer';
import Colors from 'components/Colors';
import Display from 'components/Display';
import Performances from 'components/Performances';
import Fitness from 'components/Fitness';
import Camera from 'components/Camera';
import Battery from 'components/Battery';
import Accessories from 'components/Accessories';
import InputEvent from 'components/InputEvent';

class Info extends InputEvent {
	handleClickSurvey =() => {}

	render() {
		const { product } = this.props;
		// console.log(product);
		return (
			<div id="products-man-phone-info">
				{product.offer &&
					<div className="info-container">
						{this.renderGrid('white', <Offer offer={product.offer} />)}
					</div>}
				{product.description &&
					<div className="info-container">
						{this.renderGrid('', product.description, { background: 'rgb(255,255,255, 0.8)' })}
					</div>}
				{product.colors &&
					<div className="info-container">
						{this.renderGrid('', <Colors colors={product.colors} />, { background: 'rgb(255,255,255, 0)' })}
					</div>}
				{product.display &&
					<div className="info-container">
						{this.renderGrid('', <Display display={product.display} />, { background: 'rgb(255,255,255, 0)' })}
					</div>}
				{product.fitness &&
					<div className="info-container">
						{this.renderGrid('', <Fitness fitness={product.fitness} />, { background: 'rgb(255,255,255, 0)' })}
					</div>}
				{product.camera &&
					<div className="info-container">
						{this.renderGrid('', <Camera camera={product.camera} />, { background: 'rgb(255,255,255, 0)' })}
					</div>}
				<div className="info-container">
					{this.renderGrid('',
						<Performances
							processor={product.processor}
							memory={product.memory}
							expandableStorage={product.expandableStorage}
							storage={product.deviceOptions} />, { background: 'rgb(255,255,255, 0)' })}
				</div>
				{product.battery &&
					<div className="info-container">
						{this.renderGrid('', <Battery battery={product.battery} />, { background: 'rgb(255,255,255, 0)' })}
					</div>}
				{product.accessories &&
					<div className="info-container">
						{this.renderGrid('', <Accessories accessories={product.accessories} />, { background: 'rgb(255,255,255, 0)' })}
					</div>}
				<div style={{ textAlign: 'center' }}>
					{this.renderButton('', 'blue', this.handleClickSurvey, 'Feedback Survey', 'contained', 'large')}
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
