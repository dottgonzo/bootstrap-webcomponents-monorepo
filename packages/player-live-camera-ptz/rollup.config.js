/* eslint-disable @typescript-eslint/no-var-requires */
import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import ttypescript from "ttypescript";
import tsPlugin from "rollup-plugin-typescript2";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import replace from '@rollup/plugin-replace';
import path from "path";

const tsconfig = require("./tsconfig.json");

const production = process.env.PRODUCTION ? true : false;

function tsalias() {
	const paths = [];

	for (const value in tsconfig.compilerOptions.paths) {
		paths.push({
			replacement: path.resolve(path.resolve(__dirname), tsconfig.compilerOptions.paths[value][0].replace("./", "").replace("/*", "")),
			find: value.replace("./", "").replace("/*", ""),
		});
	}

	return paths;
}

export default {
	input: "app/core/init.ts",
	output: {
		sourcemap: true,
		format: "iife",
		file: "dist/release.js",
		name: "release",
	},
	plugins: [
		json(),
		copy({
			targets: [
				{ src: "public/**/*", dest: "dist" },
				{ src: "extra/**/*", dest: "dist" },
				{ src: "app/types/**/*", dest: "dist" },
				{ src: "assets/**/*", dest: "dist" },
			],
		}),
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
				scss: { includePaths: ["app/**/*.scss"] },
			}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
				customElement: true,
			},
		}),
		replace({
			preventAssignment: true,
			values: {
				':#0d6efd': ':var(--bs-primary,#07689f)',
				':#6c757d': ':var(--bs-secondary,#c9d6df)',
				':#198754': ':var(--bs-success,#11d3bc)',
				':#dc3545': ':var(--bs-danger,#f67280)',
				':#0dcaf0': ':var(--bs-info,#a2d5f2)',
				':#198754': ':var(--bs-warning,#ffc107)',
			},
			delimiters: ['', '']
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: "bundle.css" }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ["svelte"],
		}),
		alias({
			entries: tsalias(),
		}),
		commonjs(),
		typescript({
			sourceMap: true,
			inlineSources: !production,
		}),
		tsPlugin({
			typescript: ttypescript,
		}),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		// !production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload({ watch: "dist", delay: 200 }),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production &&
		terser({
			output: {
				comments: false,
			},
		}),
	],

	watch: {
		clearScreen: false,
	},
};
