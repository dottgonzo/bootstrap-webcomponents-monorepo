import type { CookieItContent, IDoc, IParagraphList } from "@app/types/webcomponent.type";
import { sortFinalDoc } from "./utils";

// https://www.iubenda.com/privacy-policy/54363417/cookie-policy?an=no&s_ck=false&newmarkup=yes

export default function (config: CookieItContent) {
	const content: IDoc = {
		id: "italian-terms-cookies",
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
						content: `Per semplicità, in questo documento tali tecnologie sono sinteticamente definite “Strumenti di Tracciamento”, salvo vi sia ragione di differenziare.
Per esempio, sebbene i Cookie possano essere usati in browser sia web sia mobili, sarebbe fuori luogo parlare di Cookie nel contesto di applicazioni per dispositivi mobili, dal momento che si tratta di Strumenti di Tracciamento che richiedono la presenza di un browser. Per questo motivo, all’interno di questo documento il temine Cookie è utilizzato solo per indicare in modo specifico quel particolare tipo di Strumento di Tracciamento.`,
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
				],
				key: "activities",
			},
		],
	};

	return sortFinalDoc(content);
}
