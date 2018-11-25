import React, { Component } from 'react';
import PropTypes from 'prop-types';

import directvnow from 'assets/images/directvnow1.png';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class DirectTVNowSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: 0,
		};
	}

	handleOnChange = index => {
		this.setState({ selectedItem: index });
	}

	renderBullets = () => (
		<div>
			<img className="title-img" src={directvnow} alt="" />
			<div className="get-streaming">
				<div className="get-streaming-title">
					<span style={{ color: '#009FDB' }}>LET'S GET</span> STREAMING!
				</div>

			</div>
		</div>
	)

	renderSubCards = () => {}

	renderInternational = () => {}

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
						<div key={index}>
							{carouselData.type === 'bullets' && this.renderBullets(carouselData)}
							{carouselData.type === 'sub_cards' && this.renderSubCards(carouselData)}
							{carouselData.type === 'international' && this.renderInternational(carouselData)}
						</div>))}
				</Carousel>
			</div>
		);
	}
}

DirectTVNowSlider.propTypes = {
	currentProduct: PropTypes.object,
};

DirectTVNowSlider.defaultProps = {
	currentProduct: {},
};

export default DirectTVNowSlider;
