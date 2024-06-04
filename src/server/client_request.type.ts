/**
 * Structured information extracted from the request object
 */
export type ClientRequest = {
	method: string;
	endPoint: string;
	root: string;
	resource: string;
	url: string;
	id?: string;
	params?: Params;
	body?: ClientBody;
	force?: ForcedParams;
	security?: Security;
};

/**
 * Identifiers of the body
 * The optional Id of the resource
 * The optional UserId
 */
export type ClientBody = {
	id?: string;
	userId?: string;
};

/**
 * Parameters to forced responses
 */
export type ForcedParams = {
	/** Milliseconds of forced waiting */
	delay?: number;
	/** Forced response status code */
	status?: number;
};

/**
 * Security information extracted from the request object
 */
export type Security = {
	anonymous: boolean;
	userId?: string;
};

/**
 * Expected parameters with values or undefined when not found
 */
export type Params = {
	q?: string;
	key?: string;
	value?: string;
	sort?: string;
	order?: "asc" | "desc";
};
