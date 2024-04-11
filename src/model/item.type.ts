export type NewItem = {
  id?: string;
};

export type Item = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
};
