import PropTypes from 'prop-types';
import InputEvent from 'components/InputEvent';

class ProductForm extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			currentProduct: props.currentProduct,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.currentProduct !== nextProps.currentProduct) {
			this.setState({ currentProduct: nextProps.currentProduct });
		}
	}

	render() {
		return (
			<div />
		);
	}
}

ProductForm.propTypes = {
	currentProduct: PropTypes.object,
	updateCurrentProduct: PropTypes.func.isRequired,
	handleSave: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
	currentProduct: {},
};

export default ProductForm;
