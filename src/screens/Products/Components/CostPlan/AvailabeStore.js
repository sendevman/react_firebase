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
		if (this.props.insurance !== nextProps.insurance) {
			this.setState({
				releaseDate: nextProps.releaseDate,
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
	releaseDate: PropTypes.date,
	updateReleaseDate: PropTypes.func.isRequired,
};

AvailabeStore.defaultProps = {
	releaseDate: new Date(),
};

export default AvailabeStore;
