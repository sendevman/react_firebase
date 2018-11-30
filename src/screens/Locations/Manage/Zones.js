import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
// import CardMedia from '@material-ui/core/CardMedia';

import SelectZone from 'components/SelectZone';
import HomeView from 'components/HomeView';
import InputEvent from 'components/InputEvent';

import { getLocations, getSubCollection } from 'redux/firebase/actions';
import { locationsSelector } from 'redux/firebase/selectors';

// import ImgDefault from 'assets/images/imgDefault.png';

class LocationsManZones extends InputEvent {
	constructor(props) {
		super(props);

		this.state = {
			selectedZone: {},
		};
	}

	componentDidMount() {
		const { locations, getLocations, getZones, storeId } = this.props;
		if (locations.length === 0) {
			getLocations();
		} else {
			getZones('locations', storeId, 'zones');
		}
	}

	componentWillReceiveProps(nextProps) {
		const { locations, storeId, getZones } = this.props;
		if (locations !== nextProps.locations) {
			getZones('locations', storeId, 'zones');
		}
	}

	handleSelectZone = (idx) => {
		const { locations, storeId } = this.props;
		const selectedZone = _.find(_.find(locations, { fbId: storeId }).subCollection.zones, { fbId: idx });
		this.setState({ selectedZone });
	}

	render() {
		const { locations, storeId } = this.props;
		const { selectedZone } = this.state;
		const homeViewComponent = {
			title: true,
			subtitle: true,
			footer: true,
			cardImage: false,
			backTitle: false,
			backImage: true,
		};
		const globalBackComponent = {
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
					{this.renderGrid('red',
						<div>
							{/* <div className="label-products-table select-text">Store Layout</div>
							<CardMedia
								className="zones-store-layout"
								image={ImgDefault}
								title="Contemplative Reptile"
							/> */}
							<SelectZone
								data={locations.length > 0 ? _.find(locations, { fbId: storeId }) : {}}
								handleSelectZone={this.handleSelectZone} />
						</div>)}
					{(selectedZone.fbId === undefined || selectedZone.homeCard) && this.renderGrid('red',
						<HomeView
							data={selectedZone.homeCard}
							title="Home Open View"
							activeComponent={homeViewComponent}
							prevbtn
							savebtn
							importbtn
							archbtn
							handlePreview={this.handleHomePreview}
							handleSave={this.handleHomeSave}
							handleImport={this.handleHomeImport}
							handleArchive={this.handleHomeArchive} />)}
					{(selectedZone.fbId === undefined || selectedZone.titleCard) && this.renderGrid('red',
						<HomeView
							data={selectedZone.titleCard}
							title="Title Card"
							activeComponent={globalBackComponent}
							prevbtn
							savebtn
							importbtn
							archbtn
							handlePreview={this.handleTitlePreview}
							handleSave={this.handleTitleSave}
							handleImport={this.handleTitleImport}
							handleArchive={this.handleTitleArchive} />)}
					{(selectedZone.fbId === undefined || selectedZone.popupCard) && this.renderGrid('red',
						<HomeView
							data={selectedZone.popupCard}
							title="Pop Up Card"
							activeComponent={globalBackComponent}
							prevbtn
							savebtn
							importbtn
							archbtn
							handlePreview={this.handlePopPreview}
							handleSave={this.handlePopSave}
							handleImport={this.handlePopImport}
							handleArchive={this.handlePopArchive} />)}
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
});

LocationsManZones.propTypes = {
	storeId: PropTypes.string,
};

LocationsManZones.defaultProps = {
	storeId: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsManZones);
