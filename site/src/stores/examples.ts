import { writable } from 'svelte/store';
import dayjs from 'dayjs';
const paginateExampleValues = {
	page: 2,
	pages: 4
};

const inputTextExampleValues = {
	schemaentry: {
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
const events = [
	{
		date: new Date(),
		id: 'test',
		label: 'thetest'
	},
	{
		date: dayjs().startOf('month').subtract(1, 'day').toDate(),
		id: 'test2',
		label: 'thetest start'
	}
];

const paypal = {
	id: 'paypal',
	label: 'bbbb',
	paypalid: 'test'
};

const defaultPayment = {
	merchantName: 'testmerchant',
	countryCode: 'it',
	currencyCode: 'EUR',
	total: 45,
	type: 'buy'
};
const schema1 = [
	{
		id: 'name-row',
		type: 'row',
		params: {
			columns: [
				{
					type: 'text',
					placeholder: 'Insert your first name here...',
					id: 'firstName',
					required: true,
					label: 'First Name',
					validationTip: 'This field cannot be empty.'
				},
				{
					type: 'text',
					placeholder: 'Insert your last name here...',
					id: 'lastName',
					required: true,
					label: 'Last Name',
					validationTip: 'This field cannot be empty.'
				},
				{
					type: 'text',
					placeholder: 'Insert your last namez here...',
					id: 'lastNamez',
					label: 'Last Namez',
					validationTip: 'This field cannot be emptyz.'
				},
				{
					type: 'select',
					placeholder: 'Select something here...',
					id: 'selectsomething',
					required: true,
					label: 'Selection of something',
					validationTip: 'This field cannot be empty.',
					params: {
						options: [
							{ label: '', value: '' },
							{ label: 'testlabel', value: 'testvalue' }
						]
					}
				},
				{
					type: 'radio',
					placeholder: 'radio something here...',
					id: 'radiosomething',
					required: true,
					label: 'Selection of something',
					validationTip: 'This field cannot be empty.',
					params: {
						options: [
							{ label: 'radio', value: 'radio' },
							{ label: 'radio2', value: 'radi2o' },
							{ label: 'radio3', value: 'radio2' },
							{ label: 'testlabel', value: 'testvalue' }
						]
					}
				}
			]
		}
	},
	{
		type: 'number',
		id: 'age',
		required: true,
		label: 'Age',
		params: {
			min: 8,
			max: 120
		},
		validationTip: 'Min 8, Max 120'
	},
	{
		type: 'text',
		placeholder: 'Insert your last name here...',
		id: 'lastName2',
		required: true,
		label: 'Last Name',
		validationTip: 'This field cannot be empty.'
	},
	{
		type: 'textarea',
		placeholder: 'Insert your last name22 here...',
		id: 'lastName22',
		required: true,
		label: 'Last Name2',
		validationTip: 'This field cannot be empty2.'
	}
];
const preferences = [
	{
		type: 'text',
		placeholder: 'Inserisci titolo di default',
		id: 'defaultTitle',
		required: true,

		label: 'Titolo di default',
		value: 'numtest',
		params: {
			minlength: 8,
			maxlength: 120
		}
	},
	{
		type: 'number',
		id: 'age',
		required: true,
		label: 'Age',
		value: 9,
		params: {
			min: 8,
			max: 120
		},
		validationTip: 'Min 8, Max 120'
	}
];
const preferences2 = [
	{
		type: 'text',
		placeholder: 'Inserisci titolo di default2',
		id: 'defaultTitle2',
		required: true,

		label: 'Titolo di default2',
		value: 'ntest2',
		params: {
			minlength: 8,
			maxlength: 120
		}
	},
	{
		type: 'number',
		id: 'age2',
		required: true,
		label: 'Age2',
		value: 20,
		params: {
			min: 8,
			max: 120
		},
		validationTip: 'Min 8, Max 120'
	}
];
const cards = [
	{
		title: 'bau',
		videoSrc: 'https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video',
		time: '2021-08-06T22:46:30.565Z'
	},
	{
		title: 'bb1',
		videoSrc: 'https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video',
		time: '2021-08-06T22:46:31.565Z'
	},
	{ title: 'bb2', time: '2021-08-02T22:46:32.565Z' },
	{
		title: 'ss',
		time: '2021-08-06T22:46:34.565Z',
		description: 'fffffff',
		testnested: { nested: 'dddd' }
	},
	{
		title: 'bb4',
		time: '2021-08-06T22:46:34.565Z',
		videoSrc: 'https://www.youtube.com/embed/tgbNymZ7vqY',
		provider: 'youtube'
	},
	{ title: 'aa5', time: '2021-08-06T22:46:34.565Z' },
	{ title: 'bb6', time: '2021-08-06T22:46:34.565Z' },
	{ title: 'bb7', time: '2021-08-06T22:46:34.565Z' },
	{ title: 'bb8', time: '2021-08-06T22:46:34.565Z' },
	{ title: 'bb9', time: '2021-08-06T22:46:33.565Z' },
	{ title: 'bb10', time: '2021-08-06T22:46:34.565Z' },
	{ title: 'bb11', time: '2021-08-06T22:46:34.565Z' },
	{
		title: 'bb12',
		time: '2021-08-06T22:46:34.565Z',
		videoSrc: 'https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video'
	},
	{ title: 'bb13', time: '2021-08-07T22:46:39.565Z' }
];
const headers = [
	{
		label: 'title',
		key: 'title',
		search: true
	},
	{
		label: 'description',
		key: 'description'
	},
	{
		label: 'nested',
		key: 'testnested.nested'
	},
	{
		label: 'data',
		key: 'time',
		type: 'datetime',
		format: 'DD MMMM YYYY'
	}
];
const defaultgw = {
	id: 'paypal',
	label: 'bbbb',
	paypalid: 'test'
};
const googlepay = {
	id: 'google',
	label: 'GooglePay',
	gatewayId: 'example',
	gatewayMerchantId: 'exampleGatewayMerchantId'
};
const authExampleValues = {
	type: 'login',
	logouri: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg'
};

const calendarEventsExampleValues = {
	events
};

const cardVideoExampleValues = {
	videosrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
	title: 'aa',
	description: 'desc6',
	time: '2021-08-15T18:55:22.135Z'
};
const chartjsExampleValues = {
	data: {
		type: 'line',
		data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June'],
			datasets: [
				{
					label: 'My First dataset',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: [0, 10, 5, 2, 20, 30, 45]
				}
			]
		},
		options: {}
	}
};
const checkoutExampleValues = {
	shipments: [
		{
			price: 10,
			currency: '€',

			arriveDate: '2022-01-20T08:03:57.562Z',
			available: true,
			label: 'zio barca',
			id: 'ziobarca'
		},
		{
			price: 20,
			currency: '€',

			arriveDate: '2022-01-21T02:22:57.562Z',
			available: true,
			label: 'zio barca2',
			id: 'ziobarca2'
		}
	],
	gateways: [paypal],
	payment: defaultPayment
};
const checkoutShoppingCartExampleValues = {
	payment: {
		items: [
			{
				unitaryPrice: 2,
				taxPercentage: 3,
				name: 'testitem'
			},
			{
				unitaryPrice: 5,
				taxPercentage: 7,
				name: 'testitem2'
			}
		]
	}
};
const contactItemExampleValues = {
	email: { address: 'dev@dariocaruso.info' }
};
const cookieLawBannerExampleValues = {
	allowdecline: true
};
const dialogExampleValues = {
	show: true
};
const downloaderExampleValues = {};
const dropdownSimpleExampleValues = {
	list: [
		{
			key: 'ciao',
			label: 'bao'
		},
		{
			key: 'ciao2',
			label: 'bao2'
		},
		{
			key: 'ciao3',
			label: 'bao3',
			linkHref: 'fefeef'
		}
	]
};
const editorTinymceExampleValues = {};
const editorVideoExampleValues = {};
const formExampleValues = {
	schema: schema1
};
const funnelExampleValues = {
	schemes: [preferences, preferences2]
};
const galleryVideoExampleValues = {
	cards,
	headers
};
const gaugeExampleValues = {
	options: {
		value: 50,
		min: 0,
		max: 100
	}
};
const inputAreaExampleValues = {
	schemaentry: {
		placeholder: 'Insert your last name here...',
		id: 'lastName',
		required: true,
		label: 'Last Name Area',
		validationTip: 'This field cannot be empty.'
	}
};
const inputCheckboxExampleValues = {};
const inputDateExampleValues = {};
const inputEmailExampleValues = {};
const inputFileExampleValues = {
	placeholder: 'Insert your last name here...',
	id: 'lastName',
	required: true,
	label: 'Last Name',
	validationTip: 'This field cannot be empty.'
};
const inputNumberExampleValues = {};
const inputRadioExampleValues = {
	placeholder: 'Choose here...',
	id: 'check0',
	required: true,
	label: 'Check 0',
	validationTip: 'Check 1',
	group: 'ciao',
	params: {
		options: [
			{ label: '777', value: '555' },
			{ label: 'testlabel', value: 'testvalue' }
		]
	}
};
const inputSelectExampleValues = {};
const mapExampleValues = {
	center: [10, 10],
	zoom: 9,
	source: { type: 'osm' },
	options: { centerFromGeometries: true },
	data: [
		{
			marker: {
				lngLat: [10.1, 10],
				icon: {
					uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Visual_Studio_Code_Insiders_1.36_icon.svg',
					scale: 0.15,
					anchor: [0.5, 0.1]
				},
				popupHtml: '<p>You clicked here:</p><code>ciao</code>'
			}
		},
		{
			marker: {
				lngLat: [10, 10],
				popupHtml: '<p>You clicked here:</p><code>ciao</code>'
			}
		},
		{
			marker: {
				lngLat: [10.3, 10]
			}
		}
	]
};
const modalVideoExampleValues = {
	uri: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
};
const navbarExampleValues = {
	companybrandname: 'testbrand2',
	pagetitle: 'pagetest'
};
const orderListExampleValues = {
	payment: {
		orderNumber: 'ssss',

		items: [
			{
				id: 'sss',
				unitaryPrice: 2,
				taxPercentage: 3,
				name: 'testitem',
				image: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Walgreens_Obama_Merchandise.jpg'
			},
			{
				id: 'aaa',
				unitaryPrice: 5,
				taxPercentage: 7,
				name: 'testitem2',
				image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Fredmeyer_edit_1.jpg'
			}
		]
	}
};
const pageCheckoutExampleValues = {
	shipments: [],
	user: {
		fullName: 'fdfff fffff',
		addressWithNumber: 'addreess 43',
		city: 'ff',
		nationality: 'effe',
		zip: '3434',
		fixed: true
	},
	gateways: [defaultgw, googlepay],
	payment: {
		countryCode: 'IT',
		items: [
			{
				unitaryPrice: 2,
				taxPercentage: 3,
				name: 'testitem'
			},
			{
				unitaryPrice: 5,
				taxPercentage: 7,
				name: 'testitem2'
			}
		]
	}
};
const pageInvoiceExampleValues = {
	headers: {
		serial: 'seriale1',
		from: {
			piva: 'piva',
			name: 'companyfrom',
			address: 'address',
			email: 'email',
			phone: 'phone',
			logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg',
			shortName: 'Acme SpA'
		},
		to: {
			piva: 'to iva',
			name: 'to name',
			address: 'to address',
			email: 'to@email.com',
			phone: 'tototo'
		}
	},
	items: [
		{
			unitaryPrice: 2,
			taxPercentage: 3,
			desc: 'testitem'
		},
		{
			unitaryPrice: 5,
			taxPercentage: 7,
			desc: 'testitem2'
		}
	]
};
const pageLoginregisterExampleValues = {
	type: 'login',
	company: company1
};
const paymentPaypalExampleValues = {
	label: 'bbbb',
	paypalid: 'test'
};
const playerLiveExampleValues = {
	width: 400,
	mediauri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
};
const productComparisonExampleValues = {
	headers: [
		{
			id: 'char1',
			label: 'labello'
		},
		{
			id: 'char2',
			label: 'labello2'
		},
		{
			id: 'char3',
			label: 'labello3'
		}
	],
	products: [
		{
			id: 'prrr',
			price: 19,
			model: 'starter',
			description: 'weekly',
			note: 'rotto',
			characteristics: {
				char1: 'valid',
				char2: 'disabled',
				char3: 'blocked',
				char4: 'valid'
			}
		},
		{
			id: 'prrr2',
			price: 49,
			model: 'professional',
			description: 'weekly',
			note: 'rotto',
			characteristics: {
				char1: 'valid',
				char2: 'disabled',
				char3: 'blocked',
				char4: 'valid'
			}
		},
		{
			id: 'prrr3',
			price: 99,
			model: 'advanced',
			description: 'weekly',
			note: 'rotto',
			characteristics: {
				char1: 'valid',
				char2: 'disabled',
				char3: 'blocked',
				char4: 'valid'
			}
		},
		{
			id: 'prrr4',
			price: 199,
			model: 'custom',
			description: 'weekly',
			note: 'rotto',

			characteristics: {
				char1: 'valid',
				char2: 'disabled',
				char3: 'blocked',
				char4: 'valid'
			}
		}
	],
	options: { currency: '€' }
};
const rangeSliderExampleValues = {
	withbubbles: true,
	minval: 20,
	maxval: 60
};
const sidenavLinkExampleValues = {};
const tableExampleValues = {
	headers: [
		{
			label: 'title',
			key: 'title',
			search: true
		},
		{
			label: 'description',
			key: 'description'
		},
		{
			label: 'nested',
			key: 'testnested.nested'
		},
		{
			label: 'data',
			key: 'time',
			type: 'datetime',
			format: 'DD MMMM YYYY'
		}
	],
	rows: [
		{
			title: 'bau',
			videoSrc: 'https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video',
			time: '2021-08-06T22:46:30.565Z',
			_id: 'bau',
			status: 'closed'
		},
		{
			title: 'bb1',
			videoSrc: 'https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video',
			time: '2021-08-06T22:46:31.565Z',
			description: 'ffff2',
			_id: 'bb1',
			status: 'closed'
		},
		{
			title: 'bb2',
			time: '2021-08-02T22:46:32.565Z',
			_id: 'bb2',
			status: 'active'
		},
		{
			title: 'ss',
			time: '2021-08-06T22:46:34.565Z',
			description: 'fffffff',
			testnested: { nested: 'dddd' },
			_id: 'ss',
			status: 'active'
		},
		{
			title: 'bb4',
			time: '2021-08-06T22:46:34.565Z',
			_id: 'bb4',
			status: 'active'
		},
		{
			title: 'aa5',
			time: '2021-08-06T22:46:34.565Z',
			_id: 'aa5',
			status: 'active'
		},
		{
			title: 'bb6',
			time: '2021-08-06T22:46:34.565Z',
			_id: 'bb6',
			status: 'active'
		},
		{
			title: 'bb7',
			time: '2021-08-06T22:46:34.565Z',
			_id: 'bb7',
			status: 'active'
		},
		{
			title: 'bb8',
			time: '2021-08-06T22:46:34.565Z',
			_id: 'bb8',
			status: 'active'
		},
		{
			title: 'bb9',
			time: '2021-08-06T22:46:33.565Z',
			_id: 'bb9',
			status: 'active'
		},

		{
			title: 'bb10',
			time: '2021-08-06T22:46:34.565Z',
			_id: 'bb10',
			status: 'active'
		},
		{
			title: 'bb11',
			time: '2021-08-06T22:46:34.565Z',
			_id: 'bb11',
			status: 'active'
		},
		{
			title: 'bb12',
			time: '2021-08-06T22:46:34.565Z',
			videoSrc: 'https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video',
			_id: 'bb12',
			status: 'active'
		},
		{
			title: 'bb13',
			time: '2021-08-07T22:46:39.565Z',
			_id: 'bb13',
			status: 'active'
		}
	]
};
const toastExampleValues = {
	small: '11 mins ago',
	title: 'Bootstrap',
	show: true,
	content: 'Hello, world! This is a toast message.',
	img: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17e7e03606d%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17e7e03606d%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.4296875%22%20y%3D%22104.5%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
};

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
