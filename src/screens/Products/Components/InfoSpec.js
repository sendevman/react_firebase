import React, { Component } from 'react';

// Material-UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

// Material-UI Icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';

class InfoSpec extends Component {
	constructor(props) {
		super(props);

		this.state = {
		webReviews: [
			{ cons: [], pros: [], publication: 'consumer_reports', summary: '' },
			{ cons: [], pros: [], publication: 'cnet', summary: '' },
			{ cons: [], pros: [], publication: 'digital_trends', summary: '' },
		],

		videoContent: [
			{ author: '', src: '', title: '' },
			{ author: '', src: '', title: '' },
		],

		productType: '',
		subType: '',

		sku: '',

		sim: { options: 0, type: '' },

		releaseDate: '',

		processor: { long: '', short: '' },

		powerAdapterType: '',

		offer: { description: '', img: '', opusCode: '', title: 'LIMITED TIME OFFER' },

		model: '',
		memory: '',
		manufacture: '',

		insurance: {
			mobileInsurance: { deviceProtected: 1, monthlyCost: 8.99 },
			mobileProtection: { deviceProtected: 1, monthlyCost: 11.99 },
			mobileProtectionMulit: { deviceProtected: 3, monthlyCost: 34.99 },
		},

		image: '',

		headphoneJack: false,

		geekbench: { multiCore: 0, singleCore: 0 },

		fitness: {
			activityTracker: false,
			ekg: false,
			fitnessTracking: false,
			gpsTracking: false,
			heartRateMonitor: false,
			pedometer: false,
			runTracking: false,
			standAloneMusic: false,
		},

		expandableStorage: { available: false, type: '' },

		display: { description: '', ppi: '', resolution: '', size: '' },

		deviceOptions: [
			{
			expandableStorage: false,
			expandableStorageType: 'NA',
			price: '779.99',
			simCount: 1,
			simType: 'Nano',
			storage: '64',
			}, {
			expandableStorage: false,
			expandableStorageType: 'NA',
			price: '929.99',
			simCount: 1,
			simType: 'Nano',
			storage: '256',
			}, {
			expandableStorage: false,
			expandableStorageType: 'NA',
			price: '1,129.99',
			simCount: 1,
			simType: 'Nano',
			storage: '512',
			},
		],

		description: '',

		customerReviews: [
			{
			name: 'Karin M.',
			review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet. Nam tempus lectus quisan and Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet.',
			stars: 4.0,
			}, {
			name: 'Joseph H.',
			review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet. Nam tempus lectus quisan and Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet.',
			stars: 5.0,
			}, {
			name: 'Felix L.',
			review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet. Nam tempus lectus quisan and Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate nibh ante, in efficitur tellus mattis sit amet.',
			stars: 4.5,
			},
		],

		cost: {
			next: {
			description: 'Upgrade every 2 years. 0% APR; 30-month installment.',
			dueToday: 0,
			monthly: 26.34,
			title: 'AT&T Next',
			tradeIn: "May '20",
			},
			nextEveryYear: {
			description: 'Upgrade every year. 0% APR; 24-month installment.',
			dueToday: 0,
			monthly: 32.92,
			title: 'AT&T Next Every Year',
			tradeIn: "May '19",
			},
			noContract: {
			description: 'Upgrade every year. 0% APR; 24-month installment.',
			dueToday: 789.99,
			monthly: 0,
			title: 'No annual contract',
			tradeIn: 'UPGRADE ANYTIME',
			},
		},

		footer: '',
		subtitle: '',
		title: '',
		capacity: '',
		lifeTalk: '',
		lifeAudio: '',
		lifeVideo: '',
		lifeInternetLfourG: '',
		lifeInternetWiFi: '',
		chargingWired: false,
		chargingWireless: false,

		feature1: '',
		feature2: '',
		feature3: '',
		feature4: '',

		tabValue: 0,
		};
	}

	_handleInputChange = (event, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = event.target.value;
		this.setState({ ...stateCopy });
	}

	_handleInputCheckChange = (event, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = event.target.checked;
		this.setState({ ...stateCopy });
	}

	_handleInputFileChange = (event) => {
		const target = event.target;
		const file = target.files[0];

		if (file) this.setState({ image: file.name });
		else this.setState({ image: '' });
	}

	generateFake = element => [0, 1, 2].map(value => React.cloneElement(element, { key: value }));

	render() {
		const {
			description,
			capacity,
			lifeTalk,
			lifeAudio,
			lifeVideo,
			lifeInternetLfourG,
			lifeInternetWiFi,
			chargingWired,
			chargingWireless,
			feature1,
			feature2,
			feature3,
			feature4,
		} = this.state;

		return (
			<div>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className="title-features margin-zero item-box">Offer</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className="expand-div">
							<Grid container spacing={16}>
								<Grid item xs={12}>
									<TextField
										label="Title"
										value={feature1}
										onChange={e => this._handleInputChange(e, 'feature1')}
										className="text-field-width"
										margin="dense"
									/>

									<TextField
										label="Description"
										value={feature1}
										onChange={e => this._handleInputChange(e, 'feature1')}
										className="text-field-width"
										margin="dense"
									/>

									<TextField
										label="OPUS Code"
										value={feature2}
										onChange={e => this._handleInputChange(e, 'feature2')}
										className="text-field-width"
										margin="dense"
									/>

									<TextField
										label="Img Url"
										value={feature3}
										onChange={e => this._handleInputChange(e, 'feature3')}
										className="text-field-width"
										margin="dense"
									/>
								</Grid>
							</Grid>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className="title-features margin-zero item-box">Description</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className="expand-div">
							<Grid container spacing={16}>
								<Grid item xs={12}>
									<TextField
										label="Summary"
										multiline
										rows="4"
										rowsMax="4"
										value={description}
										onChange={e => this._handleInputChange(e, 'description')}
										className="text-field-width"
										margin="dense"
									/>
								</Grid>
							</Grid>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className="title-features margin-zero item-box">Colors</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className="expand-div upload-box">
							<div className="subtitle-features">List</div>

							<input
								id="flat-button-colors"
								className="file-input"
								accept="image/*"
								type="file"
								multiple
								onChange={this._handleInputFileChange} />

							<Tooltip title="Add Files" placement="top">
								<label className="flat-button-colors" htmlFor="flat-button-colors">
									<Button component="span" variant="contained" size="small" className="btn-icon-text att-blue">
										<AddIcon />
									</Button>
								</label>
							</Tooltip>

							<List dense className="image-colors-list list">
								{this.generateFake(
									<ListItem divider className="item-color">
										<Hidden only={['xs']}>
											<ListItemAvatar>
												<Avatar><FolderIcon /></Avatar>
											</ListItemAvatar>
										</Hidden>
										<Tooltip title="ex. Silver, Space Gray" placement="top">
											<input type="text" placeholder="Color Name" />
										</Tooltip>
										<Hidden only={['xs', 'sm']}>
											<ListItemText primary="Single-line-item.png" />
										</Hidden>
										<ListItemSecondaryAction>
											<IconButton aria-label="Delete"><DeleteIcon /></IconButton>
										</ListItemSecondaryAction>
									</ListItem>,
								)}
							</List>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className="title-features margin-zero item-box">Display</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className="expand-div">
							<Grid container spacing={16}>
								<Grid item xs={12}>
									<TextField
										label="Description"
										value={feature1}
										onChange={e => this._handleInputChange(e, 'feature1')}
										className="text-field-width"
										margin="dense"
									/>

									<TextField
										label="Resolution"
										value={feature2}
										onChange={e => this._handleInputChange(e, 'feature2')}
										className="text-field-width"
										margin="dense"
									/>

									<Grid container spacing={16}>
										<Grid item xs={12} md={6}>
											<TextField
												label="PPI"
												value={feature3}
												onChange={e => this._handleInputChange(e, 'feature3')}
												className="text-field-width"
												margin="dense"
											/>
										</Grid>

										<Grid item xs={12} md={6}>
											<TextField
												label="Size"
												value={feature3}
												onChange={e => this._handleInputChange(e, 'feature3')}
												className="text-field-width"
												margin="dense"
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className="title-features margin-zero item-box">Fitness</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className="expand-div">
							<Grid container spacing={16}>
								<Grid item xs={12} md={6}>
									<FormControlLabel
										className="text-field-width"
										control={
											<Checkbox
												color="primary"
												checked={chargingWired}
												onChange={e => this._handleInputCheckChange(e, 'chargingWired')}
												value="chargingWired"
											/>
										}
										label="Pedometer"
									/>

									<FormControlLabel
										className="text-field-width"
										control={
											<Checkbox
												color="primary"
												checked={chargingWired}
												onChange={e => this._handleInputCheckChange(e, 'chargingWired')}
												value="chargingWired"
											/>
										}
										label="Run Tracking"
									/>

									<FormControlLabel
										className="text-field-width"
										control={
											<Checkbox
												color="primary"
												checked={chargingWired}
												onChange={e => this._handleInputCheckChange(e, 'chargingWired')}
												value="chargingWired"
											/>
										}
										label="Heart Rate Monitor"
									/>

									<FormControlLabel
										className="text-field-width"
										control={
											<Checkbox
												color="primary"
												checked={chargingWired}
												onChange={e => this._handleInputCheckChange(e, 'chargingWired')}
												value="chargingWired"
											/>
										}
										label="Activity Tracker"
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									<FormControlLabel
										className="text-field-width"
										control={
											<Checkbox
												color="primary"
												checked={chargingWired}
												onChange={e => this._handleInputCheckChange(e, 'chargingWired')}
												value="chargingWired"
											/>
										}
										label="GPS Tracking"
									/>

									<FormControlLabel
										className="text-field-width"
										control={
											<Checkbox
												color="primary"
												checked={chargingWired}
												onChange={e => this._handleInputCheckChange(e, 'chargingWired')}
												value="chargingWired"
											/>
										}
										label="Stand Alone Music"
									/>

									<FormControlLabel
										className="text-field-width"
										control={
											<Checkbox
												color="primary"
												checked={chargingWired}
												onChange={e => this._handleInputCheckChange(e, 'chargingWired')}
												value="chargingWired"
											/>
										}
										label="EKG"
									/>

									<FormControlLabel
										className="text-field-width"
										control={
											<Checkbox
												color="primary"
												checked={chargingWireless}
												onChange={e => this._handleInputCheckChange(e, 'chargingWireless')}
												value="chargingWireless"
											/>
										}
										label="Fitness Tracking"
									/>
								</Grid>
							</Grid>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<div className="title-features margin-zero item-box">Camera</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className="expand-div">
					<div className="subtitle-features">Features</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
						<TextField
							label="Feature #1"
							value={feature1}
							onChange={e => this._handleInputChange(e, 'feature1')}
							className="text-field-width"
							margin="dense"
						/>

						<TextField
							label="Feature #2"
							value={feature2}
							onChange={e => this._handleInputChange(e, 'feature2')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>

						<Grid item xs={12} md={6}>
						<TextField
							label="Feature #3"
							value={feature3}
							onChange={e => this._handleInputChange(e, 'feature3')}
							className="text-field-width"
							margin="dense"
						/>

						<TextField
							label="Feature #4"
							value={feature4}
							onChange={e => this._handleInputChange(e, 'feature4')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>
					</Grid>

					<div className="subtitle-features">Front</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
						<TextField
							label="Aperture Fx.x"
							value={lifeInternetLfourG}
							onChange={e => this._handleInputChange(e, 'lifeInternetLfourG')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>

						<Grid item xs={12} md={6}>
						<TextField
							label="Sensor xMP"
							value={lifeInternetLfourG}
							onChange={e => this._handleInputChange(e, 'lifeInternetLfourG')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>
					</Grid>

					<div className="subtitle-features">Rear</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
						<TextField
							label="Aperture Fx.x"
							value={lifeInternetLfourG}
							onChange={e => this._handleInputChange(e, 'lifeInternetLfourG')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>

						<Grid item xs={12} md={6}>
						<TextField
							label="Sensor xMP"
							value={lifeInternetLfourG}
							onChange={e => this._handleInputChange(e, 'lifeInternetLfourG')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>
					</Grid>
					</div>
				</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<div className="title-features margin-zero item-box">Performance</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className="expand-div">
					<div className="subtitle-features">Processor</div>

					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
						<TextField
							label="Long"
							value={feature2}
							onChange={e => this._handleInputChange(e, 'feature2')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>

						<Grid item xs={12} md={6}>
						<TextField
							label="Short"
							value={feature1}
							onChange={e => this._handleInputChange(e, 'feature1')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>
					</Grid>

					<div className="subtitle-features">Memory</div>

					<TextField
						label="Memory"
						value={feature2}
						onChange={e => this._handleInputChange(e, 'feature2')}
						className="text-field-width"
						margin="dense"
					/>

					<div className="subtitle-features">SD Card Slot</div>

					<Grid container spacing={16}>
						<Grid item xs={12} sm={6} className="margin-top-twelve item-box">
						<FormControlLabel
							className="text-field-width"
							control={
							<Checkbox
								color="primary"
								checked={chargingWired}
								onChange={e => this._handleInputCheckChange(e, 'chargingWired')}
								value="chargingWired"
							/>
							}
							label="Available"
						/>
						</Grid>

						<Grid item xs={12} md={6}>
						<TextField
							label="Type"
							value={feature1}
							onChange={e => this._handleInputChange(e, 'feature1')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>
					</Grid>

					<div className="subtitle-features">Storage</div>

					<Grid item xs={12}>
						<p>This feature can be set in the next tab: <b>Cost & Plans</b> -> <b>Device Options</b></p>
					</Grid>
					</div>
				</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<div className="title-features margin-zero item-box">Battery</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className="expand-div">
					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
						<TextField
							label="Capacity"
							value={capacity}
							onChange={e => this._handleInputChange(e, 'capacity')}
							className="text-field-width"
							margin="dense"
						/>

						<TextField
							label="Life: L4G"
							value={lifeInternetLfourG}
							onChange={e => this._handleInputChange(e, 'lifeInternetLfourG')}
							className="text-field-width"
							margin="dense"
						/>

						<TextField
							label="Life: WiFi"
							value={lifeInternetWiFi}
							onChange={e => this._handleInputChange(e, 'lifeInternetWiFi')}
							className="text-field-width"
							margin="dense"
						/>

						<FormControlLabel
							className="text-field-width margin-top-twelve item-box"
							control={
							<Checkbox
								color="primary"
								checked={chargingWired}
								onChange={e => this._handleInputCheckChange(e, 'chargingWired')}
								value="chargingWired"
							/>
							}
							label="Charging Wired"
						/>
						</Grid>

						<Grid item xs={12} md={6}>
						<TextField
							label="Life: Talk"
							value={lifeTalk}
							onChange={e => this._handleInputChange(e, 'lifeTalk')}
							className="text-field-width"
							margin="dense"
						/>

						<TextField
							label="Life: Audio"
							value={lifeAudio}
							onChange={e => this._handleInputChange(e, 'lifeAudio')}
							className="text-field-width"
							margin="dense"
						/>

						<TextField
							label="Life: Video"
							value={lifeVideo}
							onChange={e => this._handleInputChange(e, 'lifeVideo')}
							className="text-field-width"
							margin="dense"
						/>

						<FormControlLabel
							className="text-field-width margin-top-twelve item-box"
							control={
							<Checkbox
								color="primary"
								checked={chargingWireless}
								onChange={e => this._handleInputCheckChange(e, 'chargingWireless')}
								value="chargingWireless"
							/>
							}
							label="Charging Wireless"
						/>
						</Grid>
					</Grid>
					</div>
				</ExpansionPanelDetails>
				</ExpansionPanel>

				<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<div className="title-features margin-zero item-box">Extra Information</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className="expand-div">
					<Grid container spacing={16}>
						<Grid item xs={12} md={6}>
						<TextField
							label="Model"
							value={feature2}
							onChange={e => this._handleInputChange(e, 'feature2')}
							className="text-field-width"
							margin="dense"
						/>

						<TextField
							label="Manufacture"
							value={feature2}
							onChange={e => this._handleInputChange(e, 'feature2')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>

						<Grid item xs={12} md={6}>
						<TextField
							label="Power Adapter Type"
							value={feature1}
							onChange={e => this._handleInputChange(e, 'feature1')}
							className="text-field-width"
							margin="dense"
						/>
						</Grid>
					</Grid>
					</div>
				</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}
}

export default InfoSpec;
