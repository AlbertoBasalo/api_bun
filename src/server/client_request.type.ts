

/**
 * Structured information extracted from the request object
 */
export type ClientRequest = {
  method: string;
  endPoint: string;
  root: string;
  resource: string;
  id?: string;
  params?: Params;
  body?: ClientBody;
  force?: ForcedParams;
  security?: Security;
};


export type ClientBody = {
  id?: string;
  userId?: string;
};

export type ForcedParams = {
  delay: number;
  status: number;
}

export type Security = {
  anonymous: boolean;
  userId?: string;
}

export type Params = {
  q?: string;
  key?: string;
  value?: string;
  sort?: string;
  order?: "asc" | "desc";
}