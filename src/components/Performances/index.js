import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import performance from 'assets/images/performance.png';
// import processor from 'assets/images/svg_files/processorBlue.svg';

class Performances extends Component {
	componentDidMount() {

	}
	render() {
		// const { performances } = this.props;
		return (
			<div id="components-performances" className="component-performances-container">
				<div className="content-box">
					<div className="bg-image">
						<img className="performances-bg" src={performance} alt="" />
					</div>
					{/* <div className="performances-content-container">
						<div className="performances-processor-content">
							<img src={processor} alt="" />
						</div>
					</div> */}
				</div>
			</div>
		);
	}
}

// Performances.propTypes = {
// 	processor: PropTypes.object,
// 	memory: PropTypes.string,
// 	expandableStorage: PropTypes.object,
// 	storage: PropTypes.array,
// };

// Performances.defaultProps = {
// 	processor: {},
// 	memory: '',
// 	expandableStorage: {},
// 	storage: [],
// };

export default Performances;
