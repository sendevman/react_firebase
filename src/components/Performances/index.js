import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Performances extends Component {
	render() {
		// const { performances } = this.props;
		return (
			<div id="components-performances" className="component-performances-container">
				<div className="content-box">
					<div className="d-flex justify-content-center">
						<div className="performances-title">
							Performances
						</div>
					</div>
					<div className="performances-content-container">
						<div className="performances-content" />
					</div>
				</div>
			</div>
		);
	}
}

Performances.propTypes = {
	performances: PropTypes.object,
};

Performances.defaultProps = {
	performances: {},
};

export default Performances;
