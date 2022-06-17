import type { CookieContent, IDoc, IParagraphList, ITableHeaders } from "@app/types/webcomponent.type";
import { cookieHeaders, mapCookie, sortFinalDoc } from "./utils";

// https://www.iubenda.com/privacy-policy/54363417/cookie-policy?an=no&s_ck=false&newmarkup=yes

export default function (config: CookieContent) {
	const content: IDoc = {
		id: config.id,
		title: `Cookie Policy di ${config.site.name}`,
		int: { key: "it", flag: "" },
		chapters: [
			{
				title: "Informazioni generali",
				index: 0,
				paragraphs: [
					{
						key: "i1",
						content: `Questo documento contiene informazioni in merito alle tecnologie che consentono a questo Sito Web di raggiungere gli scopi descritti di seguito. Tali tecnologie permettono al Titolare di raccogliere e salvare informazioni (per esempio tramite l’utilizzo di Cookie) o di utilizzare risorse (per esempio eseguendo uno script) sul dispositivo dell’Utente quando quest’ultimo interagisce con questo Sito Web.`,
						index: 0,
					},
					{
						key: "i2",
						content: `Per semplicità, in questo documento tali tecnologie sono sinteticamente definite “Strumenti di Tracciamento”, salvo vi sia ragione di differenziare. Per esempio, sebbene i Cookie possano essere usati in browser sia web sia mobili, sarebbe fuori luogo parlare di Cookie nel contesto di applicazioni per dispositivi mobili, dal momento che si tratta di Strumenti di Tracciamento che richiedono la presenza di un browser. Per questo motivo, all’interno di questo documento il temine Cookie è utilizzato solo per indicare in modo specifico quel particolare tipo di Strumento di Tracciamento.`,
						index: 1,
					},
					{
						key: "i3",
						content: `Alcune delle finalità per le quali vengono impiegati Strumenti di Tracciamento potrebbero, inoltre, a seconda della legge applicabile richiedere il consenso dell’Utente. Se viene prestato il consenso, esso può essere revocato liberamente in qualsiasi momento seguendo le istruzioni contenute in questo documento.`,
						index: 2,
					},
					{
						key: "i4",
						content: `Questo Sito Web utilizza Strumenti di Tracciamento gestiti direttamente dal Titolare (comunemente detti Strumenti di Tracciamento “di prima parte”) e Strumenti di Tracciamento che abilitano servizi forniti da terzi (comunemente detti Strumenti di Tracciamento “di terza parte”). Se non diversamente specificato all’interno di questo documento, tali terzi hanno accesso ai rispettivi Strumenti di Tracciamento.`,
						index: 3,
					},

					{
						key: "i5",
						content: `Durata e scadenza dei Cookie e degli altri Strumenti di Tracciamento simili possono variare a seconda di quanto impostato dal Titolare o da ciascun fornitore terzo. Alcuni di essi scadono al termine della sessione di navigazione dell’Utente.`,
						index: 4,
					},
					{
						key: "i6",
						content: `In aggiunta a quanto specificato nella descrizione di ciascuna delle categorie di seguito riportate, gli Utenti possono ottenere informazioni più dettagliate ed aggiornate sulla durata, così come qualsiasi altra informazione rilevante - quale la presenza di altri Strumenti di Tracciamento - nelle privacy policy dei rispettivi fornitori terzi (tramite i link messi a disposizione) o contattando il Titolare.`,
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
						content: `Questo Sito Web utilizza Cookie comunemente detti “tecnici” o altri Strumenti di Tracciamento analoghi per svolgere attività strettamente necessarie a garantire il funzionamento o la fornitura del Servizio.`,
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
				title: "Attività connesse all'autenticazione degli utenti e alla gestione dei rispettivi dati",
				index: 2,
				paragraphs: [
					{
						key: "auth0",
						content: `These are stored when you log in to a ${config.site.name} site, using our authentication service (EU Login). When you do this, you accept the associated privacy policy.`,
						index: 0,
						// table: { headers: cookieHeaders, rows: [] },
					},
				],
				key: "authentication",
			},
			{
				title: "Attività di anlisi dell'utilizzo del Sito Web",
				index: 3,
				paragraphs: [],
				key: "analytics",
			},
			{
				title: "Cookies di terze parti",
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
				title: "Come posso gestire i cookies?",
				index: 5,
				paragraphs: [
					{
						key: "mng1",
						title: `Cancellazione dei cookie dal tuo dispositivo`,
						content: `You can delete all cookies that are already on your device by clearing the browsing history of your browser. This will remove all cookies from all websites you have visited. Be aware though that you may also lose some saved information (e.g. saved login details, site preferences).`,
						index: 0,
					},
					{
						key: "mng2",
						title: `Gestione di specifici cookie`,
						content: `For more detailed control over site-specific cookies, check the privacy and cookie settings in your preferred browser.`,
						index: 1,
					},
					{
						key: "mng3",
						title: `Blocco dei cookie`,
						content: `You can set most modern browsers to prevent any cookies being placed on your device, but you may then have to manually adjust some preferences every time you visit a site/page. And some services and functionalities may not work properly at all (e.g. profile logging-in).`,
						index: 2,
					},
					{
						key: "mng4",
						title: `Gestione dei cookie per analitici`,
						content: `You can manage your preferences concerning cookies from Europa Analytics on the dedicated Europa Analytics page.`,
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
						content: `I dati raccolti dagli strumenti di tracking di ${config.site.name} sono:`,
						table: { headers: cookieHeaders, rows: analyticsFirst },
						key: "ana1",
						index: 0,
					});
			}
			if (analyticsThird.length) {
				content.chapters
					.find((f) => f.key === "analytics")
					?.paragraphs.push({
						content: `I dati raccolti dai cookie di terze parti sono:`,
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
						content: `I dati raccolti dagli strumenti di tracking di ${config.site.name} sono:`,
						table: { headers: cookieHeaders, rows: authenticationsFirst },
						key: "auth1",
						index: 0,
					});
			}
			if (authenticationsThird.length) {
				content.chapters
					.find((f) => f.key === "authentication")
					?.paragraphs.push({
						content: `I dati raccolti dai cookie di terze parti sono:`,
						table: { headers: cookieHeaders, rows: authenticationsThird },
						key: "auth2",
						index: 1,
					});
			}
		}

		const thirds = config.cookies.filter((f) => f.type === "third-party").map((m) => mapCookie(m));

		if (thirds.length) {
			content.chapters
				.find((f) => f.key === "third-party")
				?.paragraphs.push({
					content: `I dati raccolti dai cookie di terze parti sono:`,
					table: { headers: cookieHeaders, rows: thirds },
					key: "th1",
					index: 0,
				});
		}

		const advertising = config.cookies.filter((f) => f.type === "advertising").map((m) => mapCookie(m));

		if (advertising.length) {
			content.chapters
				.find((f) => f.key === "advertising")
				?.paragraphs.push({
					content: `I dati raccolti dai cookie di terze parti sono:`,
					table: { headers: cookieHeaders, rows: advertising },
					key: "adv1",
					index: 0,
				});
		}
	}
	return sortFinalDoc(content);
}
