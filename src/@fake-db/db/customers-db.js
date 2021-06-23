import mock from '../mock';
import axios from 'axios';
import { API_URL } from 'app/fuse-configs/endpointConfig';

mock.onGet(`/api/customers-app/users`).reply(() => { 
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}/customers`, {})
			.then(response => { 			
				const data = response.data;
				resolve([200, data])
			});
	});
});

mock.onPost('/api/customers-app/remove-users').reply(request => {
	const { ids } = JSON.parse(request.data); 
	return new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}/customers/deleteByIds`, { ids })
			.then(response => { 
				const data = response.data;
				resolve([200, data])
			});
	});
});

mock.onGet('/api/customers-app/user').reply(request => { 
	const { productId } = request.params;						
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}/customers/${productId}`, {})
			.then(response => { 
				const data = response.data;
				resolve([200, data])
			});
	});
});

mock.onPost('/api/customers-app/user/save').reply(request => { 
	const data = JSON.parse(request.data); 
	return new Promise((resolve, reject) => {
		axios.post(`${API_URL}/customers/register`, {
			uid: data.id,
			userId: data.userId,
			displayName: data.displayName,
			email: data.email,
			emailValidation: false,
			phone: data.phone,
			devices: data.devices,
			role: data.role
		})
		.then(response => {
			const data = response.data;
			resolve([200, data])
		});
	});
});

mock.onPost('/api/customers-app/user/update').reply(request => {
	const data = JSON.parse(request.data); 
	return new Promise((resolve, reject) => {
		axios.put(`${API_URL}/customers/${data.id}`, {
			uid: data.id,
			displayName: data.displayName,
			email: data.email,
			phone: data.phone,
			devices: data.devices,
			emailValidation: false,
			role: data.role
		})
		.then(response => {
			const data = response.data;
			resolve([200, data])
		});
	});
});


