import React from 'react';

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
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import InputEvent from 'components/InputEvent';

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
		};
	}

	generateFake = element => [0, 1, 2].map(value => React.cloneElement(element, { key: value }));

	render() {
		const { chargingWired } = this.state;

		return (
			<div>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className="title-features margin-zero item-box">Available in Store</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className="expand-div">
							<Grid container spacing={16}>
								<Grid item xs={12}>
									{this.renderText('feature2', '', 'text-field-width', '', 'dense', 'date')}
								</Grid>
							</Grid>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>

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

				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className="title-features margin-zero item-box">Plans</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className="expand-div">
							<div className="subtitle-features">AT&T Next</div>
							{this.renderText('feature2', 'Description', 'text-field-width', '', 'dense')}

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									<TextField
										label="Title"
										value="AT&T Next"
										// onChange={e => this.handleInputChange(e, 'feature2')}
										className="text-field-width"
										margin="dense"
									/>
									{this.renderText('capacity', 'Due Today', 'text-field-width', '', 'dense')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('feature2', 'Trade In', 'text-field-width', '', 'dense')}
									{this.renderText('feature2', 'Trade In', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>

							<div className="subtitle-features">AT&T Next Every Year</div>
							{this.renderText('feature2', 'Description', 'text-field-width', '', 'dense')}

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									<TextField
										label="Title"
										value="AT&T Next Every Year"
										// onChange={e => this.handleInputChange(e, 'feature2')}
										className="text-field-width"
										margin="dense"
									/>
									{this.renderText('capacity', 'Due Today', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('feature2', 'Trade In', 'text-field-width', '', 'dense')}
									{this.renderText('capacity', 'Monthly', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>

							<div className="subtitle-features">No annual contract</div>
							{this.renderText('feature2', 'Description', 'text-field-width', '', 'dense')}

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									<TextField
										label="Title"
										value="No annual contract"
										// onChange={e => this.handleInputChange(e, 'feature2')}
										className="text-field-width"
										margin="dense"
									/>
									{this.renderText('feature2', 'Due Today', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									<TextField
										label="Trade In"
										value="UPGRADE ANYTIME"
										// onChange={e => this.handleInputChange(e, 'feature2')}
										className="text-field-width"
										margin="dense"
									/>
									{this.renderText('capacity', 'Monthly', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className="title-features margin-zero item-box">Device Protection</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className="expand-div">
							<div className="subtitle-features">AT&T Multi-Device Protection Pack</div>

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									{this.renderText('capacity', 'Device Protected', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('capacity', 'Monthly Cost', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>

							<div className="subtitle-features">AT&T Mobile Protection Pack</div>

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									{this.renderText('capacity', 'Device Protected', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('capacity', 'Monthly Cost', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>

							<div className="subtitle-features">AT&T Mobile Insurance</div>

							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									{this.renderText('capacity', 'Device Protected', 'text-field-width', '', 'dense', 'number')}
								</Grid>

								<Grid item xs={12} md={6}>
									{this.renderText('capacity', 'Monthly Cost', 'text-field-width', '', 'dense', 'number')}
								</Grid>
							</Grid>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}
}

export default CostPlan;
