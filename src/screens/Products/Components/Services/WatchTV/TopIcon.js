import watchtv from 'assets/images/watchtv.jpeg';
import icon1 from 'assets/images/icon1.png';
import icon2 from 'assets/images/icon2.png';
import icon3 from 'assets/images/icon3.png';

export const TopIcon = () => (
	<div id="watchtv-topicon" className="d-flex justify-content-center">
		<img style={{ width: 120, height: 60 }} src={watchtv} alt="" />
		<div className="watchtv-topIconView">
			<div className="text-align-center">
				<img className="watchtv-topicon-1" src={icon1} alt="" />
				<div className="watchtv-txtSmall">30+ channels of live TV, {'\n'} playing 24/7</div>
			</div>
			<div className="text-align-center">
				<img className="watchtv-topicon-2" src={icon2} alt="" />
				<div className="watchtv-txtSmall">15,000 on-demand {'\n'} moviews & shows</div>
			</div>
			<div className="text-align-center">
				<img className="watchtv-topicon-3" src={icon3} alt="" />
				<div className="watchtv-txtSmall">Stream it all on your {'\n'} favorite device</div>
			</div>
		</div>
	</div>);

