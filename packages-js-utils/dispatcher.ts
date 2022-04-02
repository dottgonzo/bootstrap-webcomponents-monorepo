import { get_current_component } from "svelte/internal";
import { createEventDispatcher } from "svelte";

let dispatcher: SvelteDispatcher;

class SvelteDispatcher {
	svelteDispatch = createEventDispatcher();
	component = get_current_component();
	dispatch(name: string, detail: any) {
		this.svelteDispatch(name, detail);
		this.component.dispatchEvent && this.component.dispatchEvent(new CustomEvent(name, { detail }));
	}
}

export function dispatch(name: string, detail: any) {
	if (!dispatcher) dispatcher = new SvelteDispatcher();
	dispatcher.dispatch(name, detail);
}
