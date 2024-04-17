

/**
 * Structured information extracted from the request object
 */
export type ClientRequest = {
  method: string;
  endPoint: string;
  resource: string;
  allowWrite?: boolean;
  id?: string;
  q?: string;
  _sort?: string;
  _order?: "asc" | "desc";
  key?: string;
  value?: string;
  body?: unknown;
  userId?: string;
};

