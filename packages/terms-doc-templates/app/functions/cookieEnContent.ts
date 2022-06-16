import type { CookieContent, IDoc, IParagraphList, ITableHeader } from "@app/types/webcomponent.type";
import { sortFinalDoc } from "./utils";

// https://www.iubenda.com/privacy-policy/54363417/cookie-policy?an=no&s_ck=false&newmarkup=yes

const cookieHeaders: ITableHeader[] = [
	{ key: "name", label: "Nome" },
	{ key: "service", label: "Servizio" },
	{ key: "porpose", label: "Scope" },
	{ key: "details", label: "Tipologie e Durata" },
];

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
					{
						key: "act2",
						content: `Strumenti di Tracciamento di terza parte`,
						index: 1,
						table: { headers: cookieHeaders, rows: [] },
					},
				],
				key: "technicals",
			},
			{
				title: "Attività strettamente necessarie a garantire il funzionamento di questo Sito Web e la fornitura del Servizio",
				index: 2,
				paragraphs: [
					{
						key: "auth1",
						content: `These are stored when you log in to a Commission site, using our authentication service (EU Login). When you do this, you accept the associated privacy policy.`,
						index: 0,
						table: { headers: cookieHeaders, rows: [] },
					},
				],
				key: "authentications",
			},
			{
				title: "Attività strettamente necessarie a garantire il funzionamento di questo Sito Web e la fornitura del Servizio",
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
						content: `Third-party providers on Commission websites`,
						list: [],
						index: 3,
					},
					{
						key: "thr5",
						content: `These third-party services are outside of the control of the Commission. Providers may, at any time, change their terms of service, purpose and use of cookies, etc.`,
						index: 4,
					},
				],
				key: "thirds",
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
						content: `You can delete all cookies that are already on your device by clearing the browsing history of your browser. This will remove all cookies from all websites you have visited. Be aware though that you may also lose some saved information (e.g. saved login details, site preferences).`,
						index: 1,
					},
					{
						key: "mng3",
						title: `Managing site-specific cookies`,
						content: `You can delete all cookies that are already on your device by clearing the browsing history of your browser. This will remove all cookies from all websites you have visited. Be aware though that you may also lose some saved information (e.g. saved login details, site preferences).`,
						index: 2,
					},
					{
						key: "mng4",
						title: `Managing our analytics cookies`,
						content: `You can manage your preferences concerning cookies from Europa Analytics on the dedicated Europa Analytics page.`,
						index: 3,
					},
				],
				key: "managment",
			},
		],
	};

	return sortFinalDoc(content);
}
