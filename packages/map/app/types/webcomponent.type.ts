export type NMEA = {
	timestamp: number;
	status: "A";
	latitude: number;
	ns: "N" | "S";
	longitude: number;
	ew: "W" | "E";
	speed: number;
	datestamp: number;
	variation: number;
	vew: "E";
	checksum: string;
};
