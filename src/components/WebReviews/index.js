import PropTypes from 'prop-types';

import InputEvent from 'components/InputEvent';
import WebReview from './WebReview';

import consumer_reports from 'assets/images/svg_files/consumerReports.svg';
import cnet from 'assets/images/svg_files/CNet.svg';
import digital_trends from 'assets/images/digitalTrends.png';

class WebReviews extends InputEvent {
	constructor(props) {
		super(props);
		this.state = {
			webReviews: props.subCollection['web-reviews'],
			iconSet: {
				consumer_reports,
				cnet,
				digital_trends,
			},
			colorSet: {
				consumer_reports: 'dark-green',
				cnet: 'dark-red',
				digital_trends: 'dark-blue',
			},
		};
	}

	render() {
		const { colorSet, iconSet, webReviews } = this.state;
		return (
			<div id="components-webreviews" className="component-webreviews-container">
				{webReviews.map((webReview, index) => (
					<div className="info-container" key={index}>
						{this.renderGrid(colorSet[webReview.publication], <WebReview webReview={webReview} svg={iconSet[webReview.publication]} />, {}, 'top')}
					</div>
				))}
			</div>
		);
	}
}

WebReviews.propTypes = {
	subCollection: PropTypes.object,
};

WebReviews.defaultProps = {
	subCollection: {},
};

export default WebReviews;
