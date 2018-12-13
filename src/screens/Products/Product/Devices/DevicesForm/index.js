import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import CancelIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import InputEvent from 'components/InputEvent';
import CostPlan from './CostPlan';
import InfoSpec from './InfoSpec';

class DevicesForm extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			tabValue: 0,
			currentProduct: props.currentProduct,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.currentProduct !== nextProps.currentProduct) {
			this.setState({ currentProduct: nextProps.currentProduct });
		}
	}

	handleTabChange = (event, value) => {
		this.setState({ tabValue: value });
	}

	render() {
		const { currentProduct, tabValue } = this.state;

		return (
			<div>
				<Grid container spacing={16}>
					<Grid item xs={12}>
						<AppBar position="static" color="default">
							<Tabs
								value={tabValue}
								onChange={this.handleTabChange}
								indicatorColor="primary"
								textColor="primary"
								scrollable
								scrollButtons="auto"
							>
								<Tab label="Info & Specs" />
								<Tab label="Cost & Plans" />
							</Tabs>
						</AppBar>
						{tabValue === 0 &&
							<InfoSpec
								currentProduct={currentProduct}
								updateInfoSpec={this.props.updateCurrentProduct} />
						}
						{tabValue === 1 &&
							<CostPlan
								currentProduct={currentProduct}
								updateCostPlan={this.props.updateCurrentProduct} />
						}
					</Grid>
				</Grid>

				<div className="buttons-box mt-block">
					{this.renderButton('Save', 'green', this.props.handleSave, <SaveIcon />, 'contained', 'small')}
					{this.renderButton('Cancel', 'red', this.props.handleCancel, <CancelIcon />, 'contained', 'small')}
				</div>
			</div>
		);
	}
}

DevicesForm.propTypes = {
	type: PropTypes.string,
	currentProduct: PropTypes.object,
	updateCurrentProduct: PropTypes.func.isRequired,
	handleSave: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
};

DevicesForm.defaultProps = {
	type: 'edit',
	currentProduct: {},
};

export default DevicesForm;
