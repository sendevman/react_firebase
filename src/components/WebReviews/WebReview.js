import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WebReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expandEnable: false,
		};
	}

	handleClickExpand = () => {
		this.setState({
			expandEnable: !this.state.expandEnable,
		});
	}

	render() {
		const { svg, webReview } = this.props;
		const { expandEnable } = this.state;
		return (
			<div className="content-box">
				<div className="content-title">
					<img className={`webreviews-title-img-${webReview.publication}`} src={svg} alt="" />
				</div>
				<div className="webreviews-content">
					<div className="webreviews-summary">
						{webReview.summary}
					</div>
					<div className="empty-hline-grey" />
					{expandEnable &&
						<div className="webreviews-prop-con">
							{webReview.pros.length !== 0 &&
								<div className="webreviews-prop">
									<span style={{ color: 'red' }}>PROS</span>
									<ul>
										{webReview.pros.map((pro, index) => (
											<li className="pros-cons-list" key={index}>
												<div className="list-style" />
												<div style={{ flex: 1 }}>{pro}</div>
											</li>
										))}
									</ul>
								</div>}
							{webReview.cons.length !== 0 &&
								<div className="webreviews-cons">
									<span style={{ color: 'red' }}>CONS</span>
									<ul>
										{webReview.cons.map((con, index) => (
											<li className="pros-cons-list" key={index}>
												<div className="list-style" />
												<div style={{ flex: 1 }}>{con}</div>
											</li>
										))}
									</ul>
								</div>}
						</div>
					}
					{expandEnable && <div className="empty-hline-grey" />}
					<div className="webreviews-expand" onClick={this.handleClickExpand}>
						{!expandEnable ? '+ Read more' : '- Collapse'}
					</div>
				</div>
			</div>
		);
	}
}

WebReview.propTypes = {
	webReview: PropTypes.object,
	svg: PropTypes.string.isRequired,
};

WebReview.defaultProps = {
	webReview: {},
};

export default WebReview;
