export interface IHeader {
	[x: string]: string;
}

export type Component = {
	downloadid: string;
	uri: string;
	headers: IHeader;
	targetfilename: string;
};

export type Events = {};
