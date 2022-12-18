import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	load_draw: { control: { type: "object" } },
	save: { control: { type: "object" } },
	debug: {
		options: ["yes", "no"],
		control: { type: "select" }, // Automatically inferred when 'options' is defined
	},
	event: { action: "eventEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "testpart", description: "test css part on 2 div tag" }];
export const htmlSlots: HtmlSlot[] = [{ name: "skelcontent", description: "test slot" }];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {},
	},
	{
		name: "withLoadDraw",
		data: {
			load_draw: {
				type: "json",
				draw: [
					{
						path: [
							[196, 57, 0.5],
							[198, 57, 0.5],
							[202, 57, 0.5],
							[219, 57, 0.5],
							[223, 57, 0.5],
						],
						color: "rgb(0,0,0)",
						id: "1671124484963",
						pathData:
							"M 196 54.28875 Q 196 54.28875 202.6125 54.537796875 209.225 54.78684375 209.57834293663552 54.84477326089788 209.93168587327105 54.90270277179576 210.24803371116735 55.07042606940648 210.56438154906365 55.2381493670172 210.81061258608528 55.49810577780627 211.05684362310691 55.75806218859534 211.20717740467902 56.083034207731316 211.35751118625112 56.408006226867286 211.3962077257588 56.76396919816234 211.43490426526654 57.11993216945741 211.3579120248085 57.46961667585187 211.2809197843505 57.81930118224632 211.09629987182666 58.12609516361293 210.91167995930283 58.43288914497954 210.6387621282894 58.664671190483475 210.3658442972759 58.8964532359874 210.03320311672323 59.02895570427987 209.70056193617054 59.161458172572345 209.34302502549124 59.18080802024588 208.98548811481194 59.200157867919415 208.64048968293474 59.104329160814736 208.29549125105754 59.008500453710056 207.99915272487073 58.80752648275734 207.7028141986839 58.60655251180463 207.48616230010498 58.3214753048146 207.26951040152608 58.03639809782457 207.15522864152683 57.69706531362217 207.0409468815276 57.35773252941976 207.0410005905474 56.999672400086126 207.0410542995672 56.64161227075248 207.1554378542575 56.30231378634754 207.2698214089478 55.96301530194259 207.48655882093817 55.67800310334964 207.70329623292858 55.39299090475669 207.99969503797055 55.192105844404324 208.29609384301253 54.99122078405196 208.6411210079765 54.89549558078758 208.98614817294046 54.7997703775232 209.34367926257636 54.81922748539759 209.70121035221229 54.838684593271985 210.03381176705625 54.97128684795452 210.36641318190019 55.10388910263704 210.63926146601972 55.335753013058856 210.91210975013928 55.56761692348067 211.09663761616218 55.87446627701448 211.2811654821851 56.18131563054828 211.35805281382812 56.53102321887873 211.43494014547116 56.880730807209176 211.396136818815 57.23668215352423 211.35733349215883 57.59263349983927 211.20690222574746 57.91756040421771 211.0564709593361 58.24248730859615 210.81016194647282 58.50236983837718 210.56385293360952 58.762252368158215 210.24745479296035 58.929880753871444 209.93105665231116 59.097509139584666 209.57769635272305 59.15533264499632 209.22433605313495 59.21315615040797 209.22466802656749 59.21315620020398 209.225 59.21315625 202.6125 59.462203125 196 59.71125 195.67556757774054 59.67185550565311 195.35113515548107 59.63246101130623 195.04555876084675 59.51656713812797 194.7399823662124 59.400673264949695 194.47102211361675 59.215015770294414 194.2020618610211 59.02935827563913 193.98534973298206 58.78472758181928 193.76863760494302 58.54009688799943 193.6167689205244 58.25071094243375 193.46490023610576 57.961324996868065 193.38670161038146 57.64400292430956 193.3085029846572 57.326680851751064 193.3085193254285 56.99986542596616 193.30853566619982 56.673050000181256 193.3867660237403 56.355735749071926 193.4649963812808 56.038421497962595 193.61689400353458 55.749050740712256 193.76879162578837 55.45967998346192 193.9855282158132 55.21507096207799 194.202264805838 54.97046194069406 194.4712436228383 54.78483134299228 194.74022243983856 54.5992007452905 195.04581042233232 54.48333743033112 195.35139840482609 54.36747411537173 195.67583476491282 54.328112064463994 196.00027112499956 54.28875001355625 196.0001355624998 54.28875000677813 Z",
						min: [196, 57],
						max: [223, 57],
						visible: true,
						actionIndex: 0,
						opacity: 1,
						type: "stroke",
					},
				],
				id: "stylus-paper",
				draw_id: "0.wh3036wc7x0.fevf9p1uqkg1671124483602",
				name: "test",
				version: 0,
			},
		},
	},
];
export const componentSetup: ComponentSetup & { examples: { name: string; description?: string; data: Component }[] } = {
	definitions: null as any,
	storybookArgs,
	styleSetup,
	author: null as any,
	contributors: [],
	owner: null as any,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-stylus-notebook",
	category: "editor",
	tags: ["editor", "draw", "input", "stylus", "notebook"],
	size: { layout: "fullscreen" },
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-stylus-notebook",
	version: null as any,
};
