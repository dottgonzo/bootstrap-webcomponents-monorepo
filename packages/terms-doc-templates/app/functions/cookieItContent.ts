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
						content: `Questi vengono memorizzati quando accedi al sito ${config.site.name}, utilizzando il nostro servizio di autenticazione. Quando lo fai, accetti l'informativa sulla privacy associata.`,
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
						content: `Alcune delle nostre pagine mostrano contenuti di fornitori esterni, ad es. YouTube, Facebook e Twitter.`,
						index: 0,
					},
					{
						key: "thr2",
						content: `Per visualizzare questo contenuto di terze parti, devi prima accettare i loro termini e condizioni specifici. Ciò include le loro politiche sui cookie, su cui non abbiamo alcun controllo.`,
						index: 1,
					},
					{
						key: "thr3",
						content: `Se non visualizzi questo contenuto, sul tuo dispositivo non vengono installati cookie di terze parti.`,
						index: 2,
					},
					{
						key: "thr4",
						content: `Provider dei sistemi di tracking di terze parti`,
						list: [],
						index: 3,
					},
					{
						key: "thr5",
						content: `Questi servizi di terze parti sono al di fuori del controllo di ${config.company.name}. I fornitori possono, in qualsiasi momento, modificare i propri termini di servizio, finalità e utilizzo dei cookie, ecc.`,
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
						content: `Puoi eliminare tutti i cookie già presenti sul tuo dispositivo cancellando la cronologia di navigazione del tuo browser. Questo rimuoverà tutti i cookie da tutti i siti web che hai visitato. Tieni presente, tuttavia, che potresti anche perdere alcune informazioni salvate (ad es. dettagli di accesso salvati, preferenze del sito).`,
						index: 0,
					},
					{
						key: "mng2",
						title: `Gestione di specifici cookie`,
						content: `Per un controllo più dettagliato sui cookie specifici del sito, controlla le impostazioni sulla privacy e sui cookie nel tuo browser preferito.`,
						index: 1,
					},
					{
						key: "mng3",
						title: `Blocco dei cookie`,
						content: `Puoi impostare i browser più moderni in modo da impedire che qualsiasi cookie venga inserito sul tuo dispositivo, ma potresti dover modificare manualmente alcune preferenze ogni volta che visiti un sito/una pagina. Inoltre, alcuni servizi e funzionalità potrebbero non funzionare correttamente (ad es. accesso al profilo).`,
						index: 2,
					},
					{
						key: "mng4",
						title: `Gestione dei cookie per analitici`,
						content: `Puoi gestire le tue preferenze relative ai cookie da ${config.site.name} nella pagina dedicata del sito.`,
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
						content: `I dati tecnici raccolti dagli strumenti di tracking di ${config.site.name} sono:`,
						table: { headers: cookieHeaders, rows: technicalFirst },
						key: "tda2",
						index: 1,
					});
			}
			if (technicalThird.length) {
				content.chapters
					.find((f) => f.key === "technicals")
					?.paragraphs.push({
						content: `I dati tecnici raccolti dai cookie di terze parti sono:`,
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
						content: `I dati raccolti dagli strumenti di tracking di ${config.site.name} come strumento di analisi sono:`,
						table: { headers: cookieHeaders, rows: analyticsFirst },
						key: "ana1",
						index: 0,
					});
			}
			if (analyticsThird.length) {
				content.chapters
					.find((f) => f.key === "analytics")
					?.paragraphs.push({
						content: `I dati analitici raccolti dai cookie di terze parti sono:`,
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
						content: `I dati raccolti dagli strumenti di tracking di ${config.site.name} per l'autenticazione sono:`,
						table: { headers: cookieHeaders, rows: authenticationsFirst },
						key: "auth1",
						index: 0,
					});
			}
			if (authenticationsThird.length) {
				content.chapters
					.find((f) => f.key === "authentication")
					?.paragraphs.push({
						content: `I dati raccolti dai cookie di terze parti per l'autenticazione sono:`,
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
					content: `I dati raccolti dai cookie pubblicitari di terze parti sono:`,
					table: { headers: cookieHeaders, rows: advertising },
					key: "adv1",
					index: 0,
				});
		}
	}
	return sortFinalDoc(content);
}
