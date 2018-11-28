import React, { Component } from 'react';
import PropTypes from 'prop-types';

import checkMark from 'assets/images/checkMark.png';
import IntVietnamese from 'assets/images/IntVietnamese.png';
import IntBrazilian from 'assets/images/IntBrazilian.png';
import reimagned1 from 'assets/images/reimagned1.png';
import reimagned2 from 'assets/images/reimagned2.png';
import reimagned3 from 'assets/images/reimagned3.png';
import reimagned4 from 'assets/images/reimagned4.png';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class InternetSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: 0,
		};
	}

	handleOnChange = index => {
		this.setState({ selectedItem: index });
	}

	renderTitleBody = (carouselData) => (
		<div className="slider-container">
			<img className="carousel-list-img" src={carouselData.heroImg} alt="" />
			<div className="carousel-list-content">
				<div className="carousel-list-content-title">{carouselData.title}</div>
				<div className="carousel-list-content-desc">{carouselData.body}</div>
			</div>
		</div>);

	renderSubCards = (carouselData) => (
		<div className="slider-container">
			<img className="carousel-list-img" src={carouselData.heroImg} alt="" />
			<div className="carousel-list-content">
			<div className="carousel-list-body">{carouselData.body}</div>
				{(carouselData.subCards && carouselData.subCards.length > 0) &&
					<div className="subcards-container">
						{carouselData.subCards.map((subCard, index) => (
							<div className="each-subcards" key={index} style={{ width: '100%' }}>
								<img style={{ width: '50%' }} src={subCard.img} alt="" />
								<div className="subCards-title">{subCard.title}</div>
								{subCard.bullets.map((bullet, index) => (
									<div className="subCards-each-bullets" key={index}>{bullet}</div>))}
								<div className="subCards-legal">{subCard.legal}</div>
							</div>))}
					</div>}
			</div>
		</div>);

	render() {
		const { currentProduct } = this.props;
		const { selectedItem } = this.state;
		return (
			<div id="internet-slider">
				<Carousel
					centerMode
					centerSlidePercentage={92.5}
					emulateTouch
					selectedItem={selectedItem}
					showIndicators={false}
					showThumbs={false}
					showStatus={false}
					showArrows={false}
					onChange={this.handleOnChange}>
					{currentProduct.carouselData.map((carouselData, index) => (
						<div className="carousel-list" key={index}>
							{carouselData.type === 'title_body' && this.renderTitleBody(carouselData)}
							{carouselData.type === 'sub_cards' && this.renderSubCards(carouselData)}
						</div>))}
				</Carousel>
			</div>
		);
	}
}

InternetSlider.propTypes = {
	currentProduct: PropTypes.object,
};

InternetSlider.defaultProps = {
	currentProduct: {},
};

export default InternetSlider;
