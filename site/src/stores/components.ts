import { readable, type Readable } from 'svelte/store';
import type { HtmlSlot, i18nLang, StyleSetup } from '@htmlbricks/hb-jsutils';

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
import inputColorDefinition from '@htmlbricks/hb-input-color/release/webcomponent.type.d.json';
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
	htmlSlots as bannerHtmlSlots,
	i18nLanguages as bannerI18nLanguages,
	styleSetup as bannerStyleSetup
} from '@htmlbricks/hb-banner/release/docs';
import {
	storybookArgs as areaCodeStorybookArgs,
	htmlSlots as areaCodeHtmlSlots,
	i18nLanguages as areaCodeI18nLanguages,
	styleSetup as areaCodeStyleSetup
} from '@htmlbricks/hb-area-code/release/docs';
import {
	storybookArgs as offcanvasStorybookArgs,
	htmlSlots as offcanvasHtmlSlots,
	i18nLanguages as offcanvasI18nLanguages,
	styleSetup as offcanvasStyleSetup
} from '@htmlbricks/hb-offcanvas/release/docs';
import {
	storybookArgs as layoutStorybookArgs,
	htmlSlots as layoutHtmlSlots,
	i18nLanguages as layoutI18nLanguages,
	styleSetup as layoutStyleSetup
} from '@htmlbricks/hb-layout/release/docs';
import {
	storybookArgs as footerStorybookArgs,
	htmlSlots as footerHtmlSlots,
	i18nLanguages as footerI18nLanguages,
	styleSetup as footerStyleSetup
} from '@htmlbricks/hb-footer/release/docs';
import {
	storybookArgs as inputTextStorybookArgs,
	htmlSlots as inputTextHtmlSlots,
	i18nLanguages as inputTextI18nLanguages,
	styleSetup as inputTextStyleSetup
} from '@htmlbricks/hb-input-text/release/docs';
import {
	storybookArgs as paginateStorybookArgs,
	htmlSlots as paginateHtmlSlots,
	i18nLanguages as paginateI18nLanguages,
	styleSetup as paginateStyleSetup
} from '@htmlbricks/hb-paginate/release/docs';

import {
	storybookArgs as authStorybookArgs,
	htmlSlots as authHtmlSlots,
	i18nLanguages as authI18nLanguages,
	styleSetup as authStyleSetup
} from '@htmlbricks/hb-auth/release/docs';

import {
	storybookArgs as calendarEventsStorybookArgs,
	htmlSlots as calendarEventsHtmlSlots,
	i18nLanguages as calendarEventsI18nLanguages,
	styleSetup as calendarEventsStyleSetup
} from '@htmlbricks/hb-calendar-events/release/docs';
import {
	storybookArgs as cardVideoStorybookArgs,
	htmlSlots as cardVideoHtmlSlots,
	i18nLanguages as cardVideoI18nLanguages,
	styleSetup as cardVideoStyleSetup
} from '@htmlbricks/hb-card-video/release/docs';
import {
	storybookArgs as chartjsStorybookArgs,
	htmlSlots as chartjsHtmlSlots,
	i18nLanguages as chartjsI18nLanguages,
	styleSetup as chartjsStyleSetup
} from '@htmlbricks/hb-chartjs/release/docs';
import {
	storybookArgs as checkoutStorybookArgs,
	htmlSlots as checkoutHtmlSlots,
	i18nLanguages as checkoutI18nLanguages,
	styleSetup as checkoutStyleSetup
} from '@htmlbricks/hb-checkout/release/docs';
import {
	storybookArgs as checkoutShoppingCartStorybookArgs,
	htmlSlots as checkoutShoppingCartHtmlSlots,
	i18nLanguages as checkoutShoppingCartI18nLanguages,
	styleSetup as checkoutShoppingCartStyleSetup
} from '@htmlbricks/hb-checkout-shopping-cart/release/docs';
import {
	storybookArgs as contactItemStorybookArgs,
	htmlSlots as contactItemHtmlSlots,
	i18nLanguages as contactItemI18nLanguages,
	styleSetup as contactItemStyleSetup
} from '@htmlbricks/hb-contact-item/release/docs';
import {
	storybookArgs as cookieLawBannerStorybookArgs,
	htmlSlots as cookieLawBannerHtmlSlots,
	i18nLanguages as cookieLawBannerI18nLanguages,
	styleSetup as cookieLawBannerStyleSetup
} from '@htmlbricks/hb-cookie-law-banner/release/docs';
import {
	storybookArgs as dialogStorybookArgs,
	htmlSlots as dialogHtmlSlots,
	i18nLanguages as dialogI18nLanguages,
	styleSetup as dialogStyleSetup
} from '@htmlbricks/hb-dialog/release/docs';
import {
	storybookArgs as downloaderStorybookArgs,
	htmlSlots as downloaderHtmlSlots,
	i18nLanguages as downloaderI18nLanguages,
	styleSetup as downloaderStyleSetup
} from '@htmlbricks/hb-downloader/release/docs';
import {
	storybookArgs as dropdownSimpleStorybookArgs,
	htmlSlots as dropdownSimpleHtmlSlots,
	i18nLanguages as dropdownSimpleI18nLanguages,
	styleSetup as dropdownSimpleStyleSetup
} from '@htmlbricks/hb-dropdown-simple/release/docs';
import {
	storybookArgs as editorTinymceStorybookArgs,
	htmlSlots as editorTinymceHtmlSlots,
	i18nLanguages as editorTinymceI18nLanguages,
	styleSetup as editorTinymceStyleSetup
} from '@htmlbricks/hb-editor-tinymce/release/docs';
import {
	storybookArgs as editorVideoStorybookArgs,
	htmlSlots as editorVideoHtmlSlots,
	i18nLanguages as editorVideoI18nLanguages,
	styleSetup as editorVideoStyleSetup
} from '@htmlbricks/hb-editor-video/release/docs';

import {
	storybookArgs as formStorybookArgs,
	htmlSlots as formHtmlSlots,
	i18nLanguages as formI18nLanguages,
	styleSetup as formStyleSetup
} from '@htmlbricks/hb-form/release/docs';
import {
	storybookArgs as funnelStorybookArgs,
	htmlSlots as funnelHtmlSlots,
	i18nLanguages as funnelI18nLanguages,
	styleSetup as funnelStyleSetup
} from '@htmlbricks/hb-funnel/release/docs';
import {
	storybookArgs as galleryVideoStorybookArgs,
	htmlSlots as galleryVideoHtmlSlots,
	i18nLanguages as galleryVideoI18nLanguages,
	styleSetup as galleryVideoStyleSetup
} from '@htmlbricks/hb-gallery-video/release/docs';
import {
	storybookArgs as gaugeStorybookArgs,
	htmlSlots as gaugeHtmlSlots,
	i18nLanguages as gaugeI18nLanguages,
	styleSetup as gaugeStyleSetup
} from '@htmlbricks/hb-gauge/release/docs';
import {
	storybookArgs as inputAreaStorybookArgs,
	htmlSlots as inputAreaHtmlSlots,
	i18nLanguages as inputAreaI18nLanguages,
	styleSetup as inputAreaStyleSetup
} from '@htmlbricks/hb-input-area/release/docs';
import {
	storybookArgs as inputColorStorybookArgs,
	htmlSlots as inputColorHtmlSlots,
	i18nLanguages as inputColorI18nLanguages,
	styleSetup as inputColorStyleSetup
} from '@htmlbricks/hb-input-color/release/docs';
import {
	storybookArgs as inputCheckboxStorybookArgs,
	htmlSlots as inputCheckboxHtmlSlots,
	i18nLanguages as inputCheckboxI18nLanguages,
	styleSetup as inputCheckboxStyleSetup
} from '@htmlbricks/hb-input-checkbox/release/docs';
import {
	storybookArgs as inputDateStorybookArgs,
	htmlSlots as inputDateHtmlSlots,
	i18nLanguages as inputDateI18nLanguages,
	styleSetup as inputDateStyleSetup
} from '@htmlbricks/hb-input-date/release/docs';
import {
	storybookArgs as inputEmailStorybookArgs,
	htmlSlots as inputEmailHtmlSlots,
	i18nLanguages as inputEmailI18nLanguages,
	styleSetup as inputEmailStyleSetup
} from '@htmlbricks/hb-input-email/release/docs';
import {
	storybookArgs as inputFileStorybookArgs,
	htmlSlots as inputFileHtmlSlots,
	i18nLanguages as inputFileI18nLanguages,
	styleSetup as inputFileStyleSetup
} from '@htmlbricks/hb-input-file/release/docs';
import {
	storybookArgs as inputNumberStorybookArgs,
	htmlSlots as inputNumberHtmlSlots,
	i18nLanguages as inputNumberI18nLanguages,
	styleSetup as inputNumberStyleSetup
} from '@htmlbricks/hb-input-number/release/docs';
import {
	storybookArgs as inputRadioStorybookArgs,
	htmlSlots as inputRadioHtmlSlots,
	i18nLanguages as inputRadioI18nLanguages,
	styleSetup as inputRadioStyleSetup
} from '@htmlbricks/hb-input-radio/release/docs';
import {
	storybookArgs as inputSelectStorybookArgs,
	htmlSlots as inputSelectHtmlSlots,
	i18nLanguages as inputSelectI18nLanguages,
	styleSetup as inputSelectStyleSetup
} from '@htmlbricks/hb-input-select/release/docs';

import {
	storybookArgs as mapStorybookArgs,
	htmlSlots as mapHtmlSlots,
	i18nLanguages as mapI18nLanguages,
	styleSetup as mapStyleSetup
} from '@htmlbricks/hb-map/release/docs';
import {
	storybookArgs as modalVideoStorybookArgs,
	htmlSlots as modalVideoHtmlSlots,
	i18nLanguages as modalVideoI18nLanguages,
	styleSetup as modalVideoStyleSetup
} from '@htmlbricks/hb-modal-video/release/docs';
import {
	storybookArgs as navbarStorybookArgs,
	htmlSlots as navbarHtmlSlots,
	i18nLanguages as navbarI18nLanguages,
	styleSetup as navbarStyleSetup
} from '@htmlbricks/hb-navbar/release/docs';

import {
	storybookArgs as orderListStorybookArgs,
	htmlSlots as orderListHtmlSlots,
	i18nLanguages as orderListI18nLanguages,
	styleSetup as orderListStyleSetup
} from '@htmlbricks/hb-order-list/release/docs';
import {
	storybookArgs as pageCheckoutStorybookArgs,
	htmlSlots as pageCheckoutHtmlSlots,
	i18nLanguages as pageCheckoutI18nLanguages,
	styleSetup as pageCheckoutStyleSetup
} from '@htmlbricks/hb-page-checkout/release/docs';
import {
	storybookArgs as pageInvoiceStorybookArgs,
	htmlSlots as pageInvoiceHtmlSlots,
	i18nLanguages as pageInvoiceI18nLanguages,
	styleSetup as pageInvoiceStyleSetup
} from '@htmlbricks/hb-page-invoice/release/docs';

import {
	storybookArgs as pageLoginregisterStorybookArgs,
	htmlSlots as pageLoginregisterHtmlSlots,
	i18nLanguages as pageLoginregisterI18nLanguages,
	styleSetup as pageLoginregisterStyleSetup
} from '@htmlbricks/hb-page-loginregister/release/docs';

import {
	storybookArgs as paymentPaypalStorybookArgs,
	htmlSlots as paymentPaypalHtmlSlots,
	i18nLanguages as paymentPaypalI18nLanguages,
	styleSetup as paymentPaypalStyleSetup
} from '@htmlbricks/hb-payment-paypal/release/docs';

import {
	storybookArgs as productComparisonStorybookArgs,
	htmlSlots as productComparisonHtmlSlots,
	i18nLanguages as productComparisonI18nLanguages,
	styleSetup as productComparisonStyleSetup
} from '@htmlbricks/hb-product-comparison/release/docs';
import {
	storybookArgs as rangeSliderStorybookArgs,
	htmlSlots as rangeSliderHtmlSlots,
	i18nLanguages as rangeSliderI18nLanguages,
	styleSetup as rangeSliderStyleSetup
} from '@htmlbricks/hb-range-slider/release/docs';
import {
	storybookArgs as sidenavLinkStorybookArgs,
	htmlSlots as sidenavLinkHtmlSlots,
	i18nLanguages as sidenavLinkI18nLanguages,
	styleSetup as sidenavLinkStyleSetup
} from '@htmlbricks/hb-sidenav-link/release/docs';
import {
	storybookArgs as tableStorybookArgs,
	htmlSlots as tableHtmlSlots,
	i18nLanguages as tableI18nLanguages,
	styleSetup as tableStyleSetup
} from '@htmlbricks/hb-table/release/docs';
import {
	storybookArgs as toastStorybookArgs,
	htmlSlots as toastHtmlSlots,
	i18nLanguages as toastI18nLanguages,
	styleSetup as toastStyleSetup
} from '@htmlbricks/hb-toast/release/docs';

// SUPER TRIKY ERROR IF IMPORT FROM REPO!!
import {
	storybookArgs as playerLiveStorybookArgs,
	htmlSlots as playerLiveHtmlSlots,
	i18nLanguages as playerLiveI18nLanguages,
	styleSetup as playerLiveStyleSetup
} from '../../node_modules/@htmlbricks/hb-player-live/release/docs';

export const allComponentsMetas: Readable<
	{
		definition: any;
		storybookArgs: any;
		name: string;
		category: string;
		styleSetup: StyleSetup;
		htmlSlots: HtmlSlot[];
		i18n: i18nLang[];
	}[]
> = readable([
	{
		definition: bannerDefinition,
		storybookArgs: bannerStorybookArgs,
		name: 'banner',
		category: 'basic',
		styleSetup: bannerStyleSetup,
		htmlSlots: bannerHtmlSlots,
		i18n: bannerI18nLanguages
	},
	{
		definition: areaCodeDefinition,
		storybookArgs: areaCodeStorybookArgs,
		name: 'area-code',
		category: 'dev',
		styleSetup: areaCodeStyleSetup,
		htmlSlots: areaCodeHtmlSlots,
		i18n: areaCodeI18nLanguages
	},
	{
		definition: offcanvasDefinition,
		storybookArgs: offcanvasStorybookArgs,
		name: 'offcanvas',
		category: 'layout',
		styleSetup: offcanvasStyleSetup,
		htmlSlots: offcanvasHtmlSlots,
		i18n: offcanvasI18nLanguages
	},
	{
		definition: layoutDefinition,
		storybookArgs: layoutStorybookArgs,
		name: 'layout',
		category: 'layout',
		styleSetup: layoutStyleSetup,
		htmlSlots: layoutHtmlSlots,
		i18n: layoutI18nLanguages
	},
	{
		definition: footerDefinition,
		storybookArgs: footerStorybookArgs,
		name: 'footer',
		category: 'layout',
		styleSetup: footerStyleSetup,
		htmlSlots: footerHtmlSlots,
		i18n: footerI18nLanguages
	},
	{
		definition: inputTextDefinition,
		storybookArgs: inputTextStorybookArgs,
		name: 'input-text',
		category: 'input',
		styleSetup: inputTextStyleSetup,
		htmlSlots: inputTextHtmlSlots,
		i18n: inputTextI18nLanguages
	},
	{
		definition: paginateDefinition,
		storybookArgs: paginateStorybookArgs,
		name: 'paginate',
		category: 'basic',
		styleSetup: paginateStyleSetup,
		htmlSlots: paginateHtmlSlots,
		i18n: paginateI18nLanguages
	},

	{
		definition: authDefinition,
		storybookArgs: authStorybookArgs,
		name: 'auth',
		category: 'components',
		styleSetup: authStyleSetup,
		htmlSlots: authHtmlSlots,
		i18n: authI18nLanguages
	},
	{
		definition: calendarEventsDefinition,
		storybookArgs: calendarEventsStorybookArgs,
		name: 'calendar-events',
		category: 'components',
		styleSetup: calendarEventsStyleSetup,
		htmlSlots: calendarEventsHtmlSlots,
		i18n: calendarEventsI18nLanguages
	},

	{
		definition: cardVideoDefinition,
		storybookArgs: cardVideoStorybookArgs,
		name: 'card-video',
		category: 'components',
		styleSetup: cardVideoStyleSetup,
		htmlSlots: cardVideoHtmlSlots,
		i18n: cardVideoI18nLanguages
	},

	{
		definition: chartjsDefinition,
		storybookArgs: chartjsStorybookArgs,
		name: 'chartjs',
		category: 'graph',
		styleSetup: chartjsStyleSetup,
		htmlSlots: chartjsHtmlSlots,
		i18n: chartjsI18nLanguages
	},
	{
		definition: checkoutDefinition,
		storybookArgs: checkoutStorybookArgs,
		name: 'checkout',
		category: 'payment',
		styleSetup: checkoutStyleSetup,
		htmlSlots: checkoutHtmlSlots,
		i18n: checkoutI18nLanguages
	},
	{
		definition: checkoutShoppingCartDefinition,
		storybookArgs: checkoutShoppingCartStorybookArgs,
		name: 'checkout-shopping-cart',
		category: 'payment',
		styleSetup: checkoutShoppingCartStyleSetup,
		htmlSlots: checkoutShoppingCartHtmlSlots,
		i18n: checkoutShoppingCartI18nLanguages
	},
	{
		definition: contactItemDefinition,
		storybookArgs: contactItemStorybookArgs,
		name: 'contact-item',
		category: 'basic',
		styleSetup: contactItemStyleSetup,
		htmlSlots: contactItemHtmlSlots,
		i18n: contactItemI18nLanguages
	},
	{
		definition: cookieLawBannerDefinition,
		storybookArgs: cookieLawBannerStorybookArgs,
		name: 'cookie-law-banner',
		category: 'layout',
		styleSetup: cookieLawBannerStyleSetup,
		htmlSlots: cookieLawBannerHtmlSlots,
		i18n: cookieLawBannerI18nLanguages
	},
	{
		definition: dialogDefinition,
		storybookArgs: dialogStorybookArgs,
		name: 'dialog',
		category: 'basic',
		styleSetup: dialogStyleSetup,
		htmlSlots: dialogHtmlSlots,
		i18n: dialogI18nLanguages
	},
	{
		definition: downloaderDefinition,
		storybookArgs: downloaderStorybookArgs,
		name: 'downloader',
		category: 'basic',
		styleSetup: downloaderStyleSetup,
		htmlSlots: downloaderHtmlSlots,
		i18n: downloaderI18nLanguages
	},

	{
		definition: dropdownSimpleDefinition,
		storybookArgs: dropdownSimpleStorybookArgs,
		name: 'dropdown-simple',
		category: 'basic',
		styleSetup: dropdownSimpleStyleSetup,
		htmlSlots: dropdownSimpleHtmlSlots,
		i18n: dropdownSimpleI18nLanguages
	},
	{
		definition: editorTinymceDefinition,
		storybookArgs: editorTinymceStorybookArgs,
		name: 'editor-tinymce',
		category: 'editor',
		styleSetup: editorTinymceStyleSetup,
		htmlSlots: editorTinymceHtmlSlots,
		i18n: editorTinymceI18nLanguages
	},
	{
		definition: editorVideoDefinition,
		storybookArgs: editorVideoStorybookArgs,
		name: 'editor-video',
		category: 'editor',
		styleSetup: editorVideoStyleSetup,
		htmlSlots: editorVideoHtmlSlots,
		i18n: editorVideoI18nLanguages
	},
	{
		definition: formDefinition,
		storybookArgs: formStorybookArgs,
		name: 'form',
		category: 'form',
		styleSetup: formStyleSetup,
		htmlSlots: formHtmlSlots,
		i18n: formI18nLanguages
	},
	{
		definition: funnelDefinition,
		storybookArgs: funnelStorybookArgs,
		name: 'funnel',
		category: 'form',
		styleSetup: funnelStyleSetup,
		htmlSlots: funnelHtmlSlots,
		i18n: funnelI18nLanguages
	},
	{
		definition: galleryVideoDefinition,
		storybookArgs: galleryVideoStorybookArgs,
		name: 'gallery-video',
		category: 'components',
		styleSetup: galleryVideoStyleSetup,
		htmlSlots: galleryVideoHtmlSlots,
		i18n: galleryVideoI18nLanguages
	},
	{
		definition: gaugeDefinition,
		storybookArgs: gaugeStorybookArgs,
		name: 'gauge',
		category: 'graph',
		styleSetup: gaugeStyleSetup,
		htmlSlots: gaugeHtmlSlots,
		i18n: gaugeI18nLanguages
	},
	{
		definition: inputAreaDefinition,
		storybookArgs: inputAreaStorybookArgs,
		name: 'input-area',
		category: 'input',
		styleSetup: inputAreaStyleSetup,
		htmlSlots: inputAreaHtmlSlots,
		i18n: inputAreaI18nLanguages
	},
	{
		definition: inputColorDefinition,
		storybookArgs: inputColorStorybookArgs,
		name: 'input-color',
		category: 'input',
		styleSetup: inputColorStyleSetup,
		htmlSlots: inputColorHtmlSlots,
		i18n: inputColorI18nLanguages
	},
	{
		definition: inputCheckboxDefinition,
		storybookArgs: inputCheckboxStorybookArgs,
		name: 'input-checkbox',
		category: 'input',
		styleSetup: inputCheckboxStyleSetup,
		htmlSlots: inputCheckboxHtmlSlots,
		i18n: inputCheckboxI18nLanguages
	},
	{
		definition: inputDateDefinition,
		storybookArgs: inputDateStorybookArgs,
		name: 'input-date',
		category: 'input',
		styleSetup: inputDateStyleSetup,
		htmlSlots: inputDateHtmlSlots,
		i18n: inputDateI18nLanguages
	},
	{
		definition: inputEmailDefinition,
		storybookArgs: inputEmailStorybookArgs,
		name: 'input-email',
		category: 'input',
		styleSetup: inputEmailStyleSetup,
		htmlSlots: inputEmailHtmlSlots,
		i18n: inputEmailI18nLanguages
	},
	{
		definition: inputFileDefinition,
		storybookArgs: inputFileStorybookArgs,
		name: 'input-file',
		category: 'input',
		styleSetup: inputFileStyleSetup,
		htmlSlots: inputFileHtmlSlots,
		i18n: inputFileI18nLanguages
	},
	{
		definition: inputNumberDefinition,
		storybookArgs: inputNumberStorybookArgs,
		name: 'input-number',
		category: 'input',
		styleSetup: inputNumberStyleSetup,
		htmlSlots: inputNumberHtmlSlots,
		i18n: inputNumberI18nLanguages
	},
	{
		definition: inputRadioDefinition,
		storybookArgs: inputRadioStorybookArgs,
		name: 'input-radio',
		category: 'input',
		styleSetup: inputRadioStyleSetup,
		htmlSlots: inputRadioHtmlSlots,
		i18n: inputRadioI18nLanguages
	},
	{
		definition: inputSelectDefinition,
		storybookArgs: inputSelectStorybookArgs,
		name: 'input-select',
		category: 'input',
		styleSetup: inputSelectStyleSetup,
		htmlSlots: inputSelectHtmlSlots,
		i18n: inputSelectI18nLanguages
	},
	{
		definition: mapDefinition,
		storybookArgs: mapStorybookArgs,
		name: 'map',
		category: 'graph',
		styleSetup: mapStyleSetup,
		htmlSlots: mapHtmlSlots,
		i18n: mapI18nLanguages
	},
	{
		definition: modalVideoDefinition,
		storybookArgs: modalVideoStorybookArgs,
		name: 'modal-video',
		category: 'basic',
		styleSetup: modalVideoStyleSetup,
		htmlSlots: modalVideoHtmlSlots,
		i18n: modalVideoI18nLanguages
	},
	{
		definition: navbarDefinition,
		storybookArgs: navbarStorybookArgs,
		name: 'navbar',
		category: 'layout',
		styleSetup: navbarStyleSetup,
		htmlSlots: navbarHtmlSlots,
		i18n: navbarI18nLanguages
	},
	{
		definition: orderListDefinition,
		storybookArgs: orderListStorybookArgs,
		name: 'order-list',
		category: 'basic',
		styleSetup: orderListStyleSetup,
		htmlSlots: orderListHtmlSlots,
		i18n: orderListI18nLanguages
	},
	{
		definition: pageCheckoutDefinition,
		storybookArgs: pageCheckoutStorybookArgs,
		name: 'page-checkout',
		category: 'page',
		styleSetup: pageCheckoutStyleSetup,
		htmlSlots: pageCheckoutHtmlSlots,
		i18n: pageCheckoutI18nLanguages
	},
	{
		definition: pageInvoiceDefinition,
		storybookArgs: pageInvoiceStorybookArgs,
		name: 'page-invoice',
		category: 'page',
		styleSetup: pageInvoiceStyleSetup,
		htmlSlots: pageInvoiceHtmlSlots,
		i18n: pageInvoiceI18nLanguages
	},
	{
		definition: pageLoginregisterDefinition,
		storybookArgs: pageLoginregisterStorybookArgs,
		name: 'page-loginregister',
		category: 'page',
		styleSetup: pageLoginregisterStyleSetup,
		htmlSlots: pageLoginregisterHtmlSlots,
		i18n: pageLoginregisterI18nLanguages
	},
	{
		definition: paymentPaypalDefinition,
		storybookArgs: paymentPaypalStorybookArgs,
		name: 'payment-paypal',
		category: 'payment',
		styleSetup: paymentPaypalStyleSetup,
		htmlSlots: paymentPaypalHtmlSlots,
		i18n: paymentPaypalI18nLanguages
	},
	{
		definition: playerLiveDefinition,
		storybookArgs: playerLiveStorybookArgs,
		name: 'player-live',
		category: 'basic',
		styleSetup: playerLiveStyleSetup,
		htmlSlots: playerLiveHtmlSlots,
		i18n: playerLiveI18nLanguages
	},
	{
		definition: productComparisonDefinition,
		storybookArgs: productComparisonStorybookArgs,
		name: 'product-comparison',
		category: 'components',
		styleSetup: productComparisonStyleSetup,
		htmlSlots: productComparisonHtmlSlots,
		i18n: productComparisonI18nLanguages
	},
	{
		definition: rangeSliderDefinition,
		storybookArgs: rangeSliderStorybookArgs,
		name: 'range-slider',
		category: 'basic',
		styleSetup: rangeSliderStyleSetup,
		htmlSlots: rangeSliderHtmlSlots,
		i18n: rangeSliderI18nLanguages
	},
	{
		definition: sidenavLinkDefinition,
		storybookArgs: sidenavLinkStorybookArgs,
		name: 'sidenav-link',
		category: 'basic',
		styleSetup: sidenavLinkStyleSetup,
		htmlSlots: sidenavLinkHtmlSlots,
		i18n: sidenavLinkI18nLanguages
	},
	{
		definition: tableDefinition,
		storybookArgs: tableStorybookArgs,
		name: 'table',
		category: 'table',
		styleSetup: tableStyleSetup,
		htmlSlots: tableHtmlSlots,
		i18n: tableI18nLanguages
	},
	{
		definition: toastDefinition,
		storybookArgs: toastStorybookArgs,
		name: 'toast',
		category: 'basic',
		styleSetup: toastStyleSetup,
		htmlSlots: toastHtmlSlots,
		i18n: toastI18nLanguages
	}
]);
