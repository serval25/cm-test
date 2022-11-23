export interface RequestDTO {
	checked?: boolean;
	id?: string;
	requestor?: RequestorDTO;
	name: string;
	inputs: string[];
	results: string;
	requestorId: string;
	submittedTimestampUs: string;
	comment: string[];
	status: string;
}

export interface RequestorDTO {
	name: string;
	profilePic: string;
}