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
						content: `Il presente sito fa uso di Log Files nei quali vengono conservate informazioni raccolte in maniera automatizzata durante le visite degli utenti. Tali informazioni sono trattate in forma automatizzata e raccolte in forma esclusivamente aggregata al fine di verificare il corretto
		funzionamento del sito, e per motivi di sicurezza. Le informazioni saranno trattate in base ai legittimi interessi del titolare e potrebbero essere le seguenti:`,
						list: [
							{ key: "tdl1", content: `indirizzo internet protocol (IP)` },
							{ key: `tdl2`, content: `tipo di browser e parametri del dispositivo usato per connettersi al sito` },
							{ key: `tdl3`, content: `nome dell'internet service provider (ISP)` },
							{ key: `tdl4`, content: `data e orario di visita` },
							{ key: `tdl5`, content: `pagina web di provenienza del visitatore (referral) e di uscita` },
							{ key: `tdl6`, content: `eventualmente il numero di click` },
						],
					},
					{
						key: "td3",
						content: `A fini di sicurezza (filtri antispam, firewall, rilevazione virus), i dati registrati automaticamente possono eventualmente comprendere anche dati
		personali come l'indirizzo Ip, che potrebbe essere utilizzato, conformemente alle leggi vigenti in materia, al fine di bloccare tentativi di
		danneggiamento al sito medesimo o di recare danno ad altri utenti, o comunque attività dannose o costituenti reato. Tali dati non sono mai utilizzati
		per l'identificazione o la profilazione dell'utente, ma solo a fini di tutela del sito e dei suoi utenti, tali informazioni saranno trattate in base ai
		legittimi interessi del titolare.`,
					},
				],
				key: "dataTerms",
			},
			{
				title: "Tipologia di dati acquisti",
				paragraphs: [
					{
						content: `${config.site.name} raccoglie i dati degli utenti direttamente dal sito o da terze parti. I dati sono necessari per la navigazione
		del sito.`,
						key: "tda1",
					},
					{ key: "tda2", content: `I dati raccolti sono da ${config.site.name} sono:`, list: [] }, // fill list
				],
				key: "dataTypes",
			},
			{
				title: "Dati forniti dall'utente",
				paragraphs: [
					{
						content: `Qualora il sito consenta l'inserimento di commenti, oppure in caso di specifici servizi richiesti dall'utente, ivi compresi la possibilità di inviare
		il Curriculum Vitae per un eventuale rapporto lavorativo, il sito rileva automaticamente e registra alcuni dati identificativi dell'utente, compreso
		l'indirizzo mail. Tali dati si intendono volontariamente forniti dall'utente al momento della richiesta di erogazione del servizio.`,
						key: "tfa21",
					},
					{
						key: "tfa22",
						content: `Inserendo un commento o altra informazione l'utente accetta espressamente l'informativa privacy. I dati ricevuti verranno utilizzati esclusivamente
		per l'erogazione del servizio richiesto e per il solo tempo necessario per la fornitura del servizio.`,
					},
					{
						key: "tfa23",
						content: `Le informazioni che gli utenti del sito riterranno di rendere pubbliche tramite i servizi e gli strumenti messi a disposizione degli stessi, sono
		fornite dall'utente consapevolmente e volontariamente, esentando il presente sito da qualsiasi responsabilità in merito ad eventuali violazioni delle
		leggi. Spetta all'utente verificare di avere i permessi per l'immissione di dati personali di terzi o di contenuti tutelati dalle norme nazionali ed
		internazionali.`,
					},
					{
						key: "tfa24",
						content: `L'invio facoltativo, esplicito e volontario di posta elettronica agli indirizzi indicati su questo sito comporta la successiva acquisizione
		dell'indirizzo del mittente, necessario per rispondere alle richieste, nonché degli eventuali altri dati personali inseriti nella missiva.`,
					},
					{
						key: "tfa25",
						content: `Specifiche informative di sintesi verranno progressivamente riportate o visualizzate nelle pagine del sito predisposte per particolari servizi a
		richiesta.`,
					},
				],
				key: "dataFunctions",
			},
			{
				title: "Finalità del trattamento dati",
				paragraphs: [
					{
						content: `I dati raccolti dal sito durante il suo funzionamento sono utilizzati per finalità sopra indicate e per le seguenti finalità:`,
						list: [], // fill list
						key: "ftd1",
					},
				],
				key: "dataScopes",
			},
			{
				title: "Conservazione Dati",
				paragraphs: [
					{
						content: `Conformemente a quanto prescritto dall'art. 5.1(c) del Regolamento, i sistemi informativi e i programmi informatici utilizzati da ${config.site.name} sono configurati in modo da ridurre al minimo l'uso di dati personali e identificativi; tali dati saranno trattati solo nella misura necessaria per il
		conseguimento delle finalità indicate nella presente Policy.`,
						key: "cd1",
					},
					{
						key: "cd2",
						content: `I dati verranno conservati per il periodo di tempo strettamente necessario al conseguimento delle finalità in concreto perseguite e, in ogni caso, il
		criterio utilizzato per determinare il periodo di conservazione è improntato al rispetto dei termini consentiti dalle leggi applicabili e dai principi
		di minimizzazione del trattamento e limitazione della conservazione.`,
					},
					{
						key: "cd3",
						content: `Nello specifico, i dati verranno conservati per i seguenti periodi: ${config.storage.durate}`,
					},
					{
						key: "cd4",
						content: `I dati utilizzati a fini di sicurezza (blocco tentativi di danneggiamento del sito) sono conservati per il tempo strettamente necessario al
		raggiungimento del fine anteriormente indicato.`,
					},
					,
				],
				key: "dataStorage",
			},
			{
				title: "Pagamenti",
				paragraphs: [
					{
						content: `${config.site.name} utilizza servizi di pagamento per eseguire pagamenti con carta di credito, bonifico bancario o
			altri strumenti. ${config.site.name} non raccoglie o acquisisce i dati usati per il pagamento.`,
						key: "py1",
					},
					{
						content: `I dati per il pagamento sono raccolti e acquisiti direttamente dal gestore del servizio di pagamento, come l'ente carta di credito, Paypal,
			Stripe o simili. Questi servizi possono effettuare invio di messaggi verso l'utente, per esempio email o sms di notifiche del pagamento.`,
						key: "py2",
					},
					{
						content: `I dati acquisiti e l'utilizzo degli stessi da parte di servizi terzi sono regolamentati dalle rispettive Privacy Policy alle quali si prega di
			fare riferimento.`,
						key: "py3",
					},
					,
					{
						content: ``, // fill content
						key: "py4",
						list: [], // fill list
					},
				],
				key: "payments",
			},
			{
				title: "Moduli di contatto",
				paragraphs: [
					{
						content: `L'utente può compilare il/i moduli di contatto/richiesta informazioni, inserendo i propri dati e acconsentendo al loro uso per rispondere alle
		richieste di natura indicata nella intestazione del modulo.`,
						key: "mc1",
					},
					{
						content: `Dati personali che potrebbero essere raccolti:`,
						list: [], // fill list
						key: "mc2",
					},
				],
				key: "contacts",
			},
			{
				title: "Interazione social network",
				paragraphs: [
					{
						content: `Il presente sito incorpora anche plugin e/o bottoni per i social network, al fine di consentire una facile condivisione dei contenuti sui vostri
		social network preferiti. Tali plugin sono programmati in modo da non impostare alcun cookie all'accesso della pagina, per salvaguardare la privacy
		degli utenti. Eventualmente i cookie vengono impostati, se così previsto dai social network, solo quando l'utente fa effettivo e volontario uso del
		plugin. Si tenga presente che se l'utente naviga avendo effettuato il login nel social network allora ha già acconsentito all'uso dei cookie veicolati
		tramite questo sito al momento dell'iscrizione al social network.`,
						key: "isn1",
					},
					{
						content: `Questo tipo di servizi permette di effettuare interazioni con i social network, o con altre piattaforme esterne, direttamente dalle pagine di ${config.site.name}`,
						key: "isn2",
					},
					{
						content: `Le interazioni e le informazioni acquisite da ${config.site.name} sono in ogni caso soggette alle impostazioni privacy
			dell'Utente relative ad ogni social network. Nel caso in cui sia installato un servizio di interazione con i social network, è possibile che, anche nel
			caso gli Utenti non utilizzino il servizio, lo stesso raccolga dati di traffico relativi alle pagine in cui è installato.`,
						key: "isn3",
					},
					{
						content: ``, // fill content
						list: [], // fill list
						key: "isn4",
					},
				],
				key: "socials",
			},
			{
				title: "Diritti dell'utente",
				paragraphs: [
					{
						content: `Viene garantito all'utente il rispetto dei suoi diritti nell'ambito della protezione dei dati personali. In linea con quanto ripreso e affermato dal
		GDPR, in relazione al trattamento dei propri dati personali, l'utente ha diritto di chiedere al Titolare:`,
						list: [
							{
								key: "drl1",
								content: `L'accesso: l'utente può chiedere conferma che sia o meno in essere un trattamento di dati che lo riguarda, oltre a maggiori chiarimenti circa le
		informazioni di cui alla presente informativa`,
							},
							{
								key: "drl2",
								content: `La rettifica: può chiedere di rettificare o integrare i dati che ha fornito, qualora inesatti o incompleti`,
							},
							{
								key: "drl3",
								content: `La cancellazione: può chiedere che i suoi dati vengano cancellati, qualora non siano più necessari alle nostre finalità, in caso di revoca del consenso o opposizione al trattamento, in caso di trattamento illecito, ovvero sussista un obbligo legale di cancellazione o si riferiscano a soggetti minori di anni quattordici;`,
							},
							{
								key: "drl4",
								content: `La limitazione: può chiedere che i suoi dati siano trattati solo ai fini della conservazione, con esclusioni di altri trattamenti, per il periodo necessario alla rettifica dei suoi dati, in caso di trattamento illecito per il quale si opponga alla cancellazione, qualora lei debba esercitare i suoi diritti in sede giudiziaria e i dati conservati dal Titolare le possono essere utili e, infine, in caso di opposizione al trattamento e sia in corso una verifica sulla prevalenza dei motivi legittimi del Titolare rispetto ai suoi.`,
							},
							{
								key: "drl5",
								content: `L'opposizione: può opporsi in qualunque momento al trattamento dei suoi dati, salvo che vi siano motivi legittimi del Titolare per procedere al trattamento che prevalgano sui suoi, per esempio per l'esercizio o la propria difesa in sede giudiziaria.`,
							},
							{
								key: "drl6",
								content: `La portabilità: può chiedere di ricevere i suoi dati, o di farli trasmettere ad altro titolare da lei indicato, in un formato strutturato, di uso comune e leggibile da dispositivo automatico.`,
							},
							{
								key: "drl7",
								content: `La revoca: può revocare il suo consenso all'utilizzo di cookie (Cookie Policy) in qualsiasi momento, poiché in questo caso costituisca la base del trattamento. La revoca del consenso comunque non pregiudica la liceità del trattamento basata sul consenso svolto prima della revoca stessa.`,
							},
						],
						key: "du1",
					},
					{
						key: "du2",
						content: `In qualsiasi momento l'utente può chiedere di esercitare i suddetti diritti a <span id="span_id_sito">{config.site.name}</span> rivolgendosi
		all'indirizzo mail: ${config.privacyAdmin.email}`,
					},

					{
						key: "du3",
						content: `Inoltre, l'utente ha diritto di proporre reclamo nei confronti dell'Autorità di controllo italiana: "Garante per la Protezione dei Dati Personali"
		nel caso in cui ritenga che i suoi diritti siano stati violati da ${config.site.name} o nel caso in cui non ritenga
		soddisfacente la risposta di ${config.site.name} alle sue richieste.`,
					},
				],
				key: "rights",
			},
			{
				title: "Trasferimento a Paesi extra UE",
				paragraphs: [
					{
						content: `Il presente sito potrebbe condividere alcuni dei dati raccolti con servizi localizzati al di fuori dell'area dell'Unione Europea. In particolare con
		Google, Facebook e Microsoft (LinkedIn) tramite i social plugin e il servizio di Google Analytics. Il trasferimento è autorizzato e strettamente
		regolato dall'articolo 45, comma 1 del Regolamento (UE) 2016/679, per cui non occorre ulteriore consenso.`,
						key: "tpe1",
					},
					{
						content: `Non verranno mai trasferiti dati a Paesi terzi che non rispettino le condizioni previste dall'articolo 45 e ss, del Regolamento (UE).`,
						key: "tpe2",
					},
				],
				key: "transferExtraEu",
			},
			{
				title: "Modifiche al presente documento",
				paragraphs: [
					{
						content: `Il presente documento, che costituisce la privacy policy di questo sito, è pubblicato all'indirizzo: ${config.site.privacyPolicyUri}`,
						key: "ts1",
					},
					{
						key: "ts2",
						content: `Esso può essere soggetto a modifiche o aggiornamenti. Qualora si tratti di modifiche ed aggiornamenti rilevanti questi saranno segnalati con apposite
		notifiche agli utenti.`,
					},
					{
						key: "ts3",
						content: `Le versioni precedenti del documento saranno comunque consultabili a questa pagina.`,
					},
					{
						key: "ts4",
						content: `Il documento è stato aggiornato in data ${new Date(config.date).toLocaleDateString(
							"it-IT",
						)} per essere conforme alle disposizioni normative in materia, ed in particolare in conformità al Regolamento (UE) 2016/679.`,
					},
				],
				key: "timestamps",
			},
		],
	};

	return content;
}
