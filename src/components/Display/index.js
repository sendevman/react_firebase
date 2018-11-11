import React, { Component } from 'react';
import PropTypes from 'prop-types';
import displaybg from 'assets/images/display.png';

class Display extends Component {
	render() {
		const { display } = this.props;
		return (
			<div id="components-display" className="component-display-container">
				<div className="content-box">
					<img className="display-bg" src={displaybg} alt="" />
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
