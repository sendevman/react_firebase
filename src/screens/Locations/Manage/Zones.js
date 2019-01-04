/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
// import CardMedia from '@material-ui/core/CardMedia';

import SelectZone from 'components/SelectZone';
import HomeView from 'components/HomeView';
import InputEvent from 'components/InputEvent';

import {
	addSubCollectionField,
	getLocations,
	getSubCollection,
} from 'redux/firebase/actions';
import { locationsSelector } from 'redux/firebase/selectors';

// import ImgDefault from 'assets/images/imgDefault.png';

class LocationsManZones extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			selectedZone: {},
			selectedZoneId: '',
			homeOpenViewData: {},
			homeOpenViewDataEnable: false,
			titleCardData: {},
			titleCardDataEnable: false,
		};
	}

	componentDidMount() {
		const { locations, getLocations, getZones, storeId } = this.props;
		if (locations.length === 0) {
			getLocations();
		} else {
			const location = _.find(locations, { fbId: storeId });
			if (location.subCollection === undefined || (location.subCollection && location.subCollection.zones === undefined)) {
				getZones('locations', storeId, 'zones');
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		const { locations, storeId, getZones } = this.props;
		const { selectedZoneId } = this.state;
		if (locations !== nextProps.locations) {
			const location = _.find(nextProps.locations, { fbId: storeId });
			if (location.subCollection === undefined || (location.subCollection && location.subCollection.zones === undefined)) {
				getZones('locations', storeId, 'zones');
			} else if (selectedZoneId !== '') {
				const selectedZone = _.find(_.find(nextProps.locations, { fbId: storeId }).subCollection.zones, { fbId: selectedZoneId });
				this.setState({ selectedZone });
			}
		}
	}

	handleSelectZone = (idx) => {
		const { locations, storeId } = this.props;
		const selectedZone = _.find(_.find(locations, { fbId: storeId }).subCollection.zones, { fbId: idx });
		this.setState({
			selectedZone,
			selectedZoneId: idx,
		});
	}

	handleHomeSave = (data, imgBackSrcType, imgCardSrcType) => {
		const {	selectedZoneId } = this.state;
		this.props.addSubCollectionField(
			'locations',
			this.props.storeId,
			'zones',
			selectedZoneId,
			'homeCard',
			{
				data,
				uploadImg: {
					imgBackSrcType,
					imgCardSrcType,
				},
			},
		);
	}

	handleTitleSave = (data, imgBackSrcType, imgCardSrcType) => {
		const {	selectedZoneId } = this.state;
		this.props.addSubCollectionField(
			'locations',
			this.props.storeId,
			'zones',
			selectedZoneId,
			'titleCard',
			{
				data,
				uploadImg: {
					imgBackSrcType,
					imgCardSrcType,
				},
			},
		);
	}

	render() {
		const { locations, storeId } = this.props;
		const { selectedZone, selectedZoneId } = this.state;
		const homeViewComponent = {
			title: true,
			subtitle: true,
			footer: true,
			cardImage: true,
			backImage: true,
		};
		const titleComponent = {
			title: true,
			subtitle: true,
			footer: true,
			cardImage: true,
		};
		return (
			<div id="locations-man-info" className="Container-box">
				<Grid container spacing={24}>
					{this.renderGrid('red',
						<div>
							<SelectZone
								data={locations.length > 0 ? _.find(locations, { fbId: storeId }) : {}}
								handleSelectZone={this.handleSelectZone} />
						</div>)}

					{selectedZoneId !== '' && (selectedZone.fbId === undefined || selectedZone.homeCard) && this.renderGrid('red',
						<HomeView
							data={selectedZone.homeCard}
							title="Home Open View"
							activeComponent={homeViewComponent}
							savebtn
							cancelbtn
							handleSave={this.handleHomeSave} />)}

					{selectedZoneId !== '' && (selectedZone.fbId === undefined || selectedZone.titleCard) && this.renderGrid('red',
						<HomeView
							data={selectedZone.titleCard}
							title="Title Card"
							activeComponent={titleComponent}
							savebtn
							cancelbtn
							handleSave={this.handleTitleSave} />)}

				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	locations: locationsSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getLocations: () => dispatch(getLocations()),
	getZones: (parent, id, child) => dispatch(getSubCollection(parent, id, child)),
	addSubCollectionField: (parent, id, child, childId, field, data) => dispatch(addSubCollectionField(parent, id, child, childId, field, data)),
});

LocationsManZones.propTypes = {
	locations: PropTypes.array.isRequired,
	storeId: PropTypes.string,
	getLocations: PropTypes.func.isRequired,
	getZones: PropTypes.func.isRequired,
};

LocationsManZones.defaultProps = {
	storeId: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsManZones);
