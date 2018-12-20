/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';

import InputEvent from 'components/InputEvent';

class Colors extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			...props.colors,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.colors !== nextProps.colors) {
			this.setState({ ...nextProps.colors });
		}
	}

	handleInputChange = (e, type) => {
		const stateCopy = Object.assign({}, this.state);
		stateCopy[type] = e.target.value;
		this.setState({ ...stateCopy });
		this.props.updateColors(stateCopy, 'colors');
	}

	handleInputFileChange = (event) => {
		const target = event.target;
		const file = target.files[0];

		if (file) this.setState({ image: file.name });
		else this.setState({ image: '' });
	}

	generateFake = element => [0, 1, 2].map(value => React.cloneElement(element, { key: value }));

	render() {
		return (
			this.renderExpansionPanel('Colors',
				<div className="expand-div upload-box">
					<div className="subtitle-features">List</div>

					<input
						id="flat-button-colors"
						className="file-input"
						accept="image/*"
						type="file"
						multiple
						onChange={this.handleInputFileChange} />

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
				</div>)
		);
	}
}

Colors.propTypes = {
	colors: PropTypes.array,
	updateColors: PropTypes.func.isRequired,
};

Colors.defaultProps = {
	colors: [],
};

export default Colors;
