import type { ITPrivacy, IDoc } from "@app/types/webcomponent.type";

export default function (config: ITPrivacy) {
	const content: IDoc = {
		title: "INFORMATIVA PRIVACY",
		language: "it",
		chapters: [
			{
				title: "Informazioni relative alla Privacy del sito",
				paragraphs: [
					{
						key: "i1",
						content: `In questa sezione sono contenute le informazioni relative alle modalità di gestione di ${config.site.name}, di
		proprietà di ${config.company.name}, in riferimento al trattamento dei dati degli utenti del sito stesso.`,
					},
					{
						key: "i2",

						content: `La presente informativa ha valore anche ai fini dell'articolo 13 del Regolamento (UE) n. 2016/679, relativo alla protezione delle persone fisiche con
		riguardo al trattamento dei dati personali nonché alla libera circolazione di tali dati, per i soggetti che interagiscono con ${config.site.name}`,
					},
					{
						key: "i3",
						content: `L'informativa è resa solo per ${config.site.name} e non anche per altri siti web eventualmente consultati dall'utente tramite
		link in esso contenuti.`,
					},
					{
						key: "i4",
						content: `Scopo del presente documento è fornire indicazioni circa le modalità, i tempi e la natura delle informazioni che i titolari del trattamento devono
		fornire agli utenti al momento della connessione alle pagine web di ${config.site.name}, indipendentemente dagli scopi del
		collegamento stesso, secondo la legislazione Italiana ed Europea.`,
					},
					{
						key: "i5",
						content: `L'informativa può subire modifiche a causa dell'introduzione di nuove norme al riguardo, si invita pertanto l'utente a controllare periodicamente la
		presente pagina.`,
					},
					{
						key: "i6",
						content: `Se l'utente ha meno di quattordici anni, ai sensi dell'art.8, c.1 regolamento (UE) 2016/679, e dell'Art. 2 - Quinquies del D.Lgs 196/2003, così come
		modificato dal D.Lgs 181/18, dovrà legittimare il suo consenso attraverso l'autorizzazione dei genitori o di chi ne fa le veci.`,
					},
				],
				key: "info",
			},
			{
				title: "Titolare del trattamento",
				paragraphs: [
					{
						key: "t1",
						content: `Il titolare del trattamento è la persona fisica o giuridica, l'autorità pubblica, il servizio o altro organismo che, singolarmente o insieme ad
		altri, determina le finalità e i mezzi del trattamento di dati personali. Si occupa anche dei profili sulla sicurezza.`,
					},
					{
						key: "t2",
						content: `Relativamente al presente sito web il titolare del trattamento è: ${config.privacyAdmin.name}, e per
		ogni chiarimento o esercizio dei diritti dell'utente potrà contattarlo al seguente indirizzo mail: ${config.privacyAdmin.email}`,
					},
				],
				key: "owner",
			},
			{
				title: "Luogo trattamento dati",
				paragraphs: [
					{
						key: "l1",
						content: `Il trattamento dei dati generato dall'utilizzo di ${config.site.name} avviene presso ${config.company.address}`,
					},
					{
						key: "l2",
						content: `In caso di necessità, i dati connessi al servizio newsletter possono essere trattati dal responsabile del trattamento o soggetti da esso incaricati a
		tal fine presso la relativa sede.`,
					},
				],
				key: "location",
			},
			{
				title: "Base giuridica del trattamento",
				paragraphs: [
					{
						key: "b1",
						content: `Il trattamento dei dati personali da parte di ${config.site.name} si basa sul consenso – ai sensi dell'art. 6, par. 1, lett.
		a) del Regolamento UE 2016/679 – espresso dall'utente mediante la navigazione su questo sito web e la sua consultazione, così accettando la presente informativa.`,
					},
					{
						key: "b2",
						content: `Il consenso è facoltativo e può essere revocato in qualsiasi momento mediante richiesta inviata a mezzo email a ${config.privacyAdmin.email} precisando che, in tal caso, in assenza di consenso non potranno essere erogati alcuni servizi e la navigazione sul sito web potrebbe essere compromessa.`,
					},
				],
				key: "law",
			},
			{
				title: "Cookies",
				paragraphs: [
					{
						key: "c1",
						content: `In questa sezione viene descritto in che modo questo Sito e terze parti utilizzano i cookie e tecnologie similari. L'utilizzo dei cookie avviene nel
		rispetto della relativa normativa europea (direttiva 2009/136/CE ha modificato la direttiva 2002/58/CE "E Privacy) e nazionale (Provvedimento Garante
		per la protezione dei dati personali dell'8 maggio 2014 e successivi chiarimenti nonché Linee Guida cookie e altri strumenti di tracciamento del 10
		giugno 2021 n.231).`,
					},
					{
						key: "c2",
						content: `Per avere informazioni complete riguardo ai cookies visitare la nostra cookie policy: ${config.site.cookiePolicyUri}`,
					},
				],
				key: "cookies",
			},
			{
				title: "Tipologia di trattamento dati",
				paragraphs: [
					{
						key: "td1",
						content: `Il trattamento dei dati personali è necessario per il perseguimento del legittimo interesse del titolare del trattamento per finalità di fornire
		informazioni circa l'attività di ${config.site.name} ai sensi dell'art. 6, par. 1, lett. f) del Regolamento UE 2016/679, nel
		rispetto di quanto previsto dal medesimo Regolamento.`,
					},
					{
						key: "td2",
						content: `Il presente sito fa uso di Log Files nei quali vengono conservate informazioni raccolte in maniera automatizzata durante le visite degli utenti. Le
		informazioni raccolte potrebbero essere le seguenti:`,
						list: [
							{ key: "tdl1", content: `indirizzo internet protocol (IP);` },
							{ key: `tdl2`, content: `tipo di browser e parametri del dispositivo usato per connettersi al sito;` },
						],
					},
				],
				key: "dataTerms",
			},
			{
				title: "Tipologia di dati acquisti",
				paragraphs: [{ content: ` `, key: "tda1" }],
				key: "dataTypes",
			},
			{
				title: "Dati forniti dall'utente",
				paragraphs: [{ content: ` `, key: "tfa21" }],
				key: "dataFunctions",
			},
			{
				title: "Finalità del trattamento dati",
				paragraphs: [{ content: ` `, key: "ftd1" }],
				key: "dataScopes",
			},
			{
				title: "Conservazione Dati",
				paragraphs: [{ content: ` `, key: "cd1" }],
				key: "dataStorage",
			},
			{
				title: "Moduli di contatto",
				paragraphs: [{ content: ` `, key: "mc1" }],
				key: "contacts",
			},
			{
				title: "Interazione social network",
				paragraphs: [{ content: ` `, key: "isn1" }],
				key: "socials",
			},
			{
				title: "Diritti dell'utente",
				paragraphs: [{ content: ` `, key: "du1" }],
				key: "rights",
			},
			{
				title: "Trasferimento a Paesi extra UE",
				paragraphs: [{ content: ` `, key: "tpe1" }],
				key: "transferExtraEu",
			},
			{
				title: "Modifiche al presente documento",
				paragraphs: [{ content: ` `, key: "md1" }],
				key: "timestamps",
			},
		],
	};

	return content;
}
