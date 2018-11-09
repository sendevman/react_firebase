import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Colors extends Component {
	render() {
		const { colors } = this.props;
		return (
			<div id="components-colors" className="component-colors-container">
				<div className="content-box">
					<div className="d-flex justify-content-center">
						<div className="colors-title">
							Colors
						</div>
					</div>
					<div className="colors-container d-flex">
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
