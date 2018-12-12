import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import GeneralInfo from 'components/GeneralInfo';
import HomeView from 'components/HomeView';
import InputEvent from 'components/InputEvent';

import {
	updateDoc,
	addSubCollectionField,
	getLocations,
	getSubCollection,
} from 'redux/firebase/actions';
import { locationsSelector } from 'redux/firebase/selectors';

class LocationsManInfo extends InputEvent {
	constructor(props) {
		super(props);

		const { locations, storeId } = props;
		this.state = {
			location: locations.length > 0 ? _.find(locations, { fbId: storeId }) : {},
			homeData: undefined,
			globalData: undefined,
		};
	}

	componentDidMount() {
		const { locations, getLocations, getSiteData, storeId } = this.props;
		if (locations.length === 0) {
			getLocations();
		} else {
			getSiteData('locations', storeId, 'siteData');
		}
	}

	componentWillReceiveProps(nextProps) {
		const { locations, storeId, getSiteData } = this.props;
		if (locations !== nextProps.locations) {
			const location = nextProps.locations.length > 0 ? _.find(nextProps.locations, { fbId: storeId }) : {};
			if (!(location.subCollection && location.subCollection.siteData)) {
				getSiteData('locations', storeId, 'siteData');
			}
			this.setState({	location });
		}
		if (nextProps.locations.length > 0) {
			const location = _.find(nextProps.locations, { fbId: storeId });
			if (location.subCollection && location.subCollection.siteData.length > 0) {
				this.setState({
					homeData: _.find(location.subCollection.siteData, { fbId: 'home' }).homeCard,
					globalData: _.find(location.subCollection.siteData, { fbId: 'globalBackground' }).globalCard,
				});
			}
		}
	}

	handleHomeImport = () => {}

	handleHomeArchive = () => {}

	handleGlobalImport = () => {}

	handleGlobalArchive = () => {}

	handleSave = (data) => {
		this.props.updateDoc('locations', this.props.storeId, data);
	}

	handleHomeSave = (data, imgBackSrcType, imgCardSrcType) => {
		this.props.addSubCollectionField(
			'locations',
			this.props.storeId,
			'siteData',
			'home',
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

	handleGlobalSave = (data, imgBackSrcType, imgCardSrcType) => {
		this.props.addSubCollectionField(
			'locations',
			this.props.storeId,
			'siteData',
			'globalBackground',
			'globalCard',
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
		const { homeData, globalData } = this.state;
		const globalBackComponent = {
			title: false,
			subtitle: false,
			footer: false,
			cardImage: false,
			backTitle: false,
			backImage: true,
		};
		const homeViewComponent = {
			title: true,
			subtitle: true,
			footer: true,
			cardImage: true,
			backTitle: false,
			backImage: true,
		};
		return (
			<div id="locations-man-info" className="Container-box">
				<Grid container spacing={24}>
					{this.renderGrid('orange',
						<GeneralInfo
							data={locations.length > 0 ? _.find(locations, { fbId: storeId }) : {}}
							storeId={storeId}
							genInfoSave={this.handleSave}
						/>)}
					{homeData && this.renderGrid('orange',
						<HomeView
							data={homeData || {}}
							title="Home Open View"
							activeComponent={homeViewComponent}
							savebtn
							importbtn
							archbtn
							handleSave={this.handleHomeSave}
							handleImport={this.handleHomeImport}
							handleArchive={this.handleHomeArchive} />)}
					{globalData && this.renderGrid('orange',
						<HomeView
							data={globalData || {}}
							title="Global Background"
							activeComponent={globalBackComponent}
							savebtn
							importbtn
							archbtn
							handleSave={this.handleGlobalSave}
							handleImport={this.handleGlobalImport}
							handleArchive={this.handleGlobalArchive} />)}
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
	updateDoc: (field, id, data) => dispatch(updateDoc(field, id, data)),
	getSiteData: (parent, id, child) => dispatch(getSubCollection(parent, id, child)),
	addSubCollectionField: (parent, id, child, childId, field, data) => dispatch(addSubCollectionField(parent, id, child, childId, field, data)),
});

LocationsManInfo.propTypes = {
	locations: PropTypes.array.isRequired,
	storeId: PropTypes.string,
	getSiteData: PropTypes.func.isRequired,
	getLocations: PropTypes.func.isRequired,
	updateDoc: PropTypes.func.isRequired,
};

LocationsManInfo.defaultProps = {
	storeId: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsManInfo);
