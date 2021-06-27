import React from 'react';
import axios from 'axios';
import moment from 'moment';
import './index.css';
import { NavLink } from 'react-router-dom';
import Layout from '../../components/layout';
import Breadcrumbs from '../../components/breadcrumbs';
import Load from '../../components/tableloading';
import AlgoIcon from '../../components/algoicon';
import {formatValue, siteName} from '../../constants';

class Asset extends React.Component {
	constructor() {
		super();

		this.state = {
			asid: 0,
			asset: [],
			loading: true,
		}
	}

	getAsset = asid => {
		axios({
			method: 'get',
			url: `${siteName}/assetservice/${asid}`
		}).then(response => {
			this.setState({asset: response.data, loading: false});
		}).catch(error => {
			console.log("Exception when retrieving asset details: " + error);
		})
	};

	componentDidMount() {
		const { asid } = this.props.match.params;
		this.setState({asid: asid});
		document.title=`AlgoSearch | Asset ${asid}`;
		this.getAsset(asid);
	}

	render() {
		return (
			<Layout>
				<Breadcrumbs
					name={`Asset Details`}
					parentLink="/assets"
					parentLinkName="Assets"
					currentLinkName={`Asset Details`}
				/>
				<div className="block-table">
					<span>Asset Details</span>
					<div>
						<table cellSpacing="0">
							<thead>
								<tr>
									<th>Identifier</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>ID</td>
									<td>{this.state.loading ? <Load /> : this.state.asid}</td>
								</tr>
								<tr>
									<td>Name</td>
									<td>{this.state.loading ? <Load /> : <NavLink to={`/block/${this.state.asset.round}`}>{this.state.asset.round}</NavLink>}</td>
								</tr>
								<tr>
									<td>Unit</td>
									<td>{this.state.loading ? <Load /> : <span className="type noselect">{this.state.asset.type}</span>}</td>
								</tr>
								<tr>
									<td>URL</td>
									<td>{this.state.loading ? <Load /> : <NavLink to={`/address/${this.state.asset.from}`}>{this.state.asset.from}</NavLink>}</td>
								</tr>
								<tr>
									<td>Creator</td>
									<td>{this.state.loading ? <Load /> : <NavLink to={`/address/${this.state.asset.payment.to}`}>{this.state.asset.payment.to}</NavLink>}</td>
								</tr>

								<tr>
									<td>First round</td>
									<td>{this.state.loading ? <Load /> : <NavLink to={`/block/${this.state.asset["first-round"]}`}>{this.state.asset["first-round"]}</NavLink>}</td>
								</tr>
								<tr>
									<td>Last round</td>
									<td>{this.state.loading ? <Load /> : <NavLink to={`/block/${this.state.asset["last-round"]}`}>{this.state.asset["last-round"]}</NavLink>}</td>
								</tr>
								<tr>
									<td>Timestamp</td>
									<td>{this.state.loading ? <Load /> : moment.unix(this.state.asset.timestamp).format("LLLL")}</td>
								</tr>
								<tr>
									<td>Base 64</td>
									<td>
										{this.state.loading ? <Load /> : (
											<div>
												{this.state.asset.noteb64 && this.state.asset.noteb64 !== '' ? (
													<div>
														<div>
															<span>Base 64:</span>
															<textarea defaultValue={this.state.asset.noteb64} readOnly></textarea>
														</div>
														<div>
															<span>Converted:</span>
															<textarea defaultValue={atob(this.state.asset.noteb64)} readOnly></textarea>
														</div>
													</div>
												) : null}
											</div>
										)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="block-table">
					<span>Miscellaneous Details</span>
					<div>
						<table cellSpacing="0">
							<thead>
								<tr>
									<th>Identifier</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>From rewards</td>
									<td>{this.state.loading ? <Load /> : (
										<div className="tx-hasicon">
											{formatValue(this.state.asset.fromrewards / 1000000)}
											<AlgoIcon />
										</div>
									)}</td>
								</tr>
								<tr>
									<td>To rewards</td>
									<td>{this.state.loading ? <Load /> : (
										<div className="tx-hasicon">
											{formatValue(this.state.asset.payment.torewards / 1000000)}
											<AlgoIcon />
										</div>
									)}</td>
								</tr>
								<tr>
									<td>Genesis ID</td>
									<td>{this.state.loading ? <Load /> : this.state.asset.genesisID}</td>
								</tr>
								<tr>
									<td>Genesis hash</td>
									<td>{this.state.loading ? <Load /> : this.state.asset.genesishashb64}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</Layout>
		);
	}
}

export default Asset;
