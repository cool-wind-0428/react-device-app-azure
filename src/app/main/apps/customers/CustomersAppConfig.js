import React from 'react';

const CustomerAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/customers/customer',
			component: React.lazy(() => import('./customer/Users'))
		}					
	]
};

export default CustomerAppConfig;
