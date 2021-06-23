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
import { openMessageInfoDialog } from '../store/dialogSlice';
import { getMessages, selectMessages } from '../store/messagesSlice';
import ProductTableHead from './MessageTableHead';
import { diff } from '../../../../utils/Functions';

function ProductsTable(props) {
	const dispatch = useDispatch();
	const messages = useSelector(selectMessages);
	const searchText = useSelector(({ productApp }) => productApp.messages.searchText);

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const routeParams = useParams([]);

	useEffect(() => {
		dispatch(getMessages(routeParams)).then(() => setLoading(false));		
	}, [dispatch, routeParams]);

	useEffect(() => { 
		let temp = _.filter(messages, item => !item.log.toLowerCase().includes('para'.toLowerCase()));
		if (searchText.toLowerCase() !== 'all') {
			temp = _.filter(temp, item => item.log.toLowerCase().includes(searchText.toLowerCase()));
			setPage(0);
		} 

		temp = _.orderBy(temp, ['timestamp'], ['desc']);
		setData(temp);
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
						There are no messages!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="" aria-labelledby="tableTitle">
					<ProductTableHead
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
										className={`h-64 cursor-pointer ${n.log==='error' && 'bg-red-50'}`}
										hover
										tabIndex={-1}
										key={n.id}
										onClick={event => dispatch(openMessageInfoDialog(n))}
									>										
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{i+1}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{diff(moment(), n.timestamp)}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.log}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.number}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">											
											{n.description}
										</TableCell>									
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
	);
}

export default withRouter(ProductsTable);
