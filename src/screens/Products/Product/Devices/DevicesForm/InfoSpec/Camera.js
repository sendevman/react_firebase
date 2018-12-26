/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';
import _ from 'lodash';
import InputEvent from 'components/InputEvent';

import Grid from '@material-ui/core/Grid';

class Camera extends InputEvent {
	constructor(props) {
		super(props);
		const dState = this.settingState(props.camera);
		this.state = {
			...dState,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.camera !== nextProps.camera) {
			const dState = this.settingState(nextProps.camera);
			this.setState({
				...dState,
			});
		}
	}

	settingState = (camera) => {
		const cameraKeys = _.keys(camera);
		const dState = {};
		_.each(cameraKeys, item => {
			dState[item] = camera[item];
			if (Array.isArray(camera[item] === 'array')) {
				_.each(camera[item], (sItem, index) => {
					dState[`${item} ${index}`] = sItem;
				});
			} else if (typeof camera[item] === 'object') {
				const itemKeys = _.keys(camera[item]);
				_.each(itemKeys, sItem => {
					dState[`${item} ${sItem}`] = camera[item][sItem];
				});
			}
		});
		return dState;
	}

	handleInputChange = (e, type) => {
		const items = type.split(' ');
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		if (items[0] === 'features') {
			stateCopy.features[parseInt(items[1])] = e.target.value;
		} else {
			stateCopy[items[0]][items[1]] = e.target.value;
		}
		this.setState({ ...stateCopy });
		this.props.updateCamera(stateCopy, 'camera');
	}

	render() {
		return (
			this.renderExpansionPanel('Camera',
				<div className="expand-div">
					<div className="subtitle-features">Features</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.state['features 0'] && this.renderText('features 0', 'Feature #1', 'text-field-width')}
							{this.state['features 2'] && this.renderText('features 2', 'Feature #3', 'text-field-width')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.state['features 1'] && this.renderText('features 1', 'Feature #2', 'text-field-width')}
							{this.state['features 3'] && this.renderText('features 3', 'Feature #4', 'text-field-width')}
						</Grid>
					</Grid>

					<div className="subtitle-features">Front</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.renderText('front aperture', 'Aperture Fx.x', 'text-field-width')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderText('front sensor', 'Sensor xMP', 'text-field-width')}
						</Grid>
					</Grid>

					<div className="subtitle-features">Rear</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.renderText('rear aperture', 'Aperture Fx.x', 'text-field-width')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderText('rear sensor', 'Sensor xMP', 'text-field-width')}
						</Grid>
					</Grid>
				</div>)
		);
	}
}

Camera.propTypes = {
	camera: PropTypes.object,
	updateCamera: PropTypes.func.isRequired,
};

Camera.defaultProps = {
	camera: {},
};

export default Camera;
