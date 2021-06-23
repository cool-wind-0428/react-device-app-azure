import mock from '../mock';
import axios from 'axios';
import FuseUtils from '@fuse/utils/FuseUtils';
import { API_URL } from 'app/fuse-configs/endpointConfig';

mock.onGet(`/api/users-app/users`).reply(() => { 
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}/users`, {})
			.then(response => { 			
				const data = response.data;
				resolve([200, data])
			});
	});
});

mock.onPost('/api/users-app/remove-users').reply(request => { 
	const { ids } = JSON.parse(request.data); 
	return new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}/users/deleteByIds`, { ids })
			.then(response => { 
				const data = response.data;
				resolve([200, data])
			});
	});
});

mock.onPost('/api/users-app/remove-user-by-email').reply(request => { 
	const { email } = JSON.parse(request.data);
	return new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}/users/deleteByEmail`, { email })
			.then(response => { 
				const data = response.data;
				resolve([200, data])
			});
	});
});

mock.onGet('/api/users-app/user').reply(request => { 
	const { userId } = request.params;						
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}/users/${userId}`, {})
			.then(response => { 
				const data = response.data;
				resolve([200, data])
			});
	});
});

mock.onPost('/api/users-app/user/save').reply(request => { 
	const data = JSON.parse(request.data); 
	return new Promise((resolve, reject) => {
		axios.post(`${API_URL}/users/register`, {
			uuid: FuseUtils.generateGUID(),
			password: data.password,
			displayName: data.displayName,
			email: data.email,
			phone: data.phone,
			active: data.active,
			role: data.role
		})
		.then(response => {
			const data = response.data;
			resolve([200, data])
		});
	});
});

mock.onPost('/api/users-app/user/update').reply(request => {
	const data = JSON.parse(request.data); 
	return new Promise((resolve, reject) => {
		axios.put(`${API_URL}/users/${data.id}`, {
			uid: data.id,
			displayName: data.displayName,
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


