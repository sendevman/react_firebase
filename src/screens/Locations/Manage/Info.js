import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import GeneralInfo from 'components/GeneralInfo';
import HomeView from 'components/HomeView';
import InputEvent from 'components/InputEvent';

class LocationsManInfo extends InputEvent {
	handleHomePreview = () => {}

	handleHomeSave = () => {}

	handleHomeImport = () => {}

	handleHomeArchive = () => {}

	handleGlobalPreview = () => {}

	handleGlobalSave = () => {}

	handleGlobalImport = () => {}

	handleGlobalArchive = () => {}

	render() {
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
			backTitle: true,
			backImage: true,
		};
		return (
			<div id="locations-man-info" className="Container-box">
				<Grid container spacing={24}>
					{this.renderGrid('orange', <GeneralInfo storeId={this.props.storeId} />)}
					{this.renderGrid('orange',
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
					{this.renderGrid('orange',
						<HomeView
							title="Global Background"
							activeComponent={globalBackComponent}
							prevbtn
							savebtn
							importbtn
							archbtn
							handlePreview={this.handleGlobalPreview}
							handleSave={this.handleGlobalSave}
							handleImport={this.handleGlobalImport}
							handleArchive={this.handleGlobalArchive} />)}
				</Grid>
			</div>
		);
	}
}

LocationsManInfo.propTypes = {
	storeId: PropTypes.string,
};

LocationsManInfo.defaultProps = {
	storeId: '',
};

export default LocationsManInfo;
