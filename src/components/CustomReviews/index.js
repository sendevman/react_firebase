import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Rating from 'react-rating';

import myAtt from 'assets/images/myAtt.jpg';
import redStar from 'assets/images/star-red.png';
import greyStar from 'assets/images/star-grey.png';
import yellowStar from 'assets/images/star-yellow.png';

class Customreviews extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avg: 0,
			expandEnable: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.customerReviews.length > 0) {
			this.calculateAvg(nextProps.customerReviews);
		}
	}

	calculateAvg = (customerReviews) => {
		let avg = 0;
		customerReviews.forEach(customerReview => {
			avg += parseInt(customerReview.stars, 10);
		});
		this.setState({ avg });
	}

	handleClickExpand = () => {
		this.setState({
			expandEnable: !this.state.expandEnable,
		});
	}

	subRender = () => {
		const { customerReviews } = this.props;
		const bars = [];
		for (let i = 0; i < 5; i++) {
			const val = 5 - i;
			bars.push((
				<div className="expand-bars-each" key={i}>
					<div className="expand-bars-stars">{`${val} star`}</div>
					<div className="expand-bars-rect">
						<div
							className="expand-bars-rect-inner"
							style={{ width: `${_.filter(customerReviews, { stars: val }).length / customerReviews.length * 100}%`, height: '100%' }}
						/>
					</div>
					<div className="expand-bars-number">{_.filter(customerReviews, { stars: val }).length}</div>
				</div>));
		}
		return bars;
	}

	render() {
		const { customerReviews } = this.props;
		const { avg, expandEnable } = this.state;
		return (
			<div id="components-customreviews" className="component-customreviews-container">
				<div className="content-box">
					<div className="content-title">
						<img className="customreviews-title-img" src={myAtt} alt="" />
						<div className="customreviews-title-label">Customer Reviews</div>
					</div>
					<div className="customreviews-content">
						<div className="content-stars">
							<Rating
								placeholderRating={avg / customerReviews.length}
								emptySymbol={<img src={greyStar} className="icon" alt="" />}
								placeholderSymbol={<img src={redStar} className="icon" alt="" />}
								fullSymbol={<img src={yellowStar} className="icon" alt="" />}
							/>
							<div className="stars-value">
								{`${Math.round(avg / customerReviews.length * 100) / 100}stars`}
							</div>
						</div>
						{!expandEnable &&
							<div className="customreviews-expand" onClick={this.handleClickExpand}>
								+ Expand
							</div>}
					</div>
					{expandEnable &&
						<div className="content-expand">
							<div className="expand-label">
								{`Rating Distribution (${customerReviews.length} reviews)}`}
							</div>
							<div className="expand-bars-content">
								{this.subRender()}
							</div>
							<div className="customreviews-collapse" onClick={this.handleClickExpand}>
								- Collapse
							</div>
						</div>
					}
				</div>
			</div>
		);
	}
}

Customreviews.propTypes = {
	customerReviews: PropTypes.array,
};

Customreviews.defaultProps = {
	customerReviews: [],
};

export default Customreviews;
