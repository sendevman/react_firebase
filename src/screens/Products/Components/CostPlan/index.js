import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputEvent from 'components/InputEvent';

import AvailabeStore from './AvailabeStore';
import Plans from './Plans';
import DeviceProtection from './DeviceProtection';

class CostPlan extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			capacity: '',
			lifeAudio: '',
			lifeVideo: '',
			lifeInternetLfourG: '',
			chargingWired: false,
			chargingWireless: false,

			feature1: '',
			feature2: '',
			feature3: '',
			feature4: '',
			currentProduct: props.currentProduct,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.currentProduct !== nextProps.currentProduct) {
			this.setState({ currentProduct: nextProps.currentProduct });
		}
	}

	updateCostPlan = (data, type) => {
		let stateCopy = Object.assign({}, this.state.currentProduct);
		if (type === '') {
			stateCopy = { ...stateCopy, ...data };
		} else {
			stateCopy[type] = data;
		}
		this.setState({ currentProduct: stateCopy });
		this.props.updateCostPlan(stateCopy);
	}

	generateFake = element => [0, 1, 2].map(value => React.cloneElement(element, { key: value }));

	render() {
		const { currentProduct, chargingWired } = this.state;

		return (
			<div>
				<AvailabeStore
					releaseDate={currentProduct.releaseDate}
					updateReleaseDate={this.updateCostPlan} />

				<Plans
					cost={currentProduct.cost}
					updateCost={this.updateCostPlan} />

				<DeviceProtection
					insurance={currentProduct.insurance}
					updateInsurance={this.updateCostPlan} />

				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className="title-features margin-zero item-box">Device Options</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className="expand-div">
							<Grid container spacing={16} className="upload-box">
								<Grid item xs={12} md={6}>
									{this.renderText('capacity', 'Storage', 'text-field-width', '', 'dense', 'number')}
									{this.renderText('lifeInternetLfourG', 'SIM: Count', 'text-field-width', '', 'dense', 'number')}
									<FormControlLabel
										className="text-field-width margin-top-twelve item-box"
										control={
											<Checkbox
												color="primary"
												checked={chargingWired}
												onChange={e => this.handleInputCheckChange(e, 'chargingWired')}
												value="chargingWired"
											/>
										}
										label="Expandable"
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('capacity', 'Price', 'text-field-width', '', 'dense', 'number')}
									{this.renderText('lifeAudio', 'SIM: Type', 'text-field-width', '', 'dense')}
									{this.renderText('lifeVideo', 'Expandable: Type', 'text-field-width', '', 'dense')}
								</Grid>
							</Grid>

							<div className="buttons-box mt-block">
								{this.renderButton('Add Option', 'blue', () => {}, <AddIcon />, 'contained', 'small')}
							</div>

							<div className="subtitle-features">List</div>

							<List dense className="image-colors-list list">
								{this.generateFake(
									<ListItem divider className="item-color">
										<ListItemText primary="128GB - $1,009.99" />
										<ListItemSecondaryAction>
											<IconButton aria-label="Delete">
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>,
								)}
							</List>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>

			</div>
		);
	}
}

CostPlan.propTypes = {
	currentProduct: PropTypes.object,
	updateCostPlan: PropTypes.func.isRequired,
};

CostPlan.defaultProps = {
	currentProduct: {},
};

export default CostPlan;
