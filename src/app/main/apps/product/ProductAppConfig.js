import React from 'react';
import { Redirect } from 'react-router-dom';

const ProductAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/product/products/:productId/:deviceId?',
			component: React.lazy(() => import('./product/Product'))
		},
		{
			path: '/apps/product/products',
			component: React.lazy(() => import('./products/Products'))
		},	
		{
			path: '/apps/product',
			component: () => <Redirect to="/apps/product/products" />
		},
	]
};

export default ProductAppConfig;
