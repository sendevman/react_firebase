import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Info from './Info';
import Review from './Review';
import Cost from './Cost';

class DevicesPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
		};
	}

	handleChange = (e, value) => {
		this.setState({ value });
	};

	render() {
		const { value } = this.state;
		const { currentProduct } = this.props;
		return (
			<div
				id="products-man-phone"
				className="Container-box"
				style={{
					background: "url('/assets/images/backgroundHD.png')",
					backgroundSize: 'cover',
					backgroundPositionX: 'center',
				}}>
				<AppBar position="static" color="default">
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						fullWidth
					>
						<Tab className={value === 0 ? 'info_spec' : ''} label="Info & Specs" />
						<Tab className={value === 1 ? 'reviews' : ''} label="Reviews" />
						<Tab className={value === 2 ? 'cost_plans' : ''} label="Cost & Plans" />
					</Tabs>
				</AppBar>
				{value === 0 &&
					<div style={{ padding: 24, width: '90%' }}>
						<Info product={currentProduct} />
					</div>}
				{value === 1 &&
					<div style={{ padding: 24, width: '90%' }}>
						<Review product={currentProduct} />
					</div>}
				{value === 2 &&
					<div style={{ padding: 24, width: '90%' }}>
						<Cost product={currentProduct} />
					</div>}
			</div>
		);
	}
}

DevicesPreview.propTypes = {
	currentProduct: PropTypes.object,
};

DevicesPreview.defaultProps = {
	currentProduct: {},
};

export default DevicesPreview;
