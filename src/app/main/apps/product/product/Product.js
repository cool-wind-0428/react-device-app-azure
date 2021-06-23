import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer'; 
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { resetProduct, saveProduct, updateProduct, newProduct, getProduct } from '../store/productSlice';
import { getMessages } from '../store/messagesSlice';
import { setMessagesSearchText } from '../store/messagesSlice';
import { getUsers, selectUsers } from '../store/usersSlice';
import { getTodos } from '../store/todosSlice';
import MessageTable from './MessageTable';
import ParameterTable from './ParameterTable';
import MessageInfoDialog from './MessageInfoDialog'
import ParameterInfoDialog from './ParameterInfoDialog'
import reducer from '../store';

const logs = [
	{ id: 'All', value: 'All', label: 'All' },
	{ id: 'alarm', value: 'alarm', label: 'alarm' },
	{ id: 'info', value: 'info', label: 'info' },
	{ id: 'error', value: 'error', label: 'error' }
]

function Product() {
	const dispatch = useDispatch();
	const history = useHistory();
	const role = useSelector(({ auth }) => auth.user.role);
	const product = useSelector(({ productApp }) => productApp.product);
	const searchText = useSelector(({ productApp }) => productApp.messages.searchText);
	const users = useSelector(selectUsers); 
	const theme = useTheme();
	
	const [tabValue, setTabValue] = useState(1);
	const [noProduct, setNoProduct] = useState(false);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams([]); 

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { productId } = routeParams;

			dispatch(getUsers());
			dispatch(getTodos(routeParams));

			if (productId === 'new') {
				setTabValue(0);
				dispatch(newProduct());				
			} else {
				dispatch(getProduct(routeParams)).then(action => {
					if (!action.payload) {
						setNoProduct(true);
					}
				});
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);

	useEffect(() => {  
		if ((product && !form) || (product && form && product.id !== form.id)) { 
			setForm(product);
		}
	}, [form, product, setForm]);

	useEffect(() => {		
		return () => {
			dispatch(resetProduct());
			setNoProduct(false);
		};
	}, [dispatch]);

	function handleChangeTab(event, value) { 
		setTabValue(value);
	}

	function handleChipChange(value, name) { 
		setForm(
			_.set(
				{ ...form },
				name,
				value.map(item => item.id)
			)
		); 
	}

	function canBeSubmitted() { 
		return form.name.length > 0 && !_.isEqual(product, form);
	}

	if (noProduct) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such product!
					</Typography>
					<Button
						className="normal-case mt-24"
						component={Link}
						variant="outlined"
						to="/apps/product/products"
						color="inherit"
					>
						Go to Products Page
					</Button>
				</div>
			</FuseAnimate>
		);
	}

	if ((!product || (product && routeParams.productId !== product.id)) && routeParams.productId !== 'new') {
		return <FuseLoading />;
	}

	return (
		<>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',content: 'flex',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={
					form && (
						<div className="flex flex-1 w-full items-center justify-between">
							<div className="flex flex-col items-start max-w-full">
								<FuseAnimate animation="transition.slideRightIn" delay={300}>
									<Typography
										className="normal-case flex items-center sm:mb-12"
										component={Link}
										role="button"
										to="/apps/product/products"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4">Lifts</span>
									</Typography>
								</FuseAnimate>

								<div className="flex items-center max-w-full">							
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												{form.name ? `${form.name} - ${form.uid} - ${form.address}` : 'New Lift'}
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">Lift Detail</Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>
							{tabValue!==0 &&
								<div className="flex flex-1 items-center justify-center px-12">
									<FuseAnimate animation="transition.slideDownIn" delay={300}>
										<FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
											<InputLabel htmlFor="category-label-placeholder"> Log </InputLabel>
											<Select
												value={tabValue===2 ? 'para' : searchText}
												onChange={ev => dispatch(setMessagesSearchText(ev))}
												input={
													<OutlinedInput
														labelWidth={'Log'.length * 9}
														name="category"
														id="category-label-placeholder"
													/>
												}
												inputProps={{
													readOnly: tabValue===2 && true,
													disabled: tabValue===2 && true,
												}}
											>
												<MenuItem value="all">
													<em> All </em>
												</MenuItem>
												{logs.map(log => (
													<MenuItem value={log.value} key={log.id}>
														{log.label}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</FuseAnimate>
								</div>
							}
							{role==='admin' && tabValue===0 &&
								<FuseAnimate animation="transition.slideRightIn" delay={300}>
									<Button
										className="whitespace-nowrap normal-case"
										variant="contained"
										color="secondary"
										disabled={!canBeSubmitted()}
										onClick={() => 
											routeParams.productId==='new' ? 
											dispatch(saveProduct({form})).then(() => { history.goBack(); }) : 
											dispatch(updateProduct({form, routeParams}))
										}
									>
										Save
									</Button>
								</FuseAnimate>
							}
							{(tabValue===1 || tabValue===2) &&
								<FuseAnimate animation="transition.slideRightIn" delay={300}>
									<Button
										className="whitespace-nowrap normal-case"
										variant="contained"
										color="secondary"
										onClick={() => dispatch(getMessages(routeParams))}
									>
										Refresh
									</Button>
								</FuseAnimate>
							}
						</div>
					)
				}
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={handleChangeTab}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>

						<Tab className="h-64 normal-case" label="Basic Info" />
						<Tab className="h-64 normal-case" label="Message" />
						<Tab className="h-64 normal-case" label="Parameter" />
						<Tab className="h-64 normal-case" label="Echtzeit" />
						<Tab className="h-64 normal-case" label="Monteure" />
					</Tabs>
				}
				content={
					form && (
						<>							
							{tabValue === 0 && (
								<div className="p-16 sm:p-24 max-w-2xl">	
									<div>
										<TextField
											className="mt-8 mb-16"
											error={form.uid === ''}
											required
											label="ID"
											autoFocus
											id="id"
											name="id"
											value={form.uid}
											onChange={handleChange}
											variant="outlined"
											fullWidth
											inputProps={{
												readOnly: role!=='admin',
											}}
										/>

										<TextField
											className="mt-8 mb-16"
											error={form.name === ''}
											required
											label="Name"
											id="name"
											name="name"
											value={form.name}
											onChange={handleChange}
											variant="outlined"
											fullWidth
											inputProps={{
												readOnly: role!=='admin',
											}}
										/>	

										<TextField
											className="mt-8 mb-16"
											error={form.address === ''}
											required
											label="Address"
											id="address"
											name="address"
											value={form.address}
											onChange={handleChange}
											variant="outlined"
											fullWidth
											inputProps={{
												readOnly: role!=='admin',
											}}
										/>								

										{role==='admin' && 
											<FuseChipSelect
												className="mt-8 mb-24"
												value={form.categories.map(item => {
													if(!_.isEmpty(_.find(users, { id: item }))) { 
														return {
															id: item,											
															value: _.find(users, { id: item }).label,
															label: _.find(users, { id: item }).label
														}
													}
												})}
												onChange={value => handleChipChange(value, 'categories')}
												placeholder="Select multiple Users"
												textFieldProps={{
													label: 'Users',
													InputLabelProps: {
														shrink: true
													},
													variant: 'outlined'
												}}
												options={users}
												isMulti
											/>
										}
									</div>
								</div>	
							)}
							{tabValue === 1 && (
								<MessageTable />
							)}
							{tabValue === 2 && (								
								<ParameterTable />
							)}
							{tabValue === 3 && (
								<div>

								</div>
							)}
							{tabValue === 4 && (
								<div>
									
								</div>
							)}						
						</>	
					)
				}	
				innerScroll
			/>
			<MessageInfoDialog />
			<ParameterInfoDialog />
		</>
	);
}

export default withReducer('productApp', reducer)(Product);
