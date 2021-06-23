import React from 'react';

const CustomerAppConfig = {
	settings: {
		layout: {}
	},
	routes: [	
		{
			path: '/apps/users/user',
			component: React.lazy(() => import('./user/Users'))
		}			
	]
};

export default CustomerAppConfig;
