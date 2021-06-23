import mock from '../mock';
import axios from 'axios';
import { API_URL } from 'app/fuse-configs/endpointConfig';

mock.onGet(`/api/invitations-app/users`).reply(() => { 
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}/invitations`, {})
			.then(response => { 			
				const data = response.data;
				resolve([200, data])
			});
	});
});

mock.onPost('/api/invitations-app/remove-users').reply(request => {
	const { ids } = JSON.parse(request.data); 
	return new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}/invitations/deleteByIds`, { ids })
			.then(response => { 
				const data = response.data;
				resolve([200, data])
			});
	});
});

mock.onGet('/api/invitations-app/user').reply(request => { 
	const { productId } = request.params;						
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}/invitations/${productId}`, {})
			.then(response => { 
				const data = response.data;
				resolve([200, data])
			});
	});
});

mock.onPost('/api/invitations-app/user/save').reply(request => { 
	const data = JSON.parse(request.data); 
	return new Promise((resolve, reject) => {
		axios.post(`${API_URL}/invitations/register`, {
			uid: data.id,
			name: data.name,
			email: data.email,
			emailValidation: false,
			phone: data.phone,
			role: data.role
		})
		.then(response => {
			const data = response.data;
			resolve([200, data])
		});
	});
});

mock.onPost('/api/invitations-app/invitation/update').reply(request => {
	const data = JSON.parse(request.data); 
	return new Promise((resolve, reject) => {
		axios.put(`${API_URL}/invitations/${data.id}`, {
			uid: data.uid,
			displayName: data.name,
			email: data.email,
			phone: data.phone,
			role: data.role
		})
		.then(response => {
			const data = response.data;
			resolve([200, data])
		});
	});
});


