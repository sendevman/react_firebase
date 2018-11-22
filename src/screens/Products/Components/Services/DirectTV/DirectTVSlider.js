import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class DirectTVSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: 0,
		};
	}

	handleOnChange = index => {
		this.setState({ selectedItem: index });
	}

	render() {
		const { currentProduct } = this.props;
		const { selectedItem } = this.state;
		return (
			<div id="directv-slider">
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
							<img className="carousel-list-img" src={carouselData.heroImg} alt="" />
							<div className="carousel-list-content">
								<div className="carousel-list-content-title">{carouselData.title}</div>
								<div className="carousel-list-content-desc">{carouselData.body}</div>
							</div>
						</div>
					))}
				</Carousel>
				<div className="carousel-list-legal">
					{currentProduct.carouselData[selectedItem].legal}
				</div>
			</div>
		);
	}
}

DirectTVSlider.propTypes = {
	currentProduct: PropTypes.object,
};

DirectTVSlider.defaultProps = {
	currentProduct: {},
};

export default DirectTVSlider;
