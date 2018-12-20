/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import camerabg from 'assets/images/camera.png';
import emptybg from 'assets/images/empty.png';

class Camera extends Component {
	render() {
		const { camera } = this.props;
		return (
			<div id="components-camera" className="component-camera-container">
				<div className="content-box">
					<div className="bg-image">
						<img className="camera-bg" src={camerabg} alt="" />
						<img className="empty-bg" src={emptybg} alt="" />
					</div>
					<div className="camera-content-container">
						<div className="camera-content">
							<Grid container>
								<Grid item xs={12} md={6}>
									<div className="text-align-center">{camera.front.aperture}</div>
									<div className="text-align-center">{camera.front.sensor}</div>
								</Grid>
								<Grid item xs={12} md={6}>
									<div className="text-align-center">{camera.rear.aperture}</div>
									<div className="text-align-center">{camera.rear.sensor}</div>
								</Grid>
								<Grid item xs={12}>
									{camera.features !== undefined && camera.features.map((feature, index) => (
										<div key={index}>{`- ${feature}`}</div>
									))}
								</Grid>
							</Grid>
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
