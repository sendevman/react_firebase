import icon_ios from 'assets/images/icon_ios.png';
import icon_android from 'assets/images/icon_android.png';
import icon_appletv from 'assets/images/icon_appletv.png';
import icon_chrome from 'assets/images/icon_chrome.png';
import icon_amazontv from 'assets/images/icon_amazontv.png';
import icon_firetv from 'assets/images/icon_firetv.png';
import icon_destination from 'assets/images/icon_destination.png';

export const Destination = () => (
	<div id="watchtv-destination">
		<div className="destination-img-containers">
			<img className="destination-img" src={icon_ios} alt="" />
			<img className="destination-img" src={icon_android} alt="" />
			<img className="destination-img" src={icon_appletv} alt="" />
			<img className="destination-img" src={icon_chrome} alt="" />
			<img className="destination-img" src={icon_amazontv} alt="" />
			<img className="destination-img" src={icon_firetv} alt="" />
		</div>
		<div className="d-flex justify-content-center">
			<img className="destination-anywhere" src={icon_destination} alt="" />
		</div>
		<div className="txtSaveDescription">
			On the couch, on the bus, waiting in line, or on vacation—WatchTV works with your favorite devices so your entertainment is always close at hand.
		</div>
	</div>);
