import PropTypes from 'prop-types';
import InputEvent from 'components/InputEvent';

import Grid from '@material-ui/core/Grid';

class Camera extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			features: [],
			front: {},
			rear: {},
			'features 0': '',
			'features 1': '',
			'features 2': '',
			'features 3': '',
			'front aperture': '',
			'front sensor': '',
			'rear aperture': '',
			'rear sensor': '',
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.camera !== nextProps.camera) {
			this.setState({
				...nextProps.camera,
				'features 0': nextProps.camera.features[0],
				'features 1': nextProps.camera.features[1],
				'features 2': nextProps.camera.features[2],
				// 'features 3': nextProps.camera.features[3],
				'front aperture': nextProps.camera.front.aperture,
				'front sensor': nextProps.camera.front.sensor,
				'rear aperture': nextProps.camera.rear.aperture,
				'rear sensor': nextProps.camera.rear.sensor,
			});
		}
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
							{this.renderText('features 0', 'Feature #1', 'text-field-width')}
							{this.renderText('features 2', 'Feature #3', 'text-field-width')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderText('features 1', 'Feature #2', 'text-field-width')}
							{this.renderText('features 3', 'Feature #4', 'text-field-width')}
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
