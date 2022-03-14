import { readable, writable } from 'svelte/store';

import bannerDefinition from '@htmlbricks/hb-banner/release/webcomponent.type.d.json';
import areaCodeDefinition from '@htmlbricks/hb-area-code/release/webcomponent.type.d.json';
import offcanvasDefinition from '@htmlbricks/hb-offcanvas/release/webcomponent.type.d.json';
import layoutDefinition from '@htmlbricks/hb-layout/release/webcomponent.type.d.json';
import footerDefinition from '@htmlbricks/hb-footer/release/webcomponent.type.d.json';
import inputTextDefinition from '@htmlbricks/hb-input-text/release/webcomponent.type.d.json';
import paginateDefinition from '@htmlbricks/hb-paginate/release/webcomponent.type.d.json';

import authDefinition from '@htmlbricks/hb-auth/release/webcomponent.type.d.json';
import calendarEventsDefinition from '@htmlbricks/hb-calendar-events/release/webcomponent.type.d.json';
import cardVideoDefinition from '@htmlbricks/hb-card-video/release/webcomponent.type.d.json';
import chartjsDefinition from '@htmlbricks/hb-chartjs/release/webcomponent.type.d.json';
import checkoutDefinition from '@htmlbricks/hb-checkout/release/webcomponent.type.d.json';
import checkoutShoppingCartDefinition from '@htmlbricks/hb-checkout-shopping-cart/release/webcomponent.type.d.json';
import contactItemDefinition from '@htmlbricks/hb-contact-item/release/webcomponent.type.d.json';
import cookieLawBannerDefinition from '@htmlbricks/hb-cookie-law-banner/release/webcomponent.type.d.json';
import dialogDefinition from '@htmlbricks/hb-dialog/release/webcomponent.type.d.json';
import downloaderDefinition from '@htmlbricks/hb-downloader/release/webcomponent.type.d.json';
import dropdownSimpleDefinition from '@htmlbricks/hb-dropdown-simple/release/webcomponent.type.d.json';
import editorTinymceDefinition from '@htmlbricks/hb-editor-tinymce/release/webcomponent.type.d.json';
import editorVideoDefinition from '@htmlbricks/hb-editor-video/release/webcomponent.type.d.json';
import formDefinition from '@htmlbricks/hb-form/release/webcomponent.type.d.json';
import funnelDefinition from '@htmlbricks/hb-funnel/release/webcomponent.type.d.json';
import galleryVideoDefinition from '@htmlbricks/hb-gallery-video/release/webcomponent.type.d.json';
import gaugeDefinition from '@htmlbricks/hb-gauge/release/webcomponent.type.d.json';
import inputAreaDefinition from '@htmlbricks/hb-input-area/release/webcomponent.type.d.json';
import inputCheckboxDefinition from '@htmlbricks/hb-input-checkbox/release/webcomponent.type.d.json';
import inputDateDefinition from '@htmlbricks/hb-input-date/release/webcomponent.type.d.json';
import inputEmailDefinition from '@htmlbricks/hb-input-email/release/webcomponent.type.d.json';
import inputFileDefinition from '@htmlbricks/hb-input-file/release/webcomponent.type.d.json';
import inputNumberDefinition from '@htmlbricks/hb-input-number/release/webcomponent.type.d.json';
import inputRadioDefinition from '@htmlbricks/hb-input-radio/release/webcomponent.type.d.json';
import inputSelectDefinition from '@htmlbricks/hb-input-select/release/webcomponent.type.d.json';
import mapDefinition from '@htmlbricks/hb-map/release/webcomponent.type.d.json';
import modalVideoDefinition from '@htmlbricks/hb-modal-video/release/webcomponent.type.d.json';
import navbarDefinition from '@htmlbricks/hb-navbar/release/webcomponent.type.d.json';
import orderListDefinition from '@htmlbricks/hb-order-list/release/webcomponent.type.d.json';
import pageCheckoutDefinition from '@htmlbricks/hb-page-checkout/release/webcomponent.type.d.json';
import pageInvoiceDefinition from '@htmlbricks/hb-page-invoice/release/webcomponent.type.d.json';
import pageLoginregisterDefinition from '@htmlbricks/hb-page-loginregister/release/webcomponent.type.d.json';
import paymentPaypalDefinition from '@htmlbricks/hb-payment-paypal/release/webcomponent.type.d.json';
import playerLiveDefinition from '@htmlbricks/hb-player-live/release/webcomponent.type.d.json';
import productComparisonDefinition from '@htmlbricks/hb-product-comparison/release/webcomponent.type.d.json';
import rangeSliderDefinition from '@htmlbricks/hb-range-slider/release/webcomponent.type.d.json';
import sidenavLinkDefinition from '@htmlbricks/hb-sidenav-link/release/webcomponent.type.d.json';
import tableDefinition from '@htmlbricks/hb-table/release/webcomponent.type.d.json';
import toastDefinition from '@htmlbricks/hb-toast/release/webcomponent.type.d.json';

import {
	storybookArgs as bannerStorybookArgs,
	cssVars as bannerCssVars,
	cssParts as bannerCssParts,
	htmlSlots as bannerHtmlSlots,
	i18nLanguages as bannerI18nLanguages
} from '@htmlbricks/hb-banner/release/docs';
import {
	storybookArgs as areaCodeStorybookArgs,
	cssVars as areaCodeCssVars,
	cssParts as areaCodeCssParts,
	htmlSlots as areaCodeHtmlSlots,
	i18nLanguages as areaCodeI18nLanguages
} from '@htmlbricks/hb-area-code/release/docs';
import {
	storybookArgs as offcanvasStorybookArgs,
	cssVars as offcanvasCssVars,
	cssParts as offcanvasCssParts,
	htmlSlots as offcanvasHtmlSlots,
	i18nLanguages as offcanvasI18nLanguages
} from '@htmlbricks/hb-offcanvas/release/docs';
import {
	storybookArgs as layoutStorybookArgs,
	cssVars as layoutCssVars,
	cssParts as layoutCssParts,
	htmlSlots as layoutHtmlSlots,
	i18nLanguages as layoutI18nLanguages
} from '@htmlbricks/hb-layout/release/docs';
import {
	storybookArgs as footerStorybookArgs,
	cssVars as footerCssVars,
	cssParts as footerCssParts,
	htmlSlots as footerHtmlSlots,
	i18nLanguages as footerI18nLanguages
} from '@htmlbricks/hb-footer/release/docs';
import {
	storybookArgs as inputTextStorybookArgs,
	cssVars as inputTextCssVars,
	cssParts as inputTextCssParts,
	htmlSlots as inputTextHtmlSlots,
	i18nLanguages as inputTextI18nLanguages
} from '@htmlbricks/hb-input-text/release/docs';
import {
	storybookArgs as paginateStorybookArgs,
	cssVars as paginateCssVars,
	cssParts as paginateCssParts,
	htmlSlots as paginateHtmlSlots,
	i18nLanguages as paginateI18nLanguages
} from '@htmlbricks/hb-paginate/release/docs';

import {
	storybookArgs as authStorybookArgs,
	cssVars as authCssVars,
	cssParts as authCssParts,
	htmlSlots as authHtmlSlots,
	i18nLanguages as authI18nLanguages
} from '@htmlbricks/hb-auth/release/docs';

import {
	storybookArgs as calendarEventsStorybookArgs,
	cssVars as calendarEventsCssVars,
	cssParts as calendarEventsCssParts,
	htmlSlots as calendarEventsHtmlSlots,
	i18nLanguages as calendarEventsI18nLanguages
} from '@htmlbricks/hb-calendar-events/release/docs';
import {
	storybookArgs as cardVideoStorybookArgs,
	cssVars as cardVideoCssVars,
	cssParts as cardVideoCssParts,
	htmlSlots as cardVideoHtmlSlots,
	i18nLanguages as cardVideoI18nLanguages
} from '@htmlbricks/hb-card-video/release/docs';
import {
	storybookArgs as chartjsStorybookArgs,
	cssVars as chartjsCssVars,
	cssParts as chartjsCssParts,
	htmlSlots as chartjsHtmlSlots,
	i18nLanguages as chartjsI18nLanguages
} from '@htmlbricks/hb-chartjs/release/docs';
import {
	storybookArgs as checkoutStorybookArgs,
	cssVars as checkoutCssVars,
	cssParts as checkoutCssParts,
	htmlSlots as checkoutHtmlSlots,
	i18nLanguages as checkoutI18nLanguages
} from '@htmlbricks/hb-checkout/release/docs';
import {
	storybookArgs as checkoutShoppingCartStorybookArgs,
	cssVars as checkoutShoppingCartCssVars,
	cssParts as checkoutShoppingCartCssParts,
	htmlSlots as checkoutShoppingCartHtmlSlots,
	i18nLanguages as checkoutShoppingCartI18nLanguages
} from '@htmlbricks/hb-checkout-shopping-cart/release/docs';
import {
	storybookArgs as contactItemStorybookArgs,
	cssVars as contactItemCssVars,
	cssParts as contactItemCssParts,
	htmlSlots as contactItemHtmlSlots,
	i18nLanguages as contactItemI18nLanguages
} from '@htmlbricks/hb-contact-item/release/docs';
import {
	storybookArgs as cookieLawBannerStorybookArgs,
	cssVars as cookieLawBannerCssVars,
	cssParts as cookieLawBannerCssParts,
	htmlSlots as cookieLawBannerHtmlSlots,
	i18nLanguages as cookieLawI18nLanguages
} from '@htmlbricks/hb-cookie-law-banner/release/docs';
import {
	storybookArgs as dialogStorybookArgs,
	cssVars as dialogCssVars,
	cssParts as dialogCssParts,
	htmlSlots as dialogHtmlSlots,
	i18nLanguages as dialogI18nLanguages
} from '@htmlbricks/hb-dialog/release/docs';
import {
	storybookArgs as downloaderStorybookArgs,
	cssVars as downloaderCssVars,
	cssParts as downloaderCssParts,
	htmlSlots as downloaderHtmlSlots,
	i18nLanguages as downloaderI18nLanguages
} from '@htmlbricks/hb-downloader/release/docs';
import {
	storybookArgs as dropdownSimpleStorybookArgs,
	cssVars as dropdownSimpleCssVars,
	cssParts as dropdownSimpleCssParts,
	htmlSlots as dropdownSimpleHtmlSlots,
	i18nLanguages as dropdownSimpleI18nLanguages
} from '@htmlbricks/hb-dropdown-simple/release/docs';
import {
	storybookArgs as editorTinymceStorybookArgs,
	cssVars as editorTinymceCssVars,
	cssParts as editorTinymceCssParts,
	htmlSlots as editorTinymceHtmlSlots,
	i18nLanguages as editorTinymceI18nLanguages
} from '@htmlbricks/hb-editor-tinymce/release/docs';
import {
	storybookArgs as editorVideoStorybookArgs,
	cssVars as editorVideoCssVars,
	cssParts as editorVideoCssParts,
	htmlSlots as editorVideoHtmlSlots,
	i18nLanguages as editorVideoI18nLanguages
} from '@htmlbricks/hb-editor-video/release/docs';

import {
	storybookArgs as formStorybookArgs,
	cssVars as formCssVars,
	cssParts as formCssParts,
	htmlSlots as formHtmlSlots,
	i18nLanguages as formI18nLanguages
} from '@htmlbricks/hb-form/release/docs';
import {
	storybookArgs as funnelStorybookArgs,
	cssVars as funnelCssVars,
	cssParts as funnelCssParts,
	htmlSlots as funnelHtmlSlots,
	i18nLanguages as funnelI18nLanguages
} from '@htmlbricks/hb-funnel/release/docs';
import {
	storybookArgs as galleryVideoStorybookArgs,
	cssVars as galleryVideoCssVars,
	cssParts as galleryVideoCssParts,
	htmlSlots as galleryVideoHtmlSlots,
	i18nLanguages as galleryVideoI18nLanguages
} from '@htmlbricks/hb-gallery-video/release/docs';
import {
	storybookArgs as gaugeStorybookArgs,
	cssVars as gaugeCssVars,
	cssParts as gaugeCssParts,
	htmlSlots as gaugeHtmlSlots,
	i18nLanguages as gaugeI18nLanguages
} from '@htmlbricks/hb-gauge/release/docs';
import {
	storybookArgs as inputAreaStorybookArgs,
	cssVars as inputAreaCssVars,
	cssParts as inputAreaCssParts,
	htmlSlots as inputAreaHtmlSlots,
	i18nLanguages as inputAreaI18nLanguages
} from '@htmlbricks/hb-input-area/release/docs';
import {
	storybookArgs as inputCheckboxStorybookArgs,
	cssVars as inputCheckboxCssVars,
	cssParts as inputCheckboxCssParts,
	htmlSlots as inputCheckboxHtmlSlots,
	i18nLanguages as inputCheckboxI18nLanguages
} from '@htmlbricks/hb-input-checkbox/release/docs';
import {
	storybookArgs as inputDateStorybookArgs,
	cssVars as inputDateCssVars,
	cssParts as inputDateCssParts,
	htmlSlots as inputDateHtmlSlots,
	i18nLanguages as inputDateI18nLanguages
} from '@htmlbricks/hb-input-date/release/docs';
import {
	storybookArgs as inputEmailStorybookArgs,
	cssVars as inputEmailCssVars,
	cssParts as inputEmailCssParts,
	htmlSlots as inputEmailHtmlSlots,
	i18nLanguages as inputEmailI18nLanguages
} from '@htmlbricks/hb-input-email/release/docs';
import {
	storybookArgs as inputFileStorybookArgs,
	cssVars as inputFileCssVars,
	cssParts as inputFileCssParts,
	htmlSlots as inputFileHtmlSlots,
	i18nLanguages as inputFileI18nLanguages
} from '@htmlbricks/hb-input-file/release/docs';
import {
	storybookArgs as inputNumberStorybookArgs,
	cssVars as inputNumberCssVars,
	cssParts as inputNumberCssParts,
	htmlSlots as inputNumberHtmlSlots,
	i18nLanguages as inputNumberI18nLanguages
} from '@htmlbricks/hb-input-number/release/docs';
import {
	storybookArgs as inputRadioStorybookArgs,
	cssVars as inputRadioCssVars,
	cssParts as inputRadioCssParts,
	htmlSlots as inputRadioHtmlSlots,
	i18nLanguages as inputRadioI18nLanguages
} from '@htmlbricks/hb-input-radio/release/docs';
import {
	storybookArgs as inputSelectStorybookArgs,
	cssVars as inputSelectCssVars,
	cssParts as inputSelectCssParts,
	htmlSlots as inputSelectHtmlSlots,
	i18nLanguages as inputSelectI18nLanguages
} from '@htmlbricks/hb-input-select/release/docs';

import {
	storybookArgs as mapStorybookArgs,
	cssVars as mapCssVars,
	cssParts as mapCssParts,
	htmlSlots as mapHtmlSlots,
	i18nLanguages as mapI18nLanguages
} from '@htmlbricks/hb-map/release/docs';
import {
	storybookArgs as modalVideoStorybookArgs,
	cssVars as modalVideoCssVars,
	cssParts as modalVideoCssParts,
	htmlSlots as modalVideoHtmlSlots,
	i18nLanguages as modalVideoI18nLanguages
} from '@htmlbricks/hb-modal-video/release/docs';
import {
	storybookArgs as navbarStorybookArgs,
	cssVars as navbarCssVars,
	cssParts as navbarCssParts,
	htmlSlots as navbarHtmlSlots,
	i18nLanguages as navbarI18nLanguages
} from '@htmlbricks/hb-navbar/release/docs';

import {
	storybookArgs as orderListStorybookArgs,
	cssVars as orderListCssVars,
	cssParts as orderListCssParts,
	htmlSlots as orderListHtmlSlots,
	i18nLanguages as orderListI18nLanguages
} from '@htmlbricks/hb-order-list/release/docs';
import {
	storybookArgs as pageCheckoutStorybookArgs,
	cssVars as pageCheckoutCssVars,
	cssParts as pageCheckoutCssParts,
	htmlSlots as pageCheckoutHtmlSlots,
	i18nLanguages as pageCheckoutI18nLanguages
} from '@htmlbricks/hb-page-checkout/release/docs';
import {
	storybookArgs as pageInvoiceStorybookArgs,
	cssVars as pageInvoiceCssVars,
	cssParts as pageInvoiceCssParts,
	htmlSlots as pageInvoiceHtmlSlots,
	i18nLanguages as pageInvoiceI18nLanguages
} from '@htmlbricks/hb-page-invoice/release/docs';

import {
	storybookArgs as pageLoginregisterStorybookArgs,
	cssVars as pageLoginregisterCssVars,
	cssParts as pageLoginregisterCssParts,
	htmlSlots as pageLoginregisterHtmlSlots,
	i18nLanguages as pageLoginregisterI18nLanguages
} from '@htmlbricks/hb-page-loginregister/release/docs';

import {
	storybookArgs as paymentPaypalStorybookArgs,
	cssVars as paymentPaypalCssVars,
	cssParts as paymentPaypalCssParts,
	htmlSlots as paymentPaypalHtmlSlots,
	i18nLanguages as paymentPaypalI18nLanguages
} from '@htmlbricks/hb-payment-paypal/release/docs';

import {
	storybookArgs as productComparisonStorybookArgs,
	cssVars as productComparisonCssVars,
	cssParts as productComparisonCssParts,
	htmlSlots as productComparisonHtmlSlots,
	i18nLanguages as productComparisonI18nLanguages
} from '@htmlbricks/hb-product-comparison/release/docs';
import {
	storybookArgs as rangeSliderStorybookArgs,
	cssVars as rangeSliderCssVars,
	cssParts as rangeSliderCssParts,
	htmlSlots as rangeSliderHtmlSlots,
	i18nLanguages as rangeSliderI18nLanguages
} from '@htmlbricks/hb-range-slider/release/docs';
import {
	storybookArgs as sidenavLinkStorybookArgs,
	cssVars as sidenavLinkCssVars,
	cssParts as sidenavLinkCssParts,
	htmlSlots as sidenavLinkHtmlSlots,
	i18nLanguages as sidenavLinkI18nLanguages
} from '@htmlbricks/hb-sidenav-link/release/docs';
import {
	storybookArgs as tableStorybookArgs,
	cssVars as tableCssVars,
	cssParts as tableCssParts,
	htmlSlots as tableHtmlSlots,
	i18nLanguages as tableHtmlI18nLanguages
} from '@htmlbricks/hb-table/release/docs';
import {
	storybookArgs as toastStorybookArgs,
	cssVars as toastCssVars,
	cssParts as toastCssParts,
	htmlSlots as toastHtmlSlots,
	i18nLanguages as toastHtmlI18nLanguages
} from '@htmlbricks/hb-toast/release/docs';
// TODO: SUPER TRIKY ERROR
// import {
// 	storybookArgs as playerLiveStorybookArgs,
// 	cssVars as playerLiveCssVars,
// 	cssParts as playerLiveCssParts,
// 	htmlSlots as playerLiveHtmlSlots,
// 	i18nLanguages as playerLiveI18nLanguages
// } from '@htmlbricks/hb-player-live/release/docs';
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
	},

	{
		definition: authDefinition,
		storybookArgs: authStorybookArgs,
		name: 'auth',
		category: 'basic',
		cssVars: authCssVars,
		cssParts: authCssParts,
		htmlSlots: authHtmlSlots
	},
	{
		definition: calendarEventsDefinition,
		storybookArgs: calendarEventsStorybookArgs,
		name: 'calendar-events',
		category: 'basic',
		cssVars: calendarEventsCssVars,
		cssParts: calendarEventsCssParts,
		htmlSlots: calendarEventsHtmlSlots
	},

	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		cssVars: paginateCssVars,
		cssParts: paginateCssParts,
		htmlSlots: paginateHtmlSlots
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
