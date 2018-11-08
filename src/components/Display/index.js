import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Display extends Component {
	render() {
		const { display } = this.props;
		return (
			<div id="components-display" className="component-display-container">
				<div className="content-box">
					<div className="d-flex justify-content-center">
						<div className="display-title">
							Display
						</div>
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
