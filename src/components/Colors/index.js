import React, { Component } from 'react';
import PropTypes from 'prop-types';
import colorbg from 'assets/images/color.png';

class Colors extends Component {
	render() {
		const { colors } = this.props;
		return (
			<div id="components-colors" className="component-colors-container">
				<div className="content-box">
					<img className="colors-bg" src={colorbg} alt="" />
					<div className="colors-container">
						{colors.map((color, index) => (
							<div className="color-item-container" key={index}>
								<img className="color-item-image" src={color.img} alt="" />
								<div className="color-item-title">
									{color.name}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

Colors.propTypes = {
	colors: PropTypes.array,
};

Colors.defaultProps = {
	colors: [],
};

export default Colors;
