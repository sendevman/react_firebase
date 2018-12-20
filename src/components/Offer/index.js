/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrowRight from 'assets/images/svg_files/arrowRight.svg';
import OfferIcon from 'assets/images/svg_files/offerIcon.svg';

class Offer extends Component {
	render() {
		const { offer } = this.props;
		return (
			<div id="components-offer" className="component-offer-container">
				<div className="content-box">
					<div className="icon-title-box d-flex">
						<img className="offer-icon" src={OfferIcon} alt="" />
						<div>{offer.title}</div>
					</div>
					<div>{offer.description}</div>
				</div>
				<div className="arrow-box">
					<img src={ArrowRight} alt="" />
				</div>
			</div>
		);
	}
}

Offer.propTypes = {
	offer: PropTypes.object,
};

Offer.defaultProps = {
	offer: {},
};

export default Offer;
