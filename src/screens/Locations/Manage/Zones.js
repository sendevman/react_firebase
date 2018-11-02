import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import SelectZone from 'components/SelectZone';
import HomeView from 'components/HomeView';
import InputEvent from 'components/InputEvent';

import { getUsers } from 'redux/firebase/actions';
import { usersSelector } from 'redux/firebase/selectors';

class LocationsManZones extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			selected: [],
		};
	}

	render() {
		const homeViewComponent = {
			title: true,
			subtitle: true,
			footer: true,
			cardImage: true,
			backTitle: true,
			backImage: true,
		};
		const globalBackComponent = {
			title: true,
			subtitle: true,
			footer: true,
			cardImage: false,
			backTitle: false,
			backImage: true,
		};
		return (
			<div id="locations-man-info" className="Container-box">
				<Grid container spacing={24}>
					{this.renderGrid('red',
						<div>
							<SelectZone />
						</div>)}
					{this.renderGrid('red',
						<HomeView
							title="Home Open View"
							activeComponent={homeViewComponent} />)}
					{this.renderGrid('red',
						<HomeView
							title="Title Card"
							activeComponent={globalBackComponent} />)}
					{this.renderGrid('red',
						<HomeView
							title="Pop Up Card"
							activeComponent={globalBackComponent} />)}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	users: usersSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getUsers: () => dispatch(getUsers()),
});

// LocationsManZones.propTypes = {
// 	storeId: PropTypes.string,
// };

// LocationsManZones.defaultProps = {
// 	storeId: '',
// };

export default connect(mapStateToProps, mapDispatchToProps)(LocationsManZones);
