<svelte:options tag="hb-auth" />

<script lang="ts">
	/**
	 * Svelte Video Login/Register/Forget Password WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import { dictionary } from "@app/functions/i18n";
	import type { Component } from "@app/types/webcomponent.type";
	import { LanguageTranslator } from "@htmlbricks/hb-jsutils";

	import { createEventDispatcher } from "svelte";
	import { get_current_component, onMount } from "svelte/internal";
	export let id: string;

	export let type: Component["type"];

	export let i18nlang: string;

	export let sessionkey: string;

	export let redirectonlogin: string;
	export let redirectoncreate: string;
	export let loginuri: string;
	export let registeruri: string;
	export let activateuri: string;
	export let recoveruri: string;
	export let requestmethod: string;
	export let appendqueryparams: string;
	export let appendbodyparams: string;
	export let logouri: string;
	export let oauth2providers: string;
	export let disableregister: boolean = null;
	export let disablelocal: boolean;

	export let passwordpattern: string;
	export let recoverycode: string;

	export let enable_recover_password: boolean;
	export let email: string;

	// export let expectmailconfirm: string;
	let oauth2ProvidersObj: Component["oauth2providers"];

	let checkValidity: boolean;
	let rememberMe: boolean;
	let passwordRepeated: string;
	let password: string;

	let recoveryCodeExists = false;
	let translator: LanguageTranslator;
	// onMount(() => {
	// 	translator = new LanguageTranslator({ dictionary, lang: i18nlang });
	// });
	$: {
		if (!disablelocal) disablelocal = false;
		if (!translator) {
			translator = new LanguageTranslator({ dictionary, lang: i18nlang });
		} else if (translator && i18nlang && translator.lang && translator.lang !== i18nlang) {
			translator = new LanguageTranslator({ dictionary, lang: i18nlang });
		}
		if (!id) {
			id = null;
		}
		if (
			typeof enable_recover_password === "string" &&
			(enable_recover_password === "yes" || enable_recover_password === "true" || enable_recover_password === "")
		) {
			enable_recover_password = true;
		} else if (!enable_recover_password) {
			enable_recover_password = false;
		}
		if (!passwordpattern) {
			passwordpattern = null;
		}

		if (!redirectonlogin) {
			redirectonlogin = null;
		}
		if (!redirectoncreate) {
			redirectoncreate = null;
		}

		if (!sessionkey) {
			sessionkey = "_lg";
		}
		if (!oauth2providers) {
			oauth2ProvidersObj = null;
			oauth2providers = null;
		} else {
			try {
				oauth2ProvidersObj = JSON.parse(oauth2providers);
			} catch (err) {
				console.error("wrong oauth provider params");
				oauth2ProvidersObj = null;
			}
		}
		if (!email) {
			email = "";
		}
		if (!password) {
			password = "";
		}
		if (!passwordRepeated) {
			passwordRepeated = "";
		}
		if (!recoverycode && location?.href && location.href.split("recoverycode=").length > 1) {
			recoverycode = location.href.split("recoverycode=")[1].split("&")[0];
			recoveryCodeExists = true;
		} else if (!recoverycode) {
			recoverycode = "";
		}
		if (location?.href && location.href.split("access_token=").length > 1 && location.href.includes("googleapis")) {
			const provider = "google";
			const token = location.href.split("access_token=")[1].split("&")[0];
			dispatch("getProviderToken", { provider, token });
		}
		if (location?.href && location.href.includes("provider=") && location.href.split("provider=")[1].split("&")[0] === "github") {
			const provider = "github";
			const token = location.href.split("code=")[1].split("&")[0];
			// TODO: try to fetch token
			dispatch("getProviderToken", { provider, token, tmpCode: token });
		}
		if (!email && location?.href && location.href.split("recoveryemail=").length > 1) {
			email = location.href.split("recoveryemail=")[1].split("&")[0];
		}
		if (!type && location?.href && location.href.split("recoverytype=").length > 1) {
			type = location.href.split("recoverytype=")[1].split("&")[0] as unknown as Component["type"];
		} else if (!type) {
			type = "login";
		}
		if (!logouri) {
			logouri = "";
		}
		// validation
		checkValidity = false;

		// fetch request config
		if (!appendqueryparams) {
			appendqueryparams = null;
		}
		if (!appendbodyparams) {
			appendbodyparams = null;
		}
		if (!loginuri) {
			loginuri = null;
		}
		if (!registeruri) {
			registeruri = null;
		}
		if (!recoveruri) {
			recoveruri = null;
		}
		if (!disableregister || (disableregister as unknown as string) === "no") {
			disableregister = false;
		}
		if (!activateuri) {
			activateuri = null;
		}
		if (appendqueryparams) {
			if (loginuri)
				loginuri = loginuri.split("/")[loginuri.split("/").length - 1].includes("?")
					? `${loginuri}&${appendqueryparams}`
					: `${loginuri}?${appendqueryparams}`;
			if (registeruri)
				registeruri = registeruri.split("/")[registeruri.split("/").length - 1].includes("?")
					? `${registeruri}&${appendqueryparams}`
					: `${registeruri}?${appendqueryparams}`;
		} else {
			appendqueryparams = null;
		}

		if (!requestmethod) {
			requestmethod = "POST";
		} else {
			requestmethod = requestmethod.toUpperCase();
		}
		// i18n
		// if (!language || !dictionary[language]) {
		// 	const autolang = navigator?.languages ? navigator.languages[0]?.split("-")[0]?.toLowerCase() : null;
		// 	if (autolang && dictionary[autolang]) {
		// 		language = autolang;
		// 	} else {
		// 		language = "en";
		// 	}
		// 	localDictionary = dictionary[language];
		// } else {
		// 	localDictionary = dictionary[language];
		// }

		console.log(disableregister);
	}
	// function getCookie(cname: string) {
	// 	let name = cname + "=";
	// 	let decodedCookie = decodeURIComponent(document.cookie);
	// 	let ca = decodedCookie.split(";");
	// 	for (let i = 0; i < ca.length; i++) {
	// 		let c = ca[i];
	// 		while (c.charAt(0) == " ") {
	// 			c = c.substring(1);
	// 		}
	// 		if (c.indexOf(name) == 0) {
	// 			return c.substring(name.length, c.length);
	// 		}
	// 	}
	// 	return "";
	// }
	// console.log(getCookie(cookierequestkeys));

	function checkValidityFn(type: "password" | "email" | "passwordRepeated") {
		checkValidity = true;
		if (type === "email") {
			if (email.length && email.length > 3 && email.split("@").length === 2 && email.split(".")[email.split(".").length - 1]?.length > 1) return true;
		} else if (type === "passwordRepeated") {
			if (password.length && password.length > 3 && passwordRepeated === password) return true;
		} else if (type === "password") {
			if (password.length && password.length > 3) return true;
		}
		return false;
	}

	async function socialLogin(providerName: string) {
		const provider = oauth2ProvidersObj.find((f) => f.provider === providerName);
		if (provider.uri) {
			location.href = provider.uri;
		} else if (provider.params) {
			if (!provider.params.client_id || !provider.params.redirect_url) return console.error("Missing client_id or redirect_url in oauth2ProvidersObj");
			let url: string;
			switch (providerName) {
				case "google":
					const googleScope = provider.params.scope || "https%3A//www.googleapis.com/auth/userinfo.email";
					url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${googleScope}&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${provider.params.redirect_url}/login&client_id=${provider.params.client_id}`;
					break;
				case "github":
					const githubScope = provider.params.scope || "user";
					url = `https://github.com/login/oauth/authorize?scope=${githubScope}&client_id=${provider.params.client_id}&redirect_uri=${provider.params.redirect_url}/login?provider=github`;
					break;
				default:
					return console.error("no provider uri composed for " + providerName);
			}
			if (url) {
				location.href = url;
			} else {
				return console.error("no provider url obtained!?", provider);
			}
		} else {
			console.error("no provider uri or params defined for " + providerName);
		}
	}

	async function login() {
		if (checkValidityFn("email") && checkValidityFn("password")) {
			console.log("request");
			if (loginuri) {
				try {
					let response;
					if (requestmethod === "GET") {
						response = await fetch(`${loginuri}`, {
							method: requestmethod, // *GET, POST, PUT, DELETE, etc.
							// mode: "cors", // no-cors, *cors, same-origin
							cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
							// credentials: "same-origin", // include, *same-origin, omit
							headers: {
								"Content-Type": "application/json",
								// 'Content-Type': 'application/x-www-form-urlencoded',
							},
							redirect: "follow", // manual, *follow, error
							referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
						});
					} else {
						let body = { email, password, rememberMe };
						if (appendbodyparams) Object.assign(body, JSON.parse(appendbodyparams));

						response = await fetch(`${loginuri}`, {
							method: requestmethod, // *GET, POST, PUT, DELETE, etc.
							// mode: "cors", // no-cors, *cors, same-origin
							cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
							// credentials: "same-origin", // include, *same-origin, omit
							headers: {
								"Content-Type": "application/json",
								// 'Content-Type': 'application/x-www-form-urlencoded',
							},
							redirect: "follow", // manual, *follow, error
							referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
							body: JSON.stringify(body), // body data type must match "Content-Type" header
						});
					}

					const serverAnswer = await response.json();
					const answer = serverAnswer;
					// answer.requestSent = { user, password, rememberMe, uri: loginuri };
					if (!answer.ok && !answer.token) {
						console.log(answer);
						throw new Error("invalid login");
					}

					if (rememberMe) setLoginOnStorage(JSON.stringify(answer));
					else setLoginSession(JSON.stringify(answer));

					if (redirectonlogin) location.href = redirectonlogin;
					dispatch("login", answer);
				} catch (err) {
					console.error(err);

					console.error("invalid login", { email, password, rememberMe });
				}
			} else {
				// const cookie = {
				// 	user,
				// 	password,
				// };
				// setLoginCookie(JSON.stringify(cookie));
				// if (redirectonlogin) location.href = redirectonlogin;

				dispatch("login", {
					email,
					password,
					rememberMe,
				});
			}
		} else {
			console.error("invalid login", { email, password, rememberMe });
		}
	}

	function setLoginOnStorage(tokenStringified: string, expire?: number) {
		localStorage.setItem(sessionkey, tokenStringified);
	}

	function setLoginSession(tokenStringified: string, expire?: number) {
		sessionStorage.setItem(sessionkey, tokenStringified);
	}
	async function register() {
		if (checkValidityFn("email") && checkValidityFn("password")) {
			if (registeruri) {
				try {
					let response;
					if (requestmethod === "GET") {
						response = await fetch(`${registeruri}`, {
							method: requestmethod, // *GET, POST, PUT, DELETE, etc.
							// mode: "cors", // no-cors, *cors, same-origin
							cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
							// credentials: "same-origin", // include, *same-origin, omit
							headers: {
								"Content-Type": "application/json",
								// 'Content-Type': 'application/x-www-form-urlencoded',
							},
							redirect: "follow", // manual, *follow, error
							referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
						});
					} else {
						let body = { email, password };
						if (appendbodyparams) Object.assign(body, JSON.parse(appendbodyparams));

						response = await fetch(`${registeruri}`, {
							method: requestmethod, // *GET, POST, PUT, DELETE, etc.
							// mode: "cors", // no-cors, *cors, same-origin
							cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
							// credentials: "same-origin", // include, *same-origin, omit
							headers: {
								"Content-Type": "application/json",
								// 'Content-Type': 'application/x-www-form-urlencoded',
							},
							redirect: "follow", // manual, *follow, error
							referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
							body: JSON.stringify(body), // body data type must match "Content-Type" header
						});
					}
					const answer = await response.json();
					answer.ok = true;
					answer.requestSent = { email, password };
					const cookie = {
						email,
						password,
					};
					// setLoginCookie(JSON.stringify(cookie));

					if (redirectoncreate) location.href = redirectoncreate;
					dispatch("register", answer);
				} catch (err) {
					console.error(err);
					console.error("invalid register", { email, password, uri: registeruri });
				}
			} else {
				// const cookie = {
				// 	user,
				// 	password,
				// };
				// setLoginCookie(JSON.stringify(cookie));
				// if (redirectoncreate) location.href = redirectoncreate;

				dispatch("register", {
					email,
					password,
				});
			}
		} else {
			console.error("invalid register", { email, password });
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	function switchType(t: Component["type"]) {
		email = "";
		password = "";
		passwordRepeated = "";
		rememberMe = false;
		checkValidity = false;
		type = t;
	}
	//test@tt.com
	function recoverOrActivate() {
		checkValidity = true;

		if (recoverycode && checkValidityFn("email") && checkValidityFn("password") && checkValidityFn("passwordRepeated")) {
			dispatch("recoverOrActivate", { password, recoverycode, email });
		} else {
			console.error("wrong params", recoverycode, password, passwordRepeated);
		}
	}

	function recoverPassword() {
		checkValidity = true;

		if (checkValidityFn("email")) {
			dispatch("recoverPassword", { email });
		} else {
			console.error("wrong params", email);
		}
	}
	function keyupkboard(k) {
		if (k.keyCode === 13) {
			switch (type) {
				case "login":
					return login();
				case "activate":
				case "recover":
					return recoverOrActivate();
				case "forgotpassword":
					return recoverPassword();
				case "register":
					return register();
			}
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<main class="form-signin" on:keyup={(k) => keyupkboard(k)}>
	<slot name="header">
		{#if logouri}
			<div class="mb-4 text-center">
				<img id="logoimg" src={logouri} alt="" />
			</div>
		{/if}
	</slot>

	{#if type === "login"}
		<h1 class="h3 mb-3 fw-normal">{translator?.translateWord("loginTitle")}</h1>
	{:else if type === "forgotpassword"}
		<h1 class="h3 mb-3 fw-normal">{translator?.translateWord("ForgotTitle")}</h1>
	{:else if type === "register"}
		<h1 class="h3 mb-3 fw-normal">{translator?.translateWord("registerTitle")}</h1>
	{:else if type === "activate" || type === "recover"}
		<h1 class="h3 mb-3 fw-normal">{translator?.translateWord("recoverTitle")}</h1>
	{/if}
	{#if oauth2ProvidersObj?.length}
		<div class="d-flex justify-content-center mt-1">
			<ul class="social-icons">
				{#each oauth2ProvidersObj as p (p.provider)}
					<li>
						<button
							on:click={() => {
								socialLogin(p.provider);
							}}
							class="btn btn-primary dot"><i class="bi-{p.provider}" /></button
						>
					</li>
				{/each}
			</ul>
		</div>
		{#if !disablelocal}
			<h1 class="h3 mb-3 fw-normal">Credenziali</h1>
		{/if}
	{/if}

	{#if !disablelocal && (type === "login" || type === "register")}
		<div class="form-floating">
			<input
				type="text"
				class="form-control {checkValidity ? (checkValidityFn('email') ? 'is-valid' : 'is-invalid') : ''}"
				bind:value={email}
				placeholder="name@example.com"
				required
			/>

			<label for="floatingInput">Email</label>
		</div>
		<div class="form-floating">
			<input
				type="password"
				class="form-control {checkValidity ? (checkValidityFn('password') ? 'is-valid' : 'is-invalid') : ''}"
				placeholder="Password"
				bind:value={password}
				required
				pattern={passwordpattern ? passwordpattern : ""}
			/>
			<label for="floatingPassword">Password</label>
		</div>
	{:else if type === "forgotpassword"}
		<div class="form-floating">
			<input
				type="text"
				class="form-control {checkValidity ? (checkValidityFn('email') ? 'is-valid' : 'is-invalid') : ''}"
				bind:value={email}
				placeholder="name@example.com"
				required
			/>

			<label for="floatingInput">Email</label>
		</div>
	{:else if type === "mailrecoverinfo"}
		<div class="form-floating">
			<div>{translator?.translateWord("recoverEmailText")}</div>
		</div>
	{:else if type === "activate" || type === "recover"}
		<div class="form-floating">
			{#if !recoveryCodeExists}
				<input type="text" class="form-control" placeholder="Codice temporaneo" bind:value={recoverycode} required />
			{:else}
				<input type="text" class="form-control" placeholder="Codice temporaneo" bind:value={recoverycode} disabled />
			{/if}
			<label for="floatingCode">{translator?.translateWord("temporaryCode")}</label>
		</div>
		<div class="form-floating">
			{#if !recoveryCodeExists || !email}
				<input
					type="text"
					class="form-control {checkValidity ? (checkValidityFn('email') ? 'is-valid' : 'is-invalid') : ''}"
					bind:value={email}
					placeholder="name@example.com"
					required
				/>
			{:else}
				<input
					type="text"
					class="form-control {checkValidity ? (checkValidityFn('email') ? 'is-valid' : 'is-invalid') : ''}"
					bind:value={email}
					placeholder="name@example.com"
					disabled
				/>
			{/if}

			<label for="floatingEmail">Email</label>
		</div>
		<div class="form-floating">
			<input
				type="password"
				class="form-control {checkValidity ? (checkValidityFn('password') ? 'is-valid' : 'is-invalid') : ''}"
				placeholder="Password"
				bind:value={password}
				required
				pattern={passwordpattern ? passwordpattern : ""}
			/>
			<label for="floatingPassword">{translator?.translateWord("newPassword")}</label>
		</div>
		<div class="form-floating">
			<input
				type="password"
				class="form-control {checkValidity ? (checkValidityFn('passwordRepeated') ? 'is-valid' : 'is-invalid') : ''}"
				placeholder="Ripteti Password"
				bind:value={passwordRepeated}
				required
				pattern={passwordpattern ? passwordpattern : ""}
			/>
			<label for="floatingPassword2">{translator?.translateWord("repeatPassword")}</label>
		</div>
	{/if}

	{#if type === "login" && !disablelocal}
		<div class="checkbox mb-3">
			<label>
				<input type="checkbox" bind:checked={rememberMe} />
				{translator?.translateWord("rememberMe")}
			</label>
		</div>
		<button class="w-100 btn btn-lg btn-primary" on:click={() => login()}>{translator?.translateWord("loginButton").toUpperCase()}</button>
		{#if enable_recover_password || !disableregister}
			<p style="margin-bottom:0px">
				{#if enable_recover_password}
					<button class="btn btn-link" on:click={() => switchType("forgotpassword")}>{translator?.translateWord("forgotPasswordButton")}</button>
				{/if}
				{#if enable_recover_password && !disableregister}/{/if}
				{#if !disableregister}
					<button class="btn btn-link" on:click={() => switchType("register")}>{translator?.translateWord("registerButton")}</button>
				{/if}
			</p>
		{/if}
	{:else if type === "register" && !disablelocal}
		<div class="checkbox mb-3">
			<label />
		</div>
		<button class="w-100 btn btn-lg btn-primary" on:click={() => register()}>{translator?.translateWord("registerButton").toUpperCase()}</button>
		<p style="margin-bottom:0px">
			<button class="btn btn-link" on:click={() => switchType("login")}>{translator?.translateWord("loginSwitch")}</button>
		</p>
	{:else if type === "mailrecoverinfo"}
		<p style="margin-bottom:0px">
			<button class="btn btn-link" on:click={() => switchType("login")}>{translator?.translateWord("loginSwitch")}</button>
		</p>
	{:else if type === "forgotpassword"}
		<div class="checkbox mb-3">
			<label />
		</div>
		<button class="w-100 btn btn-lg btn-primary" on:click={() => recoverPassword()}>{translator?.translateWord("recoverWord")}</button>
		<button class="btn btn-link" on:click={() => switchType("login")}>{translator?.translateWord("loginSwitch")}</button>
	{:else if type === "activate" || type === "recover"}
		<div class="checkbox mb-3">
			<label />
		</div>
		<button class="w-100 btn btn-lg btn-primary" on:click={() => recoverOrActivate()}>{translator?.translateWord("memo")}</button>
	{/if}

	<!-- <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p> -->
</main>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
