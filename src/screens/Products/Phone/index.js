import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { getProducts } from 'redux/firebase/actions';
import { productsSelector } from 'redux/firebase/selectors';

import Info from './Info';
import Review from './Review';
import Cost from './Cost';

class DevicePhone extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 1,
			currentProduct: {},
		};
	}

	componentDidMount() {
		this.props.getProducts();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.products !== nextProps.products) {
			const index = _.findIndex(nextProps.products, product => product.fbId === this.props.match.params.store_id);
			this.setState({ currentProduct: nextProps.products[index] });
		}
	}

	handleChange = (e, value) => {
		this.setState({ value });
	};

	render() {
		const { currentProduct, value } = this.state;
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
					<Typography component="div" style={{ padding: 24, width: '90%' }}>
						<Info product={currentProduct} />
					</Typography>}
				{value === 1 &&
					<Typography component="div" style={{ padding: 24, width: '90%' }}>
						<Review product={currentProduct} />
					</Typography>}
				{value === 2 &&
					<Typography component="div" style={{ padding: 24, width: '90%' }}>
						<Cost product={currentProduct} />
					</Typography>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	products: productsSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getProducts: () => dispatch(getProducts()),
});

DevicePhone.propTypes = {
	products: PropTypes.array.isRequired,
	getProducts: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};

// DevicePhone.defaultProps = {

// }

export default connect(mapStateToProps, mapDispatchToProps)(DevicePhone);
