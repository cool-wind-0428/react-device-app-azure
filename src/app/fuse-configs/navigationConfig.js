import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [		
			{
				id: 'lifts',
				title: 'Lifts',
				translate: 'Lifts',
				type: 'item',
				// auth:authRoles.admin,
				icon: 'shopping_cart',
				url: '/apps/product/products',
			},
			{
				id: 'users',
				title: 'Users',
				translate: 'Customers',
				type: 'item',
				auth:authRoles.admin,
				icon: 'account_box',
				url: '/apps/users/user',				
			},
			{
				id: 'customers',
				title: 'Customers',
				translate: 'Service men',
				type: 'item',
				icon: 'account_box',
				url: '/apps/customers/customer'
			},			
		]
	}
];

export default navigationConfig;
