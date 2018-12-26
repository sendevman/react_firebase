/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputEvent from 'components/InputEvent';

class Description extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			description: props.description,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.description !== nextProps.description) {
			this.setState({ description: nextProps.description });
		}
	}

	handleInputChange = (e) => {
		this.setState({ description: e.target.value });
		this.props.updateDescription(e.target.value, 'description');
	}

	render() {
		const { description } = this.state;
		return (
			this.renderExpansionPanel('Description',
				<div className="expand-div">
					<TextField
						label="Summary"
						multiline
						rows="4"
						rowsMax="4"
						value={description}
						onChange={this.handleInputChange}
						className="text-field-width"
						margin="dense"
					/>
				</div>)
		);
	}
}

Description.propTypes = {
	description: PropTypes.string,
	updateDescription: PropTypes.func.isRequired,
};

Description.defaultProps = {
	description: '',
};

export default Description;
