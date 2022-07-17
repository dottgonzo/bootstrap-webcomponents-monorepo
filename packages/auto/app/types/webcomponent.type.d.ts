export type ComponentTemplate = {
	version: "0.0.1",
	id: "",
	tagName: "",
	repoName: "",
	iifePath: "",
	manifestPath?: "",
	manifestContent?: "",
	setup: any
}


export type Component = {
	id?: string;
	style?: string;
	layout?: ComponentTemplate
	body: {
		scheme?: string
		components: ComponentTemplate[]
	}


};

export type Events = {
	event: { component: string, data: any };
};
