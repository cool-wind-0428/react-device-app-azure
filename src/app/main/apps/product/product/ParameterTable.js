import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import moment from 'moment'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate/FuseAnimate';
import { openParameterInfoDialog } from '../store/dialogSlice';
import { getMessages, selectMessages } from '../store/messagesSlice';
import { getDescriptions } from '../store/descriptionsSlice';
import ParameterTableHead from './ParameterTableHead';
import { diff } from '../../../../utils/Functions';

function ProductsTable() {
	const dispatch = useDispatch();
	const routeParams = useParams([]);
	const messages = useSelector(selectMessages);
	const searchText = useSelector(({ productApp }) => productApp.messages.searchText);

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(messages);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	
	useEffect(() => {
		dispatch(getDescriptions());
		dispatch(getMessages(routeParams)).then(() => setLoading(false));		
	}, [dispatch, routeParams]);

	useEffect(() => { 

		let temp = [];  
		let groups = [];
		let params = {};		
		messages.map((item) => {
			!_.isEmpty(item) && Object.keys(item.message).map(msgKey => {				
				if(msgKey.includes('PARAMETER')) {
					let group = msgKey;
					let rootGroup = msgKey;

					// check if exist '(' or ')' character in msgKey and remove it
					const s = msgKey.indexOf('(');
					const e = msgKey.indexOf(')');					
					if(s>0 && e>0) {
						const sub = msgKey.substr(s, e-s+1);
						group = msgKey.replace(sub, '');
						rootGroup = group;
					}
					
					// remove the number at the end of parameter
					let arr = group.split('_');
					if(arr.length > 3) {
						arr.splice(2, arr.length-3);
						group = arr.join('_');
						rootGroup = group;
					}

					arr = rootGroup.split('_');
					if(arr.length > 2) {
						arr.splice(2, arr.length-2);
						rootGroup = arr.join('_');
					}

					if(!groups.includes(group)) {
						groups.push(group);
						params[group] = { ...item.message[msgKey] };
						const msg = { ...item, group: group, rootGroup: rootGroup, params: { ...item.message[msgKey] } };					
						temp.push(msg);		
					} else { 
						const n = groups.indexOf(group);
						let tempItem = temp[n]; 
						tempItem = { ...tempItem, params: { ...tempItem.params, ...item.message[msgKey] } }
						temp[n] = tempItem;			
					}										
				}
				return [];					
			});	
			return [];						
		}); 
		
		temp = _.orderBy(temp, ['timestamp'], ['desc']);
		setData(temp)	
	}, [messages, searchText]);

	function handleRequestSort(event, property) { 
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no parameters!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full flex flex-row">
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="" aria-labelledby="tableTitle">
						<ParameterTableHead
							order={order}
							onRequestSort={handleRequestSort}
							rowCount={data.length}
						/>

						<TableBody>
							{_.orderBy(
								data,
								[
									o => {
										switch (order.id) {
											// case 'timestamp': {
											// 	return o.timestamp;
											// }
											default: {
												return o[order.id];
											}
										}
									}
								],
								[order.direction]
							)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n, i) => {
									return (
										<TableRow
											className="h-64 cursor-pointer"
											hover
											tabIndex={-1}
											key={n.id}
											onClick={event => dispatch(openParameterInfoDialog(n))}
										>										
											<TableCell className="p-4 md:p-16" component="th" scope="row">
												{i+1}
											</TableCell>

											<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
												{diff(moment(), n.timestamp)}
											</TableCell>

											<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
												{n.group}
											</TableCell>

											{/* <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
												{n.number}
											</TableCell>

											<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
												{n.log!=='' && n.number>0 && descriptions[n.log][n.number]}
											</TableCell> */}
										
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</FuseScrollbars>

				<TablePagination
					className="flex-shrink-0 border-t-1"
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</div>
		</div>			
	);
}

export default withRouter(ProductsTable);
