export interface IHeader {
	[x]: string;
}

export type Component = {
	downloadid: string;
	uri: string;
	headers: IHeader;
	targetfilename: string;
};
