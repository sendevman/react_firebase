/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

class Display extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			ppi: props.display.ppi,
			description: props.display.description,
			resolution: props.display.resolution,
			size: props.display.size,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.display !== nextProps.display) {
			this.setState({ ...nextProps.display });
		}
	}

	handleInputChange = (e, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		this.setState({ ...stateCopy });
		this.props.updateDisplay(stateCopy, 'display');
	}

	render() {
		return (
			this.renderExpansionPanel('Display',
				<div className="expand-div">
					{this.renderText('description', 'Description', 'text-field-width', '', 'dense')}
					{this.renderText('resolution', 'Resolution', 'text-field-width', '', 'dense')}

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
							{this.renderText('ppi', 'PPI', 'text-field-width', '', 'dense')}
						</Grid>

						<Grid item xs={12} md={6}>
							{this.renderText('size', 'Size', 'text-field-width', '', 'dense')}
						</Grid>
					</Grid>
				</div>)
		);
	}
}

Display.propTypes = {
	display: PropTypes.object,
	updateDisplay: PropTypes.func.isRequired,
};

Display.defaultProps = {
	display: {},
};

export default Display;
