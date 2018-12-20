/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import PropTypes from 'prop-types';
import InputEvent from 'components/InputEvent';

class AvailabeStore extends InputEvent {
	constructor(props) {
		super(props);
		this.state = {
			releaseDate: props.releaseDate,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.releaseDate !== nextProps.releaseDate) {
			this.setState({
				releaseDate: new Date(nextProps.releaseDate),
			});
		}
	}

	handleInputChange = (e) => {
		this.setState({ releaseDate: e.target.value });
		this.props.updateReleaseDate({ releaseDate: e.target.value }, '');
	}

	render() {
		return (
			this.renderExpansionPanel('Available in Store',
				<div className="expand-div">
					{this.renderText('releaseDate', '', 'text-field-width', '', 'dense', 'date')}
				</div>)
		);
	}
}

AvailabeStore.propTypes = {
	releaseDate: PropTypes.string,
	updateReleaseDate: PropTypes.func.isRequired,
};

AvailabeStore.defaultProps = {
	releaseDate: '',
};

export default AvailabeStore;
