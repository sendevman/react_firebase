import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import dtv_logo from 'assets/images/dtv.logo.png';
import check_blue from 'assets/images/check_blue.png';

import package_channels from 'assets/JSON/package_channels.json';
import packages from 'assets/JSON/packages.json';
import allChannels from 'assets/JSON/channels.json';
import groups from 'assets/JSON/groups.json';

class DirecTVPackage extends Component {
	constructor(props) {
		super(props);
		const channels = this.getInitialChannels();
		this.state = {
			packages,
			channels,
			groups,
			showSearch: false,
			searchText: '',
		};
	}

	getInitialChannels = () => allChannels.filter(channel => channel.initial === true);

	getChannelPresence = (chLogoId, pkgId) => {
		const channels = package_channels[pkgId];
		if (channels) {
			const channelPresence = channels.find(pr => pr.chLogoId === chLogoId);
			return channelPresence && channelPresence.chPresence === 'true';
		}
		return false;
	}

	search = (e) => {
		const phrase = e.target.value;
		const channels =
			phrase
				? allChannels.filter(channel => channel.name.toLowerCase().indexOf(phrase.toLowerCase()) !== -1)
				: this.getInitialChannels();

		this.setState({
			channels,
			groups: phrase ? [] : groups,
			searchText: phrase,
		});
	}

	toggleSearch = () => {
		this.setState({
			showSearch: !this.state.showSearch,
		});

		if (this.state.showSearch) {
			this.setState({
				channels: this.getInitialChannels(),
				groups,
			});
		}
	}

	render() {
		const { channels, groups, packages, showSearch, searchText } = this.state;
		return (
			<div id="directv-package">
				<div className="directv-package-logo">
					<img src={dtv_logo} alt="" />
					<div className="directv-package-logo-title">Shop Now</div>
				</div>
				<div className="directv-pages-container">
					<div className="directv-package-search" onClick={this.toggleSearch}>
						Search
					</div>
					{packages.map((pkg, index) => (
						<div key={index} className="directv-each-package" style={{ backgroundColor: pkg.color }}>
							<div className="directv-each-package-price">{pkg.price}/mo</div>
							<div className="directv-each-package-desc">Additional info</div>
						</div>))}
				</div>
				{showSearch &&
					<input
						className="directv-search-text"
						value={searchText}
						onChange={this.search}
					/>}
				<div className="directv-packages-state">
					<div className="directv-99-local">
						<div className="directv-99-local-channel-first">
							99% Local channels in USA
						</div>
						<div className="directv-99-local-channel">
							<img src={check_blue} alt="" />
						</div>
						<div className="directv-99-local-channel">
							<img src={check_blue} alt="" />
						</div>
						<div className="directv-99-local-channel">
							<img src={check_blue} alt="" />
						</div>
						<div className="directv-99-local-channel">
							<img src={check_blue} alt="" />
						</div>
						<div className="directv-99-local-channel">
							<img src={check_blue} alt="" />
						</div>
						<div className="directv-99-local-channel">
							<img src={check_blue} alt="" />
						</div>
					</div>
					{groups.map((group, index) => (
						<div key={index} className="directv-99-local">
							<div className="directv-99-local-channel-first">
								<img src={group.logoUrl} style={{ width: '30px' }} alt="" />
							</div>
							{packages.map((pkg, idx) => (
								<div key={idx} className="directv-99-local-channel">
									{(idx < (packages.length - 1))
										? <img src={group.promoUrl} style={{ width: '30px' }} alt="" />
										: <img src={check_blue} alt="" />}
								</div>))}
						</div>))}

					{channels.filter(channel => channel.grpName == null).map((channel, index) => (
						<div key={index} className="directv-99-local">
							<div className="directv-99-local-channel-first">
								<img src={channel.logoUrl} style={{ width: '30px' }} alt="" />
							</div>
							{packages.map((pkg, idx) => (
								<div key={idx} className="directv-99-local-channel">
									{this.getChannelPresence(channel.chLogoId, pkg.id) && <img src={check_blue} alt="" />}
								</div>))}
						</div>))}
				</div>
			</div>
		);
	}
}

// DirecTVPackage.propTypes = {
// 	currentProduct: PropTypes.object,
// };

// DirecTVPackage.defaultProps = {
// 	currentProduct: {},
// };

export default DirecTVPackage;
