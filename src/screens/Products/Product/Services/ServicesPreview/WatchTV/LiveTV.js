/**
 * Conexus-Tech - Retail Companion Web Interface AT&T
 * https://conexustech.com/
 * @flow
 */

import icon_livetv from 'assets/images/icon_livetv.png';
import device_md from 'assets/images/device_md.png';
import icon4 from 'assets/images/icon4.png';
import icon5 from 'assets/images/icon5.png';
import icon6 from 'assets/images/icon6.png';

export const LiveTV = () => (
	<div id="watchtv-livetv">
		<div className="title-img-containers">
			<div className="title-img-container">
				<img className="left" src={icon_livetv} alt="" />
			</div>
			<div className="title-img-container">
				<img className="right" src={device_md} alt="" />
			</div>
		</div>
		<div className="txtSaveDescription">
			Play your favorite live shows, news, movies and more in the palm of your hand with WatchTV from AT&T
		</div>
		<div className="features">
			<div className="each-feature">
				<img className="icon-4" src={icon4} alt="" />
				<div className="description">
					Stream TBS, Cartoon Network, CNN, {'\n'} Discovery and more -- all live
				</div>
			</div>
			<div className="each-feature">
				<img className="icon-6" src={icon5} alt="" />
				<div className="description">
					Binge 15,000 movies & hit shows
				</div>
			</div>
			<div className="each-feature">
				<img className="icon-6" src={icon6} alt="" />
				<div className="description">
					No equipment, no annual contract
				</div>
			</div>
		</div>
	</div>);
