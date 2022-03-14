import { writable } from 'svelte/store';

const paginateExampleValues = {
	page: 2,
	pages: 4
};

const inputTextExampleValues = {
	schemaentry: {
		type: 'text',
		placeholder: 'Insert your last name here...',
		id: 'lastName',
		required: true,
		label: 'Last Name',
		validationTip: 'This field cannot be empty.'
	}
};

const bannerExampleValues = {
	title: 'ciao',
	description: 'desc',
	logouri: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg'
};
const areaCodeExampleValues = {
	content: 'desc'
};
const sidebar = { title: 'ciao' };
const company1 = {
	logoUri: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg',
	siteName: 'testsite',
	companyName: 'testcompany S.R.L.',
	registration: 'copyright',
	description: `testo e descrizione di esempio dell applicazione`,
	vatNumber: 'aa - ffffff',
	fiscalCode: 'f4f5f6fff'
};

const navlinks2 = [
	{
		label: 'Home',
		key: 'home',
		icon: 'house-door',
		badge: {
			text: 'bbb'
		}
	},
	{
		label: 'Dashboard',
		key: 'dashboard',
		icon: 'speedometer',
		badge: {
			text: 'bbb'
		}
	},
	{
		label: 'Settings',
		key: 'settings',
		icon: 'gear',
		group: 'admin',
		badge: {
			text: 'bbb'
		}
	},
	{
		label: 'Users',
		key: 'users',
		icon: 'people-fill',
		group: 'admin',
		badge: {
			text: 'uuuuu'
		}
	},
	{
		label: 'Stats',
		key: 'stats',
		icon: 'graph-up',
		group: 'stats',
		badge: {
			text: 'bbb'
		}
	}
];

const contacts1 = {
	sites: [
		{
			label: 'dariocaruso.info',
			uri: 'https://dariocaruso.info'
		}
	],
	phones: [
		{
			number: '6666666666666'
		}
	],
	addresses: [],
	emails: []
};
const usermenu1 = {
	list: [
		{
			key: 'list1',
			label: 'list1'
		},
		{
			key: 'list2',
			label: 'list2'
		},
		{
			key: 'list3',
			label: 'list3',
			group: 'list1',
			badge: '3'
		},
		{
			key: 'list4',
			label: 'list4',
			badge: '555'
		}
	],
	imgUri: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg'
};
const socials1 = {
	facebook: 'fbbb',
	youtube: 'yttttttt'
};
const columns1 = [
	{
		cells: [
			{
				label: 'test',
				key: 'test'
			},
			{
				label: 'test2',
				key: 'test2'
			},
			{
				label: 'test3',
				key: 'test3'
			}
		],
		title: 'stringtitle'
	}
];
const brandandcontacts1 = {};
const footerbottom1 = {};
const policies1 = [
	{
		label: 'Privacy Policy',
		key: 'privacypolicy'
	},
	{
		label: 'Condizioni Generali',
		key: 'generalcondition'
	},
	{
		label: 'Cookie Policy',
		key: 'cookiepolicy'
	}
];
const layoutExampleValues = {
	company: company1,
	contacts: contacts1,
	socials: socials1,
	navlinks: navlinks2,
	usermenu: usermenu1,
	sidebar
};
const footerExampleValues = {
	company: company1,
	brandandcontacts: brandandcontacts1,
	columns: columns1,
	footerbottom: footerbottom1,
	policies: policies1,
	contacts: contacts1,
	socials: socials1
};
const offcanvasExampleValues = {
	opened: true,
	id: 'BasicOffcanvasOnSettings',
	navlinks: [
		{
			label: 'Home',
			key: 'home',
			icon: 'house-door'
		},
		{
			label: 'Dashboard',
			key: 'dashboard',
			icon: 'speedometer'
		},
		{
			label: 'Settings',
			key: 'settings',
			icon: 'gear'
		},
		{
			label: 'Users',
			key: 'users',
			icon: 'people-fill'
		},
		{
			label: 'Stats',
			key: 'stats',
			icon: 'graph-up'
		}
	],
	navpage: 'settings',
	companytitle: 'acme corp'
};

const authExampleValues = {};
const calendarEventsExampleValues = {};
const cardVideoExampleValues = {};
const chartjsExampleValues = {};
const checkoutExampleValues = {};
const checkoutShoppingCartExampleValues = {};
const contactItemExampleValues = {};
const cookieLawBannerExampleValues = {};
const dialogExampleValues = {};
const downloaderExampleValues = {};
const dropdownSimpleExampleValues = {};
const editorTinymceExampleValues = {};
const editorVideoExampleValues = {};
const formExampleValues = {};
const funnelExampleValues = {};
const galleryVideoExampleValues = {};
const gaugeExampleValues = {};
const inputAreaExampleValues = {};
const inputCheckboxExampleValues = {};
const inputDateExampleValues = {};
const inputEmailExampleValues = {};
const inputFileExampleValues = {};
const inputNumberExampleValues = {};
const inputRadioExampleValues = {};
const inputSelectExampleValues = {};
const mapExampleValues = {};
const modalVideoExampleValues = {};
const navbarExampleValues = {};
const orderListExampleValues = {};
const pageCheckoutExampleValues = {};
const pageInvoiceExampleValues = {};
const pageLoginregisterExampleValues = {};
const paymentPaypalExampleValues = {};
const playerLiveExampleValues = {};
const productComparisonExampleValues = {};
const rangeSliderExampleValues = {};
const sidenavLinkExampleValues = {};
const tableExampleValues = {};
const toastExampleValues = {};

export const allComponentsExampleValues = writable({
	banner: bannerExampleValues,
	layout: layoutExampleValues,
	'area-code': areaCodeExampleValues,
	'input-text': inputTextExampleValues,
	offcanvas: offcanvasExampleValues,
	paginate: paginateExampleValues,
	footer: footerExampleValues,
	auth: authExampleValues,
	'calendar-events': calendarEventsExampleValues,
	'card-video': cardVideoExampleValues,
	chartjs: chartjsExampleValues,
	checkout: checkoutExampleValues,
	'checkout-shopping-cart': checkoutShoppingCartExampleValues,
	'contact-item': contactItemExampleValues,
	'cookie-law-banner': cookieLawBannerExampleValues,
	dialog: dialogExampleValues,
	downloader: downloaderExampleValues,
	'dropdown-simple': dropdownSimpleExampleValues,
	'editor-tinymce': editorTinymceExampleValues,
	'editor-video': editorVideoExampleValues,
	form: formExampleValues,
	funnel: funnelExampleValues,
	'gallery-video': galleryVideoExampleValues,
	gauge: gaugeExampleValues,
	'input-area': inputAreaExampleValues,
	'input-checkbox': inputCheckboxExampleValues,
	'input-date': inputDateExampleValues,
	'input-email': inputEmailExampleValues,
	'input-file': inputFileExampleValues,
	'input-number': inputNumberExampleValues,
	'input-radio': inputRadioExampleValues,
	'input-select': inputSelectExampleValues,
	map: mapExampleValues,
	'modal-video': modalVideoExampleValues,
	navbar: navbarExampleValues,
	'order-list': orderListExampleValues,
	'page-checkout': pageCheckoutExampleValues,
	'page-invoice': pageInvoiceExampleValues,
	'page-loginregister': pageLoginregisterExampleValues,
	'payment-paypal': paymentPaypalExampleValues,
	'player-live': playerLiveExampleValues,
	'product-comparison': productComparisonExampleValues,
	'range-slider': rangeSliderExampleValues,
	'sidenav-link': sidenavLinkExampleValues,
	table: tableExampleValues,
	toast: toastExampleValues
});
