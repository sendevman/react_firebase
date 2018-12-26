/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import displaybg from 'assets/images/display.png';
import emptybg from 'assets/images/empty.png';

class Display extends Component {
	render() {
		const { display } = this.props;
		return (
			<div id="components-display" className="component-display-container">
				<div className="content-box">
					<div className="bg-image">
						<img className="display-bg" src={displaybg} alt="" />
						<img className="empty-bg" src={emptybg} alt="" />
					</div>
					<div className="display-content-container">
						<div className="display-size">
							{`${display.size}"`}
						</div>
						<div className="display-content">
							{`${display.description} (${display.resolution}) ${display.ppi}ppi`}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Display.propTypes = {
	display: PropTypes.object,
};

Display.defaultProps = {
	display: {},
};

export default Display;
