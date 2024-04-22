

/**
 * Structured information extracted from the request object
 */
export type ClientRequest = {
  method: string;
  endPoint: string;
  root: string;
  resource: string;
  allowWrite?: boolean;
  id?: string;
  q?: string;
  sort?: string;
  order?: "asc" | "desc";
  key?: string;
  value?: string;
  body?: ClientBody;
  userId?: string;
};


export type ClientBody = {
  id?: string;
  userId?: string;
};