<svelte:options tag="hb-terms-doc-privacy-it" />

<script type="ts">
	import type { Component } from "@app/types/webcomponent.type";

	export let config: Component["config"];
</script>

{#if config}
	<span class="stabilisation" />
	<p style="text-align: center;"><strong>INFORMATIVA PRIVACY </strong></p>
	<p style="text-align: center;"><strong><br />1 - Informazioni relative alla Privacy del sito</strong></p>
	<p style="text-align: left;">
		1. In questa sezione sono contenute le informazioni relative alle modalità di gestione di <span id="span_id_sito">{config.site.name}</span>, di
		proprietà di
		<span id="span_id_proprietario_sito">INGECO</span>, in riferimento al trattamento dei dati degli utenti del sito stesso.
	</p>
	<p>
		2. La presente informativa ha valore anche ai fini dell'articolo 13 del Regolamento (UE) n. 2016/679, relativo alla protezione delle persone fisiche con
		riguardo al trattamento dei dati personali nonché alla libera circolazione di tali dati, per i soggetti che interagiscono con <span id="span_id_sito"
			>{config.site.name}</span
		>.
	</p>
	<p>
		3. L'informativa è resa solo per <span id="span_id_sito">{config.site.name}</span> e non anche per altri siti web eventualmente consultati dall'utente tramite
		link in esso contenuti.
	</p>
	<p>
		4. Scopo del presente documento è fornire indicazioni circa le modalità, i tempi e la natura delle informazioni che i titolari del trattamento devono
		fornire agli utenti al momento della connessione alle pagine web di <span id="span_id_sito">{config.site.name}</span>, indipendentemente dagli scopi del
		collegamento stesso, secondo la legislazione Italiana ed Europea.
	</p>
	<p>
		5. L'informativa può subire modifiche a causa dell'introduzione di nuove norme al riguardo, si invita pertanto l'utente a controllare periodicamente la
		presente pagina.
	</p>
	<p>
		6. Se l'utente ha meno di quattordici anni, ai sensi dell'art.8, c.1 regolamento (UE) 2016/679, e dell'Art. 2 - Quinquies del D.Lgs 196/2003, così come
		modificato dal D.Lgs 181/18, dovrà legittimare il suo consenso attraverso l'autorizzazione dei genitori o di chi ne fa le veci.
	</p>
	<p style="text-align: center;"><strong><br />2 - Titolare del trattamento</strong></p>
	<p>
		1. Il titolare del trattamento è la persona fisica o giuridica, l'autorità pubblica, il servizio o altro organismo che, singolarmente o insieme ad
		altri, determina le finalità e i mezzi del trattamento di dati personali. Si occupa anche dei profili sulla sicurezza.
	</p>
	<p>
		2. Relativamente al presente sito web il titolare del trattamento è: <span id="span_id_titolaretrattamento">{config.privacyAdmin.name}</span>, e per
		ogni chiarimento o esercizio dei diritti dell'utente potrà contattarlo al seguente indirizzo mail:
		<span id="span_id_mailtitolaretrattamento">{config.privacyAdmin.email}</span>.
	</p>
	<p style="text-align: center;"><strong><br />3 - Luogo trattamento dati</strong></p>
	<p style="text-align: left;">
		1. Il trattamento dei dati generato dall'utilizzo di <span id="span_id_sito">{config.site.name}</span> avviene presso
		<span id="span_id_luogo_titolare">{config.company.address}</span>.<strong><br /></strong>
	</p>
	<p>
		2. In caso di necessità, i dati connessi al servizio newsletter possono essere trattati dal responsabile del trattamento o soggetti da esso incaricati a
		tal fine presso la relativa sede.
	</p>
	<p style="text-align: center;"><strong><br />4 - Base giuridica del trattamento</strong></p>
	<p style="text-align: left;">
		1. Il trattamento dei dati personali da parte di <span id="span_id_sito">{config.site.name}</span> si basa sul consenso – ai sensi dell'art. 6, par. 1, lett.
		a) del Regolamento UE 2016/679 – espresso dall'utente mediante la navigazione su questo sito web e la sua consultazione, così accettando la presente informativa.
	</p>
	<p style="text-align: left;">
		2. Il consenso è facoltativo e può essere revocato in qualsiasi momento mediante richiesta inviata a mezzo email a <span
			id="span_id_mailtitolaretrattamento">dev@ciccio.pasticcio</span
		> precisando che, in tal caso, in assenza di consenso non potranno essere erogati alcuni servizi e la navigazione sul sito web potrebbe essere compromessa.
	</p>
	<p style="text-align: center;"><strong><br />5</strong><em><strong> - </strong></em><strong>Cookies</strong></p>
	<p style="text-align: left;">
		1. In questa sezione viene descritto in che modo questo Sito e terze parti utilizzano i cookie e tecnologie similari. L'utilizzo dei cookie avviene nel
		rispetto della relativa normativa europea (direttiva 2009/136/CE ha modificato la direttiva 2002/58/CE "E Privacy) e nazionale (Provvedimento Garante
		per la protezione dei dati personali dell'8 maggio 2014 e successivi chiarimenti nonché Linee Guida cookie e altri strumenti di tracciamento del 10
		giugno 2021 n.231).
	</p>
	<p style="text-align: left;">
		2. Per avere informazioni complete riguardo ai cookies visitare la nostra cookie policy: <span id="span_id_cookie_policy"
			>https://priv.com/uriterms</span
		>.
	</p>
	<p style="text-align: center;"><strong><br />6 - Tipologia di trattamento dati</strong></p>
	<p style="text-align: left;">
		1. Il trattamento dei dati personali è necessario per il perseguimento del legittimo interesse del titolare del trattamento per finalità di fornire
		informazioni circa l'attività di <span id="span_id_sito">{config.site.name}</span> ai sensi dell'art. 6, par. 1, lett. f) del Regolamento UE 2016/679, nel
		rispetto di quanto previsto dal medesimo Regolamento.
	</p>
	<p>
		2. Il presente sito fa uso di Log Files nei quali vengono conservate informazioni raccolte in maniera automatizzata durante le visite degli utenti. Le
		informazioni raccolte potrebbero essere le seguenti:
	</p>
	<p style="padding-left: 30px;">- indirizzo internet protocol (IP);</p>
	<p style="padding-left: 30px;">
		- tipo di browser e parametri del dispositivo usato per connettersi al sito;<br />- nome dell'internet service provider (ISP);
	</p>
	<p style="padding-left: 30px;">- data e orario di visita;</p>
	<p style="padding-left: 30px;">- pagina web di provenienza del visitatore (referral) e di uscita;</p>
	<p style="padding-left: 30px;">- eventualmente il numero di click.</p>
	<p>
		2. Le suddette informazioni sono trattate in forma automatizzata e raccolte in forma esclusivamente aggregata al fine di verificare il corretto
		funzionamento del sito, e per motivi di sicurezza. Tali informazioni saranno trattate in base ai legittimi interessi del titolare.
	</p>
	<p>
		3. A fini di sicurezza (filtri antispam, firewall, rilevazione virus), i dati registrati automaticamente possono eventualmente comprendere anche dati
		personali come l'indirizzo Ip, che potrebbe essere utilizzato, conformemente alle leggi vigenti in materia, al fine di bloccare tentativi di
		danneggiamento al sito medesimo o di recare danno ad altri utenti, o comunque attività dannose o costituenti reato. Tali dati non sono mai utilizzati
		per l'identificazione o la profilazione dell'utente, ma solo a fini di tutela del sito e dei suoi utenti, tali informazioni saranno trattate in base ai
		legittimi interessi del titolare.
	</p>
	<p style="text-align: center;"><strong><br />7 - Tipologia di dati acquisti</strong></p>
	<p style="text-align: left;">
		1. <span id="span_id_sito">{config.site.name}</span> raccoglie i dati degli utenti direttamente dal sito o da terze parti. I dati sono necessari per la navigazione
		del sito.
	</p>
	<p style="text-align: left;">2. I dati raccolti sono da <span id="span_id_sito">{config.site.name}</span> sono:</p>
	<p style="text-align: left; padding-left: 30px;"><span id="span_id_raccolta_dati_utente">email</span></p>
	<p style="text-align: center;"><strong><br />8 - Dati forniti dall'utente</strong></p>
	<p>
		1. Qualora il sito consenta l'inserimento di commenti, oppure in caso di specifici servizi richiesti dall'utente, ivi compresi la possibilità di inviare
		il Curriculum Vitae per un eventuale rapporto lavorativo, il sito rileva automaticamente e registra alcuni dati identificativi dell'utente, compreso
		l'indirizzo mail. Tali dati si intendono volontariamente forniti dall'utente al momento della richiesta di erogazione del servizio.
	</p>
	<p>
		2. Inserendo un commento o altra informazione l'utente accetta espressamente l'informativa privacy. I dati ricevuti verranno utilizzati esclusivamente
		per l'erogazione del servizio richiesto e per il solo tempo necessario per la fornitura del servizio.
	</p>
	<p>
		3. Le informazioni che gli utenti del sito riterranno di rendere pubbliche tramite i servizi e gli strumenti messi a disposizione degli stessi, sono
		fornite dall'utente consapevolmente e volontariamente, esentando il presente sito da qualsiasi responsabilità in merito ad eventuali violazioni delle
		leggi. Spetta all'utente verificare di avere i permessi per l'immissione di dati personali di terzi o di contenuti tutelati dalle norme nazionali ed
		internazionali.
	</p>
	<p>
		4. L'invio facoltativo, esplicito e volontario di posta elettronica agli indirizzi indicati su questo sito comporta la successiva acquisizione
		dell'indirizzo del mittente, necessario per rispondere alle richieste, nonché degli eventuali altri dati personali inseriti nella missiva.
	</p>
	<p>
		5. Specifiche informative di sintesi verranno progressivamente riportate o visualizzate nelle pagine del sito predisposte per particolari servizi a
		richiesta.
	</p>
	<p style="text-align: center;"><strong><br />9 - Finalità del trattamento dati</strong></p>
	<p>1. I dati raccolti dal sito durante il suo funzionamento sono utilizzati per finalità sopra indicate e per le seguenti finalità:</p>
	<p style="padding-left: 30px;"><span id="span_id_finalita_sito">accesso alla piattaforma e gestione dei servizi</span></p>
	<p style="padding-left: 30px; text-align: center;"><strong><br />10 - Conservazione Dati</strong></p>
	<p>
		1. Conformemente a quanto prescritto dall'art. 5.1(c) del Regolamento, i sistemi informativi e i programmi informatici utilizzati da <span
			id="span_id_sito">{config.site.name}</span
		> sono configurati in modo da ridurre al minimo l'uso di dati personali e identificativi; tali dati saranno trattati solo nella misura necessaria per il
		conseguimento delle finalità indicate nella presente Policy.
	</p>
	<p>
		2. I dati verranno conservati per il periodo di tempo strettamente necessario al conseguimento delle finalità in concreto perseguite e, in ogni caso, il
		criterio utilizzato per determinare il periodo di conservazione è improntato al rispetto dei termini consentiti dalle leggi applicabili e dai principi
		di minimizzazione del trattamento e limitazione della conservazione.
	</p>
	<p>3. Nello specifico, i dati verranno conservati per i seguenti periodi:</p>
	<p style="padding-left: 30px;"><span id="span_id_periodo_trattamento1">500000 gggg</span></p>

	<p>
		4. I dati utilizzati a fini di sicurezza (blocco tentativi di danneggiamento del sito) sono conservati per il tempo strettamente necessario al
		raggiungimento del fine anteriormente indicato.
	</p>
	<p style="text-align: center;"><strong><br />11 - Pagamenti</strong></p>
	<p>
		1. <span id="span_id_sito">{config.site.name}</span> utilizza servizi di pagamento per eseguire pagamenti con carta di credito, bonifico bancario o
		altri strumenti. <span id="span_id_sito">{config.site.name}</span> non raccoglie o acquisisce i dati usati per il pagamento.
	</p>
	<p>
		2. I dati per il pagamento sono raccolti e acquisiti direttamente dal gestore del servizio di pagamento, come l'ente carta di credito, Paypal, Stripe o
		simili. Questi servizi possono effettuare invio di messaggi verso l'utente, per esempio email o sms di notifiche del pagamento.
	</p>
	<p>
		3. I dati acquisiti e l'utilizzo degli stessi da parte di servizi terzi sono regolamentati dalle rispettive Privacy Policy alle quali si prega di fare
		riferimento.
	</p>
	<p style="padding-left: 30px;">
		PayPal, Fornitore del servizio: PayPal, Inc. Finalità del servizio: effettuare pagamenti online Dati personali raccolti: tipologie di dati secondo
		quanto specificato dalla privacy policy del servizio Luogo del trattamento: secondo quanto specificato dalla privacy policy del servizio Privacy Policy
		(https://www.paypal.com/it/webapps/mpp/ua/privacy-full)
	</p>
	<p style="padding-left: 30px;">
		Stripe, Fornitore del servizio: Stripe, Inc. Finalità del servizio: effettuare pagamenti online Dati personali raccolti: tipologie di dati secondo
		quanto specificato dalla privacy policy del servizio. Luogo del trattamento: secondo quanto specificato dalla privacy policy del servizio Privacy Policy
		(https://stripe.com/it/privacy)
	</p>
	<p style="text-align: center;"><strong><br />12 - Moduli di contatto</strong></p>
	<p>
		1. L'utente può compilare il/i moduli di contatto/richiesta informazioni, inserendo i propri dati e acconsentendo al loro uso per rispondere alle
		richieste di natura indicata nella intestazione del modulo.
	</p>
	<p>2. Dati personali che potrebbero essere raccolti:</p>
	<p style="padding-left: 30px;"><span id="span_id_dati_contatto">email</span></p>
	<p style="padding-left: 30px; text-align: center;"><strong><br />13 - Interazione social network</strong></p>
	<p>
		1. Il presente sito incorpora anche plugin e/o bottoni per i social network, al fine di consentire una facile condivisione dei contenuti sui vostri
		social network preferiti. Tali plugin sono programmati in modo da non impostare alcun cookie all'accesso della pagina, per salvaguardare la privacy
		degli utenti. Eventualmente i cookie vengono impostati, se così previsto dai social network, solo quando l'utente fa effettivo e volontario uso del
		plugin. Si tenga presente che se l'utente naviga avendo effettuato il login nel social network allora ha già acconsentito all'uso dei cookie veicolati
		tramite questo sito al momento dell'iscrizione al social network.
	</p>
	<p>
		2. Questo tipo di servizi permette di effettuare interazioni con i social network, o con altre piattaforme esterne, direttamente dalle pagine di <span
			id="span_id_sito">{config.site.name}</span
		>.
	</p>
	<p>
		3. Le interazioni e le informazioni acquisite da <span id="span_id_sito">{config.site.name}</span> sono in ogni caso soggette alle impostazioni privacy dell'Utente
		relative ad ogni social network. Nel caso in cui sia installato un servizio di interazione con i social network, è possibile che, anche nel caso gli Utenti
		non utilizzino il servizio, lo stesso raccolga dati di traffico relativi alle pagine in cui è installato.
	</p>
	<p style="padding-left: 30px;">
		Pulsante e widget sociali di Linkedin (LinkedIn Corporation). Il pulsante e i widget sociali di LinkedIn sono servizi di interazione con il social
		network Linkedin, forniti da LinkedIn Corporation. Dati Personali raccolti: Cookie e Dati di utilizzo. Luogo del trattamento: Stati Uniti – Privacy
		Policy: https://www.linkedin.com/legal/privacy-policy
	</p>
	<p style="padding-left: 30px;">
		Pulsante Mi Piace e widget sociali di Facebook (Facebook, Inc.) Il pulsante "Mi Piace" e i widget sociali di Facebook sono servizi di interazione con il
		social network Facebook, forniti da Facebook, Inc. Dati Personali raccolti: Cookie e Dati di utilizzo. Luogo del trattamento: Stati Uniti – Privacy
		Policy: https://www.facebook.com/privacy/explanation.
	</p>
	<p style="padding-left: 30px;">
		Pulsante Tweet e widget sociali di Twitter (Twitter, Inc.) Il pulsante Tweet e i widget sociali di Twitter sono servizi di interazione con il social
		network Twitter, forniti da Twitter, Inc. Dati Personali raccolti: Cookie e Dati di utilizzo. Luogo del trattamento: Stati Uniti – Privacy Policy:
		https://twitter.com/en/privacy.
	</p>
	<p style="padding-left: 30px;">
		Pulsante +1 e widget sociali di Google+ (Google Inc.) Il pulsante +1 e i widget sociali di Google+ sono servizi di interazione con il social network
		Google+, forniti da Google Inc. Dati Personali raccolti: Cookie e Dati di utilizzo. Luogo del trattamento: Stati Uniti – Privacy Policy:
		https://policies.google.com/privacy?hl=it.
	</p>
	<p style="padding-left: 30px;">
		Pulsante Pin It e widget sociali di Pinterest (Pinterest Inc.)<br />Pulsante Pin It e i widget sociali di Pinterest sono servizi di interazione con il
		social network Pinterest, fornito da Pinterest Inc.Dati Personali raccolti: Cookie e Dati di utilizzo. Luogo del trattamento: USA – Privacy Policy:
		https://policy.pinterest.com/it/privacy-policy
	</p>
	<p style="padding-left: 30px;">
		Pulsante e widget sociali di Instagram (Instagram, Inc.)<br />Il pulsante e i widget sociali di Instagram sono servizi di interazione con il social
		network Instagram, fornito da Instagram, Inc. Dati Personali raccolti: Cookie e Dati di utilizzo Luogo del trattamento: USA – Privacy Policy:
		https://help.instagram.com/196883487377501
	</p>
	<p style="padding-left: 30px; text-align: center;"><strong><br />14 - Diritti dell'utente</strong></p>
	<p>
		1. Viene garantito all'utente il rispetto dei suoi diritti nell'ambito della protezione dei dati personali. In linea con quanto ripreso e affermato dal
		GDPR, in relazione al trattamento dei propri dati personali, l'utente ha diritto di chiedere al Titolare:
	</p>
	<p style="padding-left: 30px;">
		• L'accesso: l'utente può chiedere conferma che sia o meno in essere un trattamento di dati che lo riguarda, oltre a maggiori chiarimenti circa le
		informazioni di cui alla presente informativa;
	</p>
	<p style="padding-left: 30px;">• La rettifica: può chiedere di rettificare o integrare i dati che ha fornito, qualora inesatti o incompleti;</p>
	<p style="padding-left: 30px;">
		• La cancellazione: può chiedere che i suoi dati vengano cancellati, qualora non siano più necessari alle nostre finalità, in caso di revoca del
		consenso o opposizione al trattamento, in caso di trattamento illecito, ovvero sussista un obbligo legale di cancellazione o si riferiscano a soggetti
		minori di anni quattordici;
	</p>
	<p style="padding-left: 30px;">
		• La limitazione: può chiedere che i suoi dati siano trattati solo ai fini della conservazione, con esclusioni di altri trattamenti, per il periodo
		necessario alla rettifica dei suoi dati, in caso di trattamento illecito per il quale si opponga alla cancellazione, qualora lei debba esercitare i suoi
		diritti in sede giudiziaria e i dati conservati dal Titolare le possono essere utili e, infine, in caso di opposizione al trattamento e sia in corso una
		verifica sulla prevalenza dei motivi legittimi del Titolare rispetto ai suoi.
	</p>
	<p style="padding-left: 30px;">
		• L'opposizione: può opporsi in qualunque momento al trattamento dei suoi dati, salvo che vi siano motivi legittimi del Titolare per procedere al
		trattamento che prevalgano sui suoi, per esempio per l'esercizio o la propria difesa in sede giudiziaria.
	</p>
	<p style="padding-left: 30px;">
		• La portabilità: può chiedere di ricevere i suoi dati, o di farli trasmettere ad altro titolare da lei indicato, in un formato strutturato, di uso
		comune e leggibile da dispositivo automatico.
	</p>
	<p style="padding-left: 30px;">
		• La revoca: può revocare il suo consenso all'utilizzo di cookie (Cookie Policy) in qualsiasi momento, poiché in questo caso costituisca la base del
		trattamento. La revoca del consenso comunque non pregiudica la liceità del trattamento basata sul consenso svolto prima della revoca stessa.
	</p>
	<p>
		2. In qualsiasi momento l'utente può chiedere di esercitare i suddetti diritti a <span id="span_id_sito">{config.site.name}</span> rivolgendosi
		all'indirizzo mail: <span id="span_id_mailtitolaretrattamento">dev@ciccio.pasticcio</span>.
	</p>
	<p>
		3. Inoltre, l'utente ha diritto di proporre reclamo nei confronti dell'Autorità di controllo italiana: "Garante per la Protezione dei Dati Personali"
		nel caso in cui ritenga che i suoi diritti siano stati violati da <span id="span_id_sito">{config.site.name}</span> o nel caso in cui non ritenga
		soddisfacente la risposta di <span id="span_id_sito">{config.site.name}</span> alle sue richieste.
	</p>
	<p style="text-align: center;"><strong><br />15 - Trasferimento a Paesi extra UE</strong></p>
	<p>
		1. Il presente sito potrebbe condividere alcuni dei dati raccolti con servizi localizzati al di fuori dell'area dell'Unione Europea. In particolare con
		Google, Facebook e Microsoft (LinkedIn) tramite i social plugin e il servizio di Google Analytics. Il trasferimento è autorizzato e strettamente
		regolato dall'articolo 45, comma 1 del Regolamento (UE) 2016/679, per cui non occorre ulteriore consenso.
	</p>
	<p>2. Non verranno mai trasferiti dati a Paesi terzi che non rispettino le condizioni previste dall'articolo 45 e ss, del Regolamento (UE).</p>
	<p style="text-align: center;"><strong><br />16. <span class="flou">588552225 5528 2252828</span></strong></p>
	<p style="text-align: left;">
		<span class="flou"
			>2. 58 25282222 8822 255225 8 5528 52288 522228 82 2528255 828825 2 82552225, 552225252 82 222252522 288552 58 888552225 82822 55 82225852 5882888
			222 55225822528, 588582528222, 22582885 2 58825528222 222 55225822525 528 5528. 58 25522522222 88222 2222225522 22585222 825522228 82225252888 2/2
			2282252888, 822 22558825 2525282252882 2 822 8228852 825222522222 825528522 5882 28258825 82588522.</span
		>
	</p>
	<p>
		<span class="flou"
			>5. 88252 58 28228552, 82 588528 8588, 2225288252 58252 5882882 58 5528 852222582 58 8285588528 828282828 2288'25252822528222 528 8822 (225822582
			52282882552882, 82222588582, 255222822, 822588, 52282882552258 58 8882225) 288252 82222228 2822528 (8222 225282258 58 8258828 2282888 22528,
			82558258 2282588, 5282822 25288525, 8288225 822252528852, 5222282 58 8225288528222).</span
		>
	</p>
	<p style="text-align: center;"><strong><br />17. Modifiche al presente documento</strong></p>
	<p>1. Il presente documento, che costituisce la privacy policy di questo sito, è pubblicato all'indirizzo:</p>
	<p style="padding-left: 30px;"><span id="span_id_altrourl" class="encours">cicciopasto</span></p>
	<p>
		2. Esso può essere soggetto a modifiche o aggiornamenti. Qualora si tratti di modifiche ed aggiornamenti rilevanti questi saranno segnalati con apposite
		notifiche agli utenti.
	</p>
	<p>3. Le versioni precedenti del documento saranno comunque consultabili a questa pagina.</p>
	<p>
		4. Il documento è stato aggiornato in data <span id="span_id_data" class="encours"><span class="variable_vide">________</span></span> per essere conforme
		alle disposizioni normative in materia, ed in particolare in conformità al Regolamento (UE) 2016/679.
	</p>
{/if}
