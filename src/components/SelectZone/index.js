/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class SelectZone extends Component {
	constructor(props) {
		super(props);

		const zones = props.data.subCollection && props.data.subCollection.zones && props.data.subCollection.zones.length > 0 ? props.data.subCollection.zones : [];
		this.state = {
			selectedZone: 0,
			zones,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { data } = this.props;
		if (data !== nextProps.data) {
			const zones = (nextProps.data.subCollection && nextProps.data.subCollection.zones && nextProps.data.subCollection.zones.length > 0) ? nextProps.data.subCollection.zones : [];
			this.setState({ zones });
		}
	}

	handleOnChange = (event) => {
		this.setState({ selectedZone: event.target.value });
		this.props.handleSelectZone(event.target.value);
	}

	render() {
		const { selectedZone, zones } = this.state;
		return (
			<Grid item xs={12}>
				<div className="label-products-table select-text">Select Zone</div>
				<Grid container spacing={24}>
					<Grid item xs={12} sm={6}>
						<FormControl className="select-zone-box">
							<InputLabel htmlFor="zone-name-helper">Zone Name - Walkbase ID</InputLabel>
							<Select
								value={selectedZone}
								onChange={this.handleOnChange}
								input={<Input id="zone-name-helper" />}>
									<MenuItem value=""><em>None</em></MenuItem>
									{zones.map((zone, index) => (
										<MenuItem key={index} value={zone.fbId}>
											{zone.name} - {zone.walkbaseId}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

SelectZone.propTypes = {
	data: PropTypes.object,
	handleSelectZone: PropTypes.func.isRequired,
};

SelectZone.defaultProps = {
	data: {},
};

export default SelectZone;
