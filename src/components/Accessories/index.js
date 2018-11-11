import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import accessoriesbg from 'assets/images/accessories.png';

class Accessories extends Component {
	render() {
		// const { accessories } = this.props;
		return (
			<div id="components-accessories" className="component-accessories-container">
				<div className="content-box">
					<img className="accessories-bg" src={accessoriesbg} alt="" />
					{/* <div className="accessories-container d-flex">
						{accessories.map((accessorie, index) => (
							<div className="accessorie-item-container" key={index}>
								<div className="accessorie-item-title">
									{accessorie}
								</div>
							</div>
						))}
					</div> */}
				</div>
			</div>
		);
	}
}

// Accessories.propTypes = {
// 	accessories: PropTypes.array,
// };

// Accessories.defaultProps = {
// 	accessories: [],
// };

export default Accessories;
