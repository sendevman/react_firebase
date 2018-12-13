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

class DirecTVNowSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: 0,
		};
	}

	handleOnChange = index => {
		this.setState({ selectedItem: index });
	}

	renderBullets = (carouselData) => (
		<div className="slider-container">
			<img className="carousel-list-img" src={carouselData.heroImg} alt="" />
			<div className="carousel-list-content">
				<div className="carousel-list-content-title">
					<span style={{ color: '#009FDB' }}>LET'S GET</span> STREAMING!
				</div>
				{carouselData.bullets.map((bullet, index) => (
					<div className="d-flex align-items-center" key={index}>
						<img className="check-blue-img" src={checkMark} alt="" />
						<div className="each-bullets">{bullet}</div>
					</div>))}
			</div>
		</div>);

	renderSubCards = (carouselData) => (
		<div className="slider-container">
			<img className="carousel-list-img" src={carouselData.heroImg} alt="" />
			<div className="carousel-list-content">
				{(carouselData.subCards && carouselData.subCards.length > 0) &&
					<div className="subcards-container">
						{carouselData.subCards.map((subCard, index) => (
							<div className="each-subcards" key={index}>
								{(subCard.type === 'premium_channels') && <img style={{ width: 'fit-content' }} src={reimagned1} width="54" height="34.5" alt="" />}
								{(subCard.type === 'spanish_add_ons') && <img style={{ width: 'fit-content' }} src={reimagned2} width="48.5" height="34.5" alt="" />}
								{(subCard.type === 'true_cloud_dvr') && <img style={{ width: 'fit-content' }} src={reimagned3} width="50.5" height="34.5" alt="" />}
								{(subCard.type === 'multi_streaming') && <img style={{ width: 'fit-content' }} src={reimagned4} width="60" height="34.5" alt="" />}
								<div className="subCards-title">{subCard.title}</div>
								<div className="subCards-content">{subCard.body}</div>
							</div>))}
					</div>}
			</div>
		</div>);

	renderInternational = (carouselData) => (
		<div className="slider-container">
			<img className="carousel-list-img" src={carouselData.heroImg} alt="" />
			<div className="carousel-list-content">
				{(carouselData.subCards && carouselData.subCards.length > 0) &&
					<div className="subcards-container">
						{carouselData.subCards.map((subCard, index) => (
							<div className="each-subcards" key={index}>
								<div className="subCards-inter-title">{subCard.title}</div>
								<div className="subCards-channels">{subCard.channels} channels</div>

								<div className="subCards-price">
									<div style={{ fontSize: '0.5rem' }}>$</div>
									<div style={{ fontSize: '1.5rem' }}>{subCard.price}</div>
									<div style={{ fontSize: '0.5rem' }}>/mo</div>
								</div>

								<div className="subCards-desc">Includes these live and on-demand channels:</div>
								<div className="subCards-image">
									{(subCard.type === 'vietnamese') &&
										<img src={IntVietnamese} alt="" />
									}
									{ (subCard.type === 'brazilian') &&
										<img src={IntBrazilian} alt="" />
									}
								</div>
							</div>))}
					</div>}
			</div>
		</div>);

	render() {
		const { currentProduct } = this.props;
		const { selectedItem } = this.state;
		return (
			<div id="directv-now-get">
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
							{carouselData.type === 'bullets' && this.renderBullets(carouselData)}
							{carouselData.type === 'sub_cards' && this.renderSubCards(carouselData)}
							{carouselData.type === 'international' && this.renderInternational(carouselData)}
						</div>))}
				</Carousel>
			</div>
		);
	}
}

DirecTVNowSlider.propTypes = {
	currentProduct: PropTypes.object,
};

DirecTVNowSlider.defaultProps = {
	currentProduct: {},
};

export default DirecTVNowSlider;
