import type { CookieContent, CookieRow, IDoc, IParagraphList, IRow, ITableHeaders } from "@app/types/webcomponent.type";
import { cookieHeaders, mapCookie, sortFinalDoc } from "./utils";

export default function (config: CookieContent) {
	const content: IDoc = {
		id: config.id,
		title: `Cookie Policy of ${config.site.name}`,
		int: { key: "en", flag: "" },
		chapters: [
			{
				title: "General Informations",
				index: 0,
				paragraphs: [
					{
						key: "i1",
						content: `This document contains information about the technologies that allow this Website to achieve the purposes described below. These technologies allow the Owner to collect and save information (for example through the use of Cookies) or to use resources (for example by running a script) on the User's device when the latter interacts with this Website.`,
						index: 0,
					},
					{
						key: "i2",
						content: `For the sake of simplicity, these technologies are briefly referred to in this document as "Tracking Tools", unless there is reason to differentiate. For example, although Cookies can be used in both web and mobile browsers, it would be out of place to speak of Cookies in the context of applications for mobile devices, since they are Tracking Tools that require the presence of a browser. For this reason, within this document the term Cookie is used only to specifically indicate that particular type of Tracking Tool.`,
						index: 1,
					},
					{
						key: "i3",
						content: `Some of the purposes for which Tracking Tools are used may also require the User's consent, depending on the applicable law. If consent is given, it can be freely revoked at any time by following the instructions contained in this document.`,
						index: 2,
					},
					{
						key: "i4",
						content: `This Website uses Tracking Tools managed directly by the Owner (commonly called "first party" Tracking Tools) and Tracking Tools that enable services provided by third parties (commonly called "third party" Tracking Tools). Unless otherwise specified in this document, these third parties have access to the respective Tracking Tools.`,
						index: 3,
					},

					{
						key: "i5",
						content: `Duration and expiration of Cookies and other similar Tracking Tools may vary depending on what is set by the Owner or by each third party provider. Some of them expire at the end of the User's browsing session.`,
						index: 4,
					},
					{
						key: "i6",
						content: `In addition to what is specified in the description of each of the categories listed below, Users can obtain more detailed and updated information on the duration, as well as any other relevant information - such as the presence of other Tracking Tools - in the privacy policies of their respective third party suppliers. (through the links made available) or by contacting the Data Controller.`,
						index: 5,
					},
				],
				key: "info",
			},
			{
				title: "Attività strettamente necessarie a garantire il funzionamento di questo Sito Web e la fornitura del Servizio",
				index: 1,
				paragraphs: [
					{
						key: "act1",
						content: `This Website uses Cookies commonly called "technical" or other similar Tracking Tools to carry out activities strictly necessary to ensure the functioning or provision of the Service.`,
						index: 0,
					},
					// {
					// 	key: "act2",
					// 	content: `Technical Tracking Tools from ${config.company.name}`,
					// 	index: 1,
					// 	table: { headers: cookieHeaders, rows: config.cookies.filter((f) => f.type === "technical" && !f.third).map(mapCookie) },
					// },
					// {
					// 	key: "act2",
					// 	content: `Third party technical Tracking Tools`,
					// 	index: 2,
					// 	table: { headers: cookieHeaders, rows: config.cookies.filter((f) => f.type === "technical" && f.third).map(mapCookie) },
					// },
				],
				key: "technicals",
			},
			{
				title: "Activities related to user authentication and management of their data",
				index: 2,
				paragraphs: [
					{
						key: "auth0",
						content: `These are stored when you log in to a ${config.site.name} site, using our authentication service. When you do this, you accept the associated privacy policy.`,
						index: 0,
						// table: { headers: cookieHeaders, rows: [] },
					},
				],
				key: "authentication",
			},
			{
				title: "Analytics tracking tools",
				index: 3,
				paragraphs: [],
				key: "analytics",
			},
			{
				title: "Third-party cookies",
				index: 4,
				paragraphs: [
					{
						key: "thr1",
						content: `Some of our pages display content from external providers, e.g. YouTube, Facebook and Twitter.`,
						index: 0,
					},
					{
						key: "thr2",
						content: `To view this third-party content, you first have to accept their specific terms and conditions. This includes their cookie policies, which we have no control over.`,
						index: 1,
					},
					{
						key: "thr3",
						content: `If you do not view this content, no third-party cookies are installed on your device.`,
						index: 2,
					},
					{
						key: "thr4",
						content: `Third-party providers on ${config.site.name} websites`,
						list: [],
						index: 3,
					},
					{
						key: "thr5",
						content: `These third-party services are outside of the control of ${config.company.name}. Providers may, at any time, change their terms of service, purpose and use of cookies, etc.`,
						index: 4,
					},
				],
				key: "third-party",
			},
			{
				title: "How can you manage cookies?",
				index: 5,
				paragraphs: [
					{
						key: "mng1",
						title: `Removing cookies from your device`,
						content: `You can delete all cookies that are already on your device by clearing the browsing history of your browser. This will remove all cookies from all websites you have visited. Be aware though that you may also lose some saved information (e.g. saved login details, site preferences).`,
						index: 0,
					},
					{
						key: "mng2",
						title: `Managing site-specific cookies`,
						content: `For more detailed control over site-specific cookies, check the privacy and cookie settings in your preferred browser.`,
						index: 1,
					},
					{
						key: "mng3",
						title: `Blocking cookies`,
						content: `You can set most modern browsers to prevent any cookies being placed on your device, but you may then have to manually adjust some preferences every time you visit a site/page. And some services and functionalities may not work properly at all (e.g. profile logging-in).`,
						index: 2,
					},
					{
						key: "mng4",
						title: `Managing our analytics cookies`,
						content: `You can manage your preferences concerning cookies from ${config.site.name} on the dedicated website page.`,
						index: 3,
					},
				],
				key: "managment",
			},
		],
	};

	if (config.cookies?.length) {
		const technicalFirst = config.cookies.filter((f) => f.type === "technical" && !f.third).map((m) => mapCookie(m));
		const technicalThird = config.cookies.filter((f) => f.type === "technical" && f.third).map((m) => mapCookie(m));
		if (technicalFirst.length || technicalThird.length) {
			if (technicalFirst.length) {
				content.chapters
					.find((f) => f.key === "technicals")
					?.paragraphs.push({
						content: `I dati raccolti dagli strumenti di tracking di ${config.site.name} sono:`,
						table: { headers: cookieHeaders, rows: technicalFirst },
						key: "tda2",
						index: 1,
					});
			}
			if (technicalThird.length) {
				content.chapters
					.find((f) => f.key === "technicals")
					?.paragraphs.push({
						content: `I dati raccolti dai cookie di terze parti sono:`,
						table: { headers: cookieHeaders, rows: technicalThird },
						key: "tda3",
						index: 2,
					});
			}
		}

		const analyticsFirst = config.cookies.filter((f) => f.type === "analytics" && !f.third).map((m) => mapCookie(m));
		const analyticsThird = config.cookies.filter((f) => f.type === "analytics" && f.third).map((m) => mapCookie(m));

		if (analyticsFirst.length || analyticsThird.length) {
			if (analyticsFirst.length) {
				content.chapters
					.find((f) => f.key === "analytics")
					?.paragraphs.push({
						content: `Cookies collected from ${config.site.name} for analytics purpose are:`,
						table: { headers: cookieHeaders, rows: analyticsFirst },
						key: "ana1",
						index: 0,
					});
			}
			if (analyticsThird.length) {
				content.chapters
					.find((f) => f.key === "analytics")
					?.paragraphs.push({
						content: `Analytics data collected from third party cookies are:`,
						table: { headers: cookieHeaders, rows: analyticsThird },
						key: "ana2",
						index: 1,
					});
			}
		}

		const authenticationsFirst = config.cookies.filter((f) => f.type === "authentication" && !f.third).map((m) => mapCookie(m));
		const authenticationsThird = config.cookies.filter((f) => f.type === "authentication" && f.third).map((m) => mapCookie(m));

		if (authenticationsFirst.length || authenticationsThird.length) {
			if (authenticationsFirst.length) {
				content.chapters
					.find((f) => f.key === "authentication")
					?.paragraphs.push({
						content: `Cookies collected from ${config.site.name} for authentication functionality are:`,
						table: { headers: cookieHeaders, rows: authenticationsFirst },
						key: "auth1",
						index: 0,
					});
			}
			if (authenticationsThird.length) {
				content.chapters
					.find((f) => f.key === "authentication")
					?.paragraphs.push({
						content: `Cookies collected from third party for authentication purpose are:`,
						table: { headers: cookieHeaders, rows: authenticationsThird },
						key: "auth2",
						index: 1,
					});
			}
		}

		const advertising = config.cookies.filter((f) => f.type === "advertising").map((m) => mapCookie(m));

		if (advertising.length) {
			content.chapters
				.find((f) => f.key === "advertising")
				?.paragraphs.push({
					content: `Third Parties Cookie data for ${config.site.name} advertising are:`,
					table: { headers: cookieHeaders, rows: advertising },
					key: "adv1",
					index: 0,
				});
		}
		const thirds = config.cookies.filter((f) => f.type === "third-party").map((m) => mapCookie(m));

		if (thirds.length) {
			content.chapters
				.find((f) => f.key === "third-party")
				?.paragraphs.push({
					content: `Third Parties Cookie data for ${config.site.name} are:`,
					table: { headers: cookieHeaders, rows: thirds },
					key: "th1",
					index: 0,
				});
		}
	}

	return sortFinalDoc(content);
}
