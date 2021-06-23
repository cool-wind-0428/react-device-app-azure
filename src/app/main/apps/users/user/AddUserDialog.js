import { useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectBox from '../components/SelectBox';
import { saveUser, updateUser, closeUserDialog } from '../store/usersSlice';
import { showMessage } from 'app/store/fuse/messageSlice';

const defaultFormState = {
	password: '',
	displayName: '',
	email: '',
	active: false,
	phone: '',	
	role: 'customer',
};

const sourceLists = [{ item: 'Admin', value: 'admin' }];

const roleList = [
	{ item: 'Admin', value: 'admin' },
	{ item: 'Customer', value: 'customer' },
	// { item: 'Customer', value: 'customer' }
];

function AddUserDialog(props) {
	const dispatch = useDispatch();
	const addUserDialog = useSelector(({ usersApp }) => usersApp.users.addUserDialog);
	const role = useSelector(({ auth }) => auth.user.role[0]);
	const [roles, setRoles] = useState(roleList);

	useEffect(() => {
		if (role === 'customer') {
			setRoles(sourceLists);
		}
	}, [role]);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const handleChangeValue = data => {
		setForm({ ...form, ...data });
	};

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (addUserDialog.type === 'edit' && addUserDialog.data) {
			setForm({ ...addUserDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (addUserDialog.type === 'new') {
			setForm({
				...defaultFormState,
			});
		}
	}, [addUserDialog.data, addUserDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (addUserDialog.props.open) {
			initDialog();
		}
	}, [addUserDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return addUserDialog.type === 'edit' ? dispatch(closeUserDialog()) : dispatch(closeUserDialog());
	}

	function canBeSubmitted() {
		return form.email.length > 0 && form.role.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (addUserDialog.type === 'new') {  
			dispatch(saveUser({ ...form })).then(
				dispatch(showMessage({ message: 'Invitation sent to email. Please check the email!' }))
			);
		} else {
			dispatch(updateUser({ ...form })).then(
				dispatch(showMessage({ message: 'User data updated' }))
			);
		}
		closeComposeDialog();
	}

	function handleRemove() {
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...addUserDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{addUserDialog.type === 'new' ? 'Send Invitation' : 'Edit User'}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					{addUserDialog.type!=='new' &&
						<>
							<div className="flex">
								<TextField
									className="mb-24"
									label="Name"
									autoFocus
									id="name"
									name="displayName"
									value={form.displayName}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
							</div>

							<div className="flex">
								<TextField
									className="mb-24"
									label="Phone"
									id="phone"
									name="phone"
									value={form.phone}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
							</div>
						</>
					}

					<div className="flex">
						<TextField
							className="mb-24"
							label="Email"
							id="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
							inputProps={{
								'readOnly': addUserDialog.type === 'new' ? false : true
							}}
						/>
					</div>

					<div className="flex mb-24">
						<SelectBox							
							id="outlined-basic"
							label="Role"
							data={roles}
							variant="outlined"
							value={form.role}
							validation="role"
							handleChangeValue={handleChangeValue}
							willvalidation={false}
							size={100}
							readOnly={false}
						/>
					</div>
				</DialogContent>

				{addUserDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={!canBeSubmitted()}
							>
								Send Invitation
							</Button>
						</div>
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleRemove}
							>
								Cancel
							</Button>
						</div>
					</DialogActions>
				) : (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={!canBeSubmitted()}
							>
								Save
							</Button>
						</div>
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleRemove}
							>
								Cancel
							</Button>
						</div>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default AddUserDialog;
