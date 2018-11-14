import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import InputEvent from 'components/InputEvent';

// import IconButton from '@material-ui/core/IconButton';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';

import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';

class DeviceOptions extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			next: props.cost.next,
			nextEveryYear: props.cost.nextEveryYear,
			noContract: props.cost.noContract,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.insurance !== nextProps.insurance) {
			this.setState({
				...nextProps.cost,
				'next description': nextProps.cost.next.description,
			});
		}
	}

	handleInputChange = (e, type) => {
		const items = type.split(' ');
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		stateCopy[items[0]][items[1]] = e.target.value;
		this.setState({ ...stateCopy });
		this.updateDeviceOptions(stateCopy);
	}

	updateDeviceOptions = (stateCopy) => {
		const data = {
			next: stateCopy.next,
			nextEveryYear: stateCopy.nextEveryYear,
			noContract: stateCopy.noContract,
		};
		this.props.updateDeviceOptions(data, 'cost');
	}

	generateFake = element => [0, 1, 2].map(value => React.cloneElement(element, { key: value }));

	render() {
		return (
			this.renderExpansionPanel('Device Options',
				<div className="expand-div">
					<Grid container spacing={16} className="upload-box">
						<Grid item xs={12} md={6}>
							{this.renderText('capacity', 'Storage', 'text-field-width', '', 'dense', 'number')}
							{this.renderText('lifeInternetLfourG', 'SIM: Count', 'text-field-width', '', 'dense', 'number')}
							{this.renderCheckBox('expandableStorage', 'Expandable', 'text-field-width margin-top-twelve item-box')}
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

					{/* <div className="subtitle-features">List</div>

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
					</List> */}
				</div>)
		);
	}
}

DeviceOptions.propTypes = {
	deviceOptions: PropTypes.array,
	updateDeviceOptions: PropTypes.func.isRequired,
};

DeviceOptions.defaultProps = {
	deviceOptions: [],
};

export default DeviceOptions;
