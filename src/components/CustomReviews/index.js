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
			avg: this.calculateAvg(props.customerReviews),
			expandEnable: false,
			nExpands: props.customerReviews.map(() => false),
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.customerReviews.length > 0) {
			this.setState({ avg: this.calculateAvg(nextProps.customerReviews) });
		}
	}

	calculateAvg = (customerReviews) => {
		let avg = 0;
		customerReviews.forEach(customerReview => {
			avg += parseInt(customerReview.stars, 10);
		});
		return avg;
	}

	handleClickExpand = () => {
		this.setState({
			expandEnable: !this.state.expandEnable,
		});
	}

	handleClicknExpand = (index) => {
		const nExpands = this.state.nExpands.slice();
		nExpands[index] = !nExpands[index];
		this.setState({	nExpands });
	}

	barRender = () => {
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
		const { avg, expandEnable, nExpands } = this.state;
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
								initialRating={avg / customerReviews.length}
								emptySymbol={<img src={greyStar} className="icon" alt="" />}
								placeholderSymbol={<img src={yellowStar} className="icon" alt="" />}
								fullSymbol={<img src={redStar} className="icon" alt="" />}
								readonly
							/>
							<div className="stars-value">
								{`${Math.round(avg / customerReviews.length * 100) / 100}stars`}
							</div>
						</div>
						<div className="expand-label">
							{`Rating Distribution (${customerReviews.length} reviews)}`}
						</div>
						<div className="expand-bars-content">
							{this.barRender()}
						</div>
						<div className="customreviews-expand" onClick={this.handleClickExpand}>
							{!expandEnable ? '+ Read more' : '- Collapse'}
						</div>
						{expandEnable &&
							<div className="content-expand">
								{_.map(customerReviews, (customerReview, index) => (
									<div className="content-expand-each" key={index}>
										<div className="customreviewer-title">
											<div className="customreviewer-name">{customerReview.name}</div>
											<Rating
												initialRating={customerReview.stars}
												emptySymbol={<img src={greyStar} className="icon" alt="" />}
												placeholderSymbol={<img src={redStar} className="icon" alt="" />}
												fullSymbol={<img src={yellowStar} className="icon" alt="" />}
												readonly
												className="each-rating"
											/>
										</div>
										<div className={!nExpands[index] ? 'customreviewer-content' : ''}>
											{customerReview.review}
										</div>
										{!nExpands[index] && <div>...</div>}
										<div className="customreviews-expand" onClick={() => this.handleClicknExpand(index)}>
											{!nExpands[index] ? '+ Read more' : '- Collapse'}
										</div>
									</div>
								))}
							</div>
						}
					</div>
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
