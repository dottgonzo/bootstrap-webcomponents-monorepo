import { readable, type Readable } from 'svelte/store';
import type { ComponentSetup } from '@htmlbricks/hb-jsutils';

import bannerSetup from '@htmlbricks/hb-banner/release/manifest.json';
import areaCodeSetup from '@htmlbricks/hb-area-code/release/manifest.json';
import offcanvasSetup from '@htmlbricks/hb-offcanvas/release/manifest.json';
import layoutSetup from '@htmlbricks/hb-layout/release/manifest.json';
import footerSetup from '@htmlbricks/hb-footer/release/manifest.json';
import inputTextSetup from '@htmlbricks/hb-input-text/release/manifest.json';
import paginateSetup from '@htmlbricks/hb-paginate/release/manifest.json';

import authSetup from '@htmlbricks/hb-auth/release/manifest.json';
import calendarEventsSetup from '@htmlbricks/hb-calendar-events/release/manifest.json';
import cardVideoSetup from '@htmlbricks/hb-card-video/release/manifest.json';
import chartjsSetup from '@htmlbricks/hb-chartjs/release/manifest.json';
import checkoutSetup from '@htmlbricks/hb-checkout/release/manifest.json';
import checkoutShoppingCartSetup from '@htmlbricks/hb-checkout-shopping-cart/release/manifest.json';
import contactItemSetup from '@htmlbricks/hb-contact-item/release/manifest.json';
import cookieLawBannerSetup from '@htmlbricks/hb-cookie-law-banner/release/manifest.json';
import dialogSetup from '@htmlbricks/hb-dialog/release/manifest.json';
import downloaderSetup from '@htmlbricks/hb-downloader/release/manifest.json';
import dropdownSimpleSetup from '@htmlbricks/hb-dropdown-simple/release/manifest.json';
import editorTinymceSetup from '@htmlbricks/hb-editor-tinymce/release/manifest.json';
import editorVideoSetup from '@htmlbricks/hb-editor-video/release/manifest.json';
import formSetup from '@htmlbricks/hb-form/release/manifest.json';
import funnelSetup from '@htmlbricks/hb-funnel/release/manifest.json';
import galleryVideoSetup from '@htmlbricks/hb-gallery-video/release/manifest.json';
import gaugeSetup from '@htmlbricks/hb-gauge/release/manifest.json';
import inputAreaSetup from '@htmlbricks/hb-input-area/release/manifest.json';
import inputColorSetup from '@htmlbricks/hb-input-color/release/manifest.json';
import inputCheckboxSetup from '@htmlbricks/hb-input-checkbox/release/manifest.json';
import inputDateSetup from '@htmlbricks/hb-input-date/release/manifest.json';
import inputEmailSetup from '@htmlbricks/hb-input-email/release/manifest.json';
import inputFileSetup from '@htmlbricks/hb-input-file/release/manifest.json';
import inputNumberSetup from '@htmlbricks/hb-input-number/release/manifest.json';
import inputRadioSetup from '@htmlbricks/hb-input-radio/release/manifest.json';
import inputSelectSetup from '@htmlbricks/hb-input-select/release/manifest.json';
import mapSetup from '@htmlbricks/hb-map/release/manifest.json';
import modalVideoSetup from '@htmlbricks/hb-modal-video/release/manifest.json';
import navbarSetup from '@htmlbricks/hb-navbar/release/manifest.json';
import orderListSetup from '@htmlbricks/hb-order-list/release/manifest.json';
import pageCheckoutSetup from '@htmlbricks/hb-page-checkout/release/manifest.json';
import pageInvoiceSetup from '@htmlbricks/hb-page-invoice/release/manifest.json';
import pageLoginregisterSetup from '@htmlbricks/hb-page-loginregister/release/manifest.json';
import paymentPaypalSetup from '@htmlbricks/hb-payment-paypal/release/manifest.json';
import playerLiveSetup from '@htmlbricks/hb-player-live/release/manifest.json';
import productComparisonSetup from '@htmlbricks/hb-product-comparison/release/manifest.json';
import rangeSliderSetup from '@htmlbricks/hb-range-slider/release/manifest.json';
import sidenavLinkSetup from '@htmlbricks/hb-sidenav-link/release/manifest.json';
import tableSetup from '@htmlbricks/hb-table/release/manifest.json';
import toastSetup from '@htmlbricks/hb-toast/release/manifest.json';

export const allComponentsMetas: Readable<ComponentSetup[]> = readable([
	bannerSetup as ComponentSetup,
	areaCodeSetup as ComponentSetup,
	offcanvasSetup as ComponentSetup,
	layoutSetup as ComponentSetup,
	footerSetup as ComponentSetup,
	inputTextSetup as ComponentSetup,
	paginateSetup as ComponentSetup,

	authSetup as ComponentSetup,
	calendarEventsSetup as ComponentSetup,
	cardVideoSetup as ComponentSetup,
	chartjsSetup as ComponentSetup,
	checkoutSetup as ComponentSetup,
	checkoutShoppingCartSetup as ComponentSetup,
	contactItemSetup as ComponentSetup,
	cookieLawBannerSetup as ComponentSetup,
	dialogSetup as ComponentSetup,
	downloaderSetup as ComponentSetup,
	dropdownSimpleSetup as ComponentSetup,
	editorTinymceSetup as ComponentSetup,
	editorVideoSetup as ComponentSetup,
	formSetup as ComponentSetup,
	funnelSetup as ComponentSetup,
	galleryVideoSetup as ComponentSetup,
	gaugeSetup as ComponentSetup,
	inputAreaSetup as ComponentSetup,
	inputColorSetup as ComponentSetup,
	inputCheckboxSetup as ComponentSetup,
	inputDateSetup as ComponentSetup,
	inputEmailSetup as ComponentSetup,
	inputFileSetup as ComponentSetup,
	inputNumberSetup as ComponentSetup,
	inputRadioSetup as ComponentSetup,
	inputSelectSetup as ComponentSetup,
	mapSetup as ComponentSetup,
	modalVideoSetup as ComponentSetup,
	navbarSetup as ComponentSetup,
	orderListSetup as ComponentSetup,
	pageCheckoutSetup as ComponentSetup,
	pageInvoiceSetup as ComponentSetup,
	pageLoginregisterSetup as ComponentSetup,
	paymentPaypalSetup as ComponentSetup,
	playerLiveSetup as ComponentSetup,
	productComparisonSetup as ComponentSetup,
	rangeSliderSetup as ComponentSetup,
	sidenavLinkSetup as ComponentSetup,
	tableSetup as ComponentSetup,
	toastSetup as ComponentSetup
]);
