import React, { Component } from 'react';

import channel1_1 from 'assets/images/now/1/1.png';
import channel1_2 from 'assets/images/now/1/2.png';
import channel1_3 from 'assets/images/now/1/3.png';
import channel1_4 from 'assets/images/now/1/4.png';

import channel2_1 from 'assets/images/now/2/1.png';
import channel2_2 from 'assets/images/now/2/2.png';
import channel2_3 from 'assets/images/now/2/3.png';
import channel2_4 from 'assets/images/now/2/4.png';
import channel2_5 from 'assets/images/now/2/5.png';

import channel3_1 from 'assets/images/now/3/1.png';
import channel3_2 from 'assets/images/now/3/2.png';
import channel3_3 from 'assets/images/now/3/3.png';
import channel3_4 from 'assets/images/now/3/4.png';

import channel4_1 from 'assets/images/now/4/1.png';
import channel4_2 from 'assets/images/now/4/2.png';
import channel4_3 from 'assets/images/now/4/3.png';
import channel4_4 from 'assets/images/now/4/4.png';

import channel5_1 from 'assets/images/now/5/1.png';
import channel5_2 from 'assets/images/now/5/2.png';
import channel5_3 from 'assets/images/now/5/3.png';
import channel5_4 from 'assets/images/now/5/4.png';
import channel5_6 from 'assets/images/now/5/6.png';
import channel5_7 from 'assets/images/now/5/7.png';
import channel5_8 from 'assets/images/now/5/8.png';
import channel5_9 from 'assets/images/now/5/9.png';
import channel5_10 from 'assets/images/now/5/10.png';
import channel5_11 from 'assets/images/now/5/11.png';
import channel5_12 from 'assets/images/now/5/12.png';
import channel5_13 from 'assets/images/now/5/13.png';
import channel5_14 from 'assets/images/now/5/14.png';
import channel5_15 from 'assets/images/now/5/15.png';
import channel5_16 from 'assets/images/now/5/16.png';
import channel5_17 from 'assets/images/now/5/17.png';
import channel5_18 from 'assets/images/now/5/18.png';
import channel5_19 from 'assets/images/now/5/19.png';
import channel5_20 from 'assets/images/now/5/20.png';
import channel5_21 from 'assets/images/now/5/21.png';
import channel5_22 from 'assets/images/now/5/22.png';

const channelImgs = [
	[
		channel1_1,
		channel1_2,
		channel1_3,
		channel1_4,
	],
	[
		channel2_1,
		channel2_2,
		channel2_3,
		channel2_4,
		channel2_5,
	],
	[
		channel3_1,
		channel3_2,
		channel3_3,
		channel3_4,
	],
	[
		channel4_1,
		channel4_2,
		channel4_3,
		channel4_4,
	],
	[
		channel5_1,
		channel5_2,
		channel5_3,
		channel5_4,
		channel5_6,
		channel5_7,
		channel5_8,
		channel5_9,
		channel5_10,
		channel5_11,
		channel5_12,
		channel5_13,
		channel5_14,
		channel5_15,
		channel5_16,
		channel5_17,
		channel5_18,
		channel5_19,
		channel5_20,
		channel5_21,
		channel5_22,
	],

];

class BasePackages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectBase: 1,
		};
	}

	render() {
		const { selectBase } = this.state;
		return (
			<div id="directv-now-packages">
				<div className="directvnow-packages-price-bar">
					<div
						className="directvnow-packages-price-each"
						style={selectBase === 1 ? { background: '#FFC126', color: 'white', borderTopLeftRadius: '0.25rem', borderBottomLeftRadius: '0.25rem' } : { borderTopLeftRadius: '0.25rem', borderBottomLeftRadius: '0.25rem' }}
						onClick={() => this.setState({ selectBase: 1 })}>
						<div className="directvnow-packages-each-title">LIVE A LITTLE</div>
						<div className="directvnow-packages-each-price">$40/mo, 65+ channels</div>
					</div>
					<div
						className="directvnow-packages-price-each"
						style={selectBase === 2 ? { background: '#7dd105', color: 'white' } : {}}
						onClick={() => this.setState({ selectBase: 2 })}>
						<div className="directvnow-packages-each-title">JUST RIGHT</div>
						<div className="directvnow-packages-each-price">$55/mo, 85+ channels</div>
					</div>
					<div
						className="directvnow-packages-price-each"
						style={selectBase === 3 ? { background: '#039fdb', color: 'white' } : {}}
						onClick={() => this.setState({ selectBase: 3 })}>
						<div className="directvnow-packages-each-title">GO BIG</div>
						<div className="directvnow-packages-each-price">$65/mo, 105+ channels</div>
					</div>
					<div
						className="directvnow-packages-price-each"
						style={selectBase === 4 ? { background: '#c890f8', color: 'white' } : {}}
						onClick={() => this.setState({ selectBase: 4 })}>
						<div className="directvnow-packages-each-title">GOTTA HAVE IT</div>
						<div className="directvnow-packages-each-price">$75/mo, 125+ channels</div>
					</div>
					<div
						className="directvnow-packages-price-each"
						style={selectBase === 5 ? { background: '#dd7777', color: 'white', borderTopRightRadius: '0.25rem', borderBottomRightRadius: '0.25rem' } : { borderTopRightRadius: '0.25rem', borderBottomRightRadius: '0.25rem' }}
						onClick={() => this.setState({ selectBase: 5 })}>
						<div className="directvnow-packages-each-title">TODO Y MAS</div>
						<div className="directvnow-packages-each-price">$45/mo, 90+ channels</div>
					</div>
				</div>
				<div className="channel-images">
					{channelImgs[selectBase - 1].map((img, idx) =>
						<img key={idx} src={img} alt="" style={{ width: '100%' }} />,
					)}
				</div>
			</div>
		);
	}
}

export default BasePackages;
