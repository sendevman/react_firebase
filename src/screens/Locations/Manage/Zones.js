import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

import SelectZone from 'components/SelectZone';
import HomeView from 'components/HomeView';
import InputEvent from 'components/InputEvent';

import { getUsers } from 'redux/firebase/actions';
import { usersSelector } from 'redux/firebase/selectors';

import ImgDefault from 'assets/images/imgDefault.png';

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
							<div className="label-products-table select-text">Store Layout</div>
							<CardMedia
								className="zones-store-layout"
								image={ImgDefault}
								title="Contemplative Reptile"
							/>
							<SelectZone />
						</div>)}
					{this.renderGrid('red',
						<HomeView
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
					{this.renderGrid('red',
						<HomeView
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
					{this.renderGrid('red',
						<HomeView
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
