import icon_getmore from 'assets/images/icon_getmore.png';
import watch_mark from 'assets/images/watch_mark.png';
import check_blue from 'assets/images/check_blue.png';

export const GetMore = () => (
	<div id="watchtv-getmore">
		<div className="title-img-containers">
			<div className="title-img-container">
				<img className="getmore-left" src={icon_getmore} alt="" />
			</div>
			<div className="title-img-container">
				<img className="getmore-right" src={watch_mark} alt="" />
			</div>
		</div>
		<div className="txtSaveDescription">
			Stream 30+ channels of live TV for only $15/mo. All with no equipment or annual contract to weigh you down.
		</div>
		<div className="new-perks">YOUR NEW PERKS!</div>
		<div className="features">
			<div className="each-feature">
				<img className="check-blue" src={check_blue} alt="" />
				<div className="description">
					Watch TBS, Cartoon Network,{'\n'} CNN and more--live
				</div>
			</div>
			<div className="each-feature">
				<img className="check-blue" src={check_blue} alt="" />
				<div className="description">
					Get thousands of on-demand{'\n'} movies & TV shows
				</div>
			</div>
			<div className="each-feature">
				<img className="check-blue" src={check_blue} alt="" />
				<div className="description">
					Stream on your favorite{'\n'} device
				</div>
			</div>
		</div>
	</div>);
