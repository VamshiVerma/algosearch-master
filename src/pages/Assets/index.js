import React from 'react';
import axios from 'axios';
import './index.css';
import Layout from '../../components/layout';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs';
import Statscard from '../../components/statscard';
import ReactTable from 'react-table-6';
import AlgoIcon from '../../components/algoicon';
import 'react-table-6/react-table.css';
import {formatValue, siteName} from '../../constants';
import Load from '../../components/tableloading';

class Assets extends React.Component {
	constructor() {
		super();

		this.state = {
			loading: true, // Default loading = true
			pageSize: 25, // Default pageSize = 25
			pages: -1, // By default, pages to -1,
			max_assets: 0, // Set maximum Asset number to 0
			assets: [] // Assets data
		};
	}
	
	// Update page size
	updatePageSize = (pageIndex, pageSize) => {
		this.setState({
			pageSize: pageSize, // Set pageSize to new page size
			pages: Math.ceil(this.state.max_assets / pageSize) // Set pages to new number of pages
		}, () => {
			this.updateAssets(pageIndex); // Run update to get new data based on update page size and current index
		});
	};

	// Update assets based on page number
	updateAssets = pageIndex => {
		// Let the request headAsset be max_assets - (current page * pageSize)
		let headAsset = pageIndex * this.state.pageSize;

		axios({
			method: 'get',
			url: `${siteName}/all/assets/${headAsset + this.state.pageSize}/${this.state.pageSize}/0` // Use pageSize from state
		}).then(response => {
			this.setState({assets: response.data.assets}); // Set assets to new data to render
		}).catch(error => {
			console.log("Exception when updating assets: " + error);
		})
	};

	getAssets = () => {
		axios({
			method: 'get',
			url: `${siteName}/all/assets/25/25/0`,
		}).then(response => {
			this.setState({
				assets: response.data.assets, // Set assets data
				max_assets: response.data.total_assets,
				pages: Math.ceil(response.data.total_assets / 25), // Set pages to rounded up division
				loading: false // Set loading to false
			});
		}).catch(error => {
			console.log("Exception when retrieving last 25 assets: " + error);
		})
	}

	componentDidMount() {
		document.title="AlgoSearch | Assets";
		this.getAssets();
	}

	render() {
		// Table columns
		const columns = [
			{Header: 'Asset ID', accessor: 'ID', Cell: props => <NavLink to={`/as/${props.value}`}>{props.value}</NavLink>}, 
			{Header: 'Name', accessor: 'Name', Cell: props => <span className="type noselect">{props.value}</span>},
			{Header: 'Unit', accessor: 'Unit', Cell: props => <NavLink to={`/address/${props.value}`}>{props.value}</NavLink>}, 
			{Header: 'URL', accessor: 'URL', Cell: props => <NavLink to={`/address/${props.value}`}>{props.value}</NavLink>},
			{Header: 'Creator', accessor: 'Creator', Cell: props => <span>{formatValue(props.value)} <AlgoIcon /></span>},
		];

		return (
			<Layout>
				<Breadcrumbs
					name="Assets"
					parentLink="/"
					parentLinkName="Home"
					currentLinkName="All Assets"
				/>
				<div className="cardcontainer">
					<Statscard
						stat="Asset last seen"
						value={this.state.loading ? <Load /> : formatValue(this.state.assets[0].ID)}
					/>
					<Statscard
						stat="Assets sent (24H)"
						value=""
					/>
					<Statscard
						stat="Volume (24H)"
						value=""
					/>
				</div>
				<div className="table">
					<div>
						<p>{this.state.loading ? "Loading" : formatValue(this.state.max_assets)} assets found</p>
						<p>(Showing the last {this.state.assets.length} records)</p>
					</div>
					<div>
						<ReactTable
							pageIndex={0}
							pages={this.state.pages}
							data={this.state.assets}
							columns={columns}
							loading={this.state.loading}
							defaultPageSize={25}
							pageSizeOptions={[25, 50, 100]}
							onPageChange={pageIndex => this.updateAssets(pageIndex)}
							onPageSizeChange={(pageSize, pageIndex) => this.updatePageSize(pageIndex, pageSize)}
							sortable={false}
							className="assets-table"
							manual
						/>
						</div>
					</div>
			</Layout>
		);
	}
}

export default Assets;
