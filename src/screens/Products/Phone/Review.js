import PropTypes from 'prop-types';

import Offer from 'components/Offer';
import CustomReviews from 'components/CustomReviews';
import InputEvent from 'components/InputEvent';

class Review extends InputEvent {
	render() {
		const { product } = this.props;
		console.log(product);
		return (
			<div id="products-man-phone-review" className="Container-box">
				<div className="info-container">
					{this.renderGrid('white', <CustomReviews customerReviews={product.customerReviews} />)}
				</div>
			</div>
		);
	}
}

Review.propTypes = {
	product: PropTypes.object,
};

Review.defaultProps = {
	product: {},
};

export default Review;
