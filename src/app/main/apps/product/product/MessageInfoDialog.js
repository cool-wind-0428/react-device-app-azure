import { useForm } from '@fuse/hooks';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMessageInfoDialog } from '../store/dialogSlice';

const defaultFormState = {
	ID: '',
	log: '',
	lcd: 0,
	state: 0,
	stop: 0,
	inLevel: 0,
	trips: 0,
};

function MessageInfoDialog(props) {
	const dispatch = useDispatch();
	const messageInfoDialog = useSelector(({ productApp }) => productApp.dialog.messageInfoDialog);
	
	const { form, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		let tempForm = messageInfoDialog.data.message;
		if(tempForm.log === 'info') {
			tempForm = { ...tempForm, state: messageInfoDialog.data.description }
		} else if(tempForm.log === 'error') {
			tempForm = { ...tempForm, state: messageInfoDialog.data.errorDescription }
		}

		setForm({ ...defaultFormState, ...tempForm });
	}, [messageInfoDialog.data, setForm]);

	useEffect(() => {	
		if (messageInfoDialog.props.open) {
			initDialog();
		}
	}, [messageInfoDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return dispatch(closeMessageInfoDialog());
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...messageInfoDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>			
			<div className="w-full rounded-8 shadow">
				<div className="p-16 px-4 flex flex-row items-center justify-between">
					<Typography className="h1 px-12">{messageInfoDialog.data && messageInfoDialog.data.description}</Typography>
				</div>

				<FuseScrollbars>
					<Divider className="card-divider w-full" />	
					<Table>					
						<TableBody>
							{Object.keys(form).splice(0, 3).map((key, n) => {
								return (
									<>
										<TableRow
											className="h-64 cursor-pointer"
											hover
											tabIndex={-1}
											key={`row-${key}-up`}
										>										
											<TableCell className="p-4 md:p-16" component="th" scope="row" align='left'>
												{key}
											</TableCell>

											<TableCell className="p-4 md:p-16 truncate" component="th" scope="row" align='right'>
												{form[key]}
											</TableCell>																					
										</TableRow>										
									</>
								);
							})}
						</TableBody>
					</Table>
					<Divider className="card-divider w-full" />	
					<Table>
						<TableHead>
							<TableRow className="h-64">				
								<TableCell className="p-4 md:p-16" align='left'>Key</TableCell>
								<TableCell className="p-4 md:p-16" align='right'>Value</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.keys(form).splice(3, Object.keys(form).length-1).map((key, n) => {
								return (
									<>
										<TableRow
											className="h-64 cursor-pointer"
											hover
											tabIndex={-1}
											key={`row-${key}-under`}
										>										
											<TableCell className="p-4 md:p-16" component="th" scope="row" align='left'>
												{key}
											</TableCell>

											<TableCell className="p-4 md:p-16 truncate" component="th" scope="row" align='right'>
												{form[key]}
											</TableCell>																					
										</TableRow>										
									</>
								);
							})}
						</TableBody>
					</Table>
				</FuseScrollbars>										
			</div>
		</Dialog>
	);
}

export default MessageInfoDialog;
