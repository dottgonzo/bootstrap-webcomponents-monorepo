export interface IHeader {
	[x: string]: string;
}

export type Component = {
	id?: string;
	style?: string;
	downloadid: string;
	uri: string;
	headers: IHeader;
	targetfilename: string;
};

export type Events = {
	downloadError: { downloaded: boolean; id: string; error: Error };
	downloadComplete: { downloaded: boolean; id: string };
};
