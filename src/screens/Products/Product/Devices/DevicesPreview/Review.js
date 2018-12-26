/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';

import WebReviews from 'components/WebReviews';
import CustomReviews from 'components/CustomReviews';
import InputEvent from 'components/InputEvent';

class Review extends InputEvent {
	handleClickSurvey = () => {}

	render() {
		const { product } = this.props;
		return (
			<div id="products-man-phone-review" className="Container-box">
				{product.customerReviews &&
					<div className="info-container">
						{this.renderGrid('white', <CustomReviews customerReviews={product.customerReviews} />)}
					</div>}
				<WebReviews subCollection={product.subCollection} />
				{this.renderButton('', 'blue', this.handleClickSurvey, 'Feedback Survey', 'contained', 'large')}
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
