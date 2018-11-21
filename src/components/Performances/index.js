import React, { Component } from 'react';
import PropTypes from 'prop-types';
import performance from 'assets/images/performance.png';

class Performances extends Component {
	render() {
		const { processor, memory, expandableStorage, storage } = this.props;
		return (
			<div id="components-performances" className="component-performances-container">
				<div className="content-box">
					<div className="bg-image">
						<img className="performances-bg" src={performance} alt="" />
					</div>
					<div className="performances-content-container">
						<div
							className="performances-processor-content"
							style={{
								background: "url('/assets/images/svg_files/processor.svg')",
								backgroundRepeat: 'no-repeat',
								backgroundSize: '100%',
							}}>
							<div className="dev-content">
								<div className="dev-content-title">
									PROCESSOR
								</div>
								{processor.short}
							</div>
						</div>
						<div
							className="performances-memory-content"
							style={{
								background: "url('/assets/images/svg_files/memoryBlue.svg')",
								backgroundRepeat: 'no-repeat',
								backgroundSize: '100%',
							}}>
							<div className="dev-content">
								<div className="dev-content-title">
									MEMORY
								</div>
								{`${memory}GB`}
							</div>
						</div>
					</div>
					<div className="performances-content-container">
						{expandableStorage.available &&
							<div
								className="performances-sdcard-content"
								style={{
									background: "url('/assets/images/svg_files/sdCard.svg')",
									backgroundRepeat: 'no-repeat',
									backgroundSize: '100%',
								}}>
								<div className="dev-content">
									<div className="dev-content-title">
										SD CARD SLOT
									</div>
									Available
								</div>
							</div>}
						<div
							className="performances-storage-content"
							style={{
								background: "url('/assets/images/svg_files/store.svg')",
								backgroundRepeat: 'no-repeat',
								backgroundSize: '100%',
							}}>
							<div className="dev-content">
								<div className="dev-content-title">
									STORAGE
								</div>
								{`${storage[0].storage}GB | ${storage[1].storage}GB`}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Performances.propTypes = {
	processor: PropTypes.object,
	memory: PropTypes.string,
	expandableStorage: PropTypes.object,
	storage: PropTypes.array,
};

Performances.defaultProps = {
	processor: {},
	memory: '',
	expandableStorage: {},
	storage: [],
};

export default Performances;
