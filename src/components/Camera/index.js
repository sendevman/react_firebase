import React, { Component } from 'react';
import PropTypes from 'prop-types';
import camerabg from 'assets/images/camera.png';

class Camera extends Component {
	render() {
		const { camera } = this.props;
		return (
			<div id="components-camera" className="component-camera-container">
				<div className="content-box">
					<img className="camera-bg" src={camerabg} alt="" />
					<div className="camera-content-container">
						<div className="camera-content">
							{camera.features !== undefined && camera.features.map((feature, index) => (
								<div key={index}>{feature}</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Camera.propTypes = {
	camera: PropTypes.object,
};

Camera.defaultProps = {
	camera: {},
};

export default Camera;
