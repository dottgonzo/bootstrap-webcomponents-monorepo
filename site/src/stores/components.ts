import { readable, writable } from 'svelte/store';

import bannerDefinition from '@htmlbricks/hb-banner/release/webcomponent.type.d.json';
import areaCodeDefinition from '@htmlbricks/hb-area-code/release/webcomponent.type.d.json';
import offcanvasDefinition from '@htmlbricks/hb-offcanvas/release/webcomponent.type.d.json';
import layoutDefinition from '@htmlbricks/hb-layout/release/webcomponent.type.d.json';
import footerDefinition from '@htmlbricks/hb-footer/release/webcomponent.type.d.json';
import inputTextDefinition from '@htmlbricks/hb-input-text/release/webcomponent.type.d.json';
import paginateDefinition from '@htmlbricks/hb-paginate/release/webcomponent.type.d.json';

import {
	storybookArgs as bannerStorybookArgs,
	cssVars as bannerCssVars,
	cssParts as bannerCssParts,
	htmlSlots as bannerHtmlSlots
} from '@htmlbricks/hb-banner/release/docs';
import {
	storybookArgs as areaCodeStorybookArgs,
	cssVars as areaCodeCssVars,
	cssParts as areaCodeCssParts,
	htmlSlots as areaCodeHtmlSlots
} from '@htmlbricks/hb-area-code/release/docs';
import {
	storybookArgs as offcanvasStorybookArgs,
	cssVars as offcanvasCssVars,
	cssParts as offcanvasCssParts,
	htmlSlots as offcanvasHtmlSlots
} from '@htmlbricks/hb-offcanvas/release/docs';
import {
	storybookArgs as layoutStorybookArgs,
	cssVars as layoutCssVars,
	cssParts as layoutCssParts,
	htmlSlots as layoutHtmlSlots
} from '@htmlbricks/hb-layout/release/docs';
import {
	storybookArgs as footerStorybookArgs,
	cssVars as footerCssVars,
	cssParts as footerCssParts,
	htmlSlots as footerHtmlSlots
} from '@htmlbricks/hb-footer/release/docs';
import {
	storybookArgs as inputTextStorybookArgs,
	cssVars as inputTextCssVars,
	cssParts as inputTextCssParts,
	htmlSlots as inputTextHtmlSlots
} from '@htmlbricks/hb-input-text/release/docs';
import {
	storybookArgs as paginateStorybookArgs,
	cssVars as paginateCssVars,
	cssParts as paginateCssParts,
	htmlSlots as paginateHtmlSlots
} from '@htmlbricks/hb-paginate/release/docs';

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

export const allComponentsMetas = readable([
	{
		definition: bannerDefinition,
		storybookArgs: bannerStorybookArgs,
		name: 'banner',
		category: 'basic',
		cssVars: bannerCssVars,
		cssParts: bannerCssParts,
		htmlSlots: bannerHtmlSlots
	},
	{
		definition: areaCodeDefinition,
		storybookArgs: areaCodeStorybookArgs,
		name: 'area-code',
		category: 'dev',
		cssVars: areaCodeCssVars,
		cssParts: areaCodeCssParts,
		htmlSlots: areaCodeHtmlSlots
	},
	{
		definition: offcanvasDefinition,
		storybookArgs: offcanvasStorybookArgs,
		name: 'offcanvas',
		category: 'layout',
		cssVars: offcanvasCssVars,
		cssParts: offcanvasCssParts,
		htmlSlots: offcanvasHtmlSlots
	},
	{
		definition: layoutDefinition,
		storybookArgs: layoutStorybookArgs,
		name: 'layout',
		category: 'layout',
		cssVars: layoutCssVars,
		cssParts: layoutCssParts,
		htmlSlots: layoutHtmlSlots
	},
	{
		definition: footerDefinition,
		storybookArgs: footerStorybookArgs,
		name: 'footer',
		category: 'layout',
		cssVars: footerCssVars,
		cssParts: footerCssParts,
		htmlSlots: footerHtmlSlots
	},
	{
		definition: inputTextDefinition,
		storybookArgs: inputTextStorybookArgs,
		name: 'input-text',
		category: 'form',
		cssVars: inputTextCssVars,
		cssParts: inputTextCssParts,
		htmlSlots: inputTextHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	}
]);

export const allComponentsExampleValues = writable({
	banner: bannerExampleValues,
	layout: layoutExampleValues,
	'area-code': areaCodeExampleValues,
	'input-text': inputTextExampleValues,
	offcanvas: offcanvasExampleValues,
	paginate: paginateExampleValues,
	footer: footerExampleValues
});
