import React, { Component } from 'react';

import directvnow from '../../assets/images/files/directvnow1.png';


class DirectTVNowSlider extends Component {
	render() {
		return (
			<div id="directv-now-get">
				<img src={directvnow} alt="" />
				<div className="get-streaming">
					<div className="get-streaming-title">
						<span style={{ color: '#00F' }}>LET'S GET</span> STREAMING!
					</div>

				</div>
			</div>
		);
	}
}

export default DirectTVNowSlider;
