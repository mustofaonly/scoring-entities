export type DataTableColumnDefs<T = string> = {
  searchable: boolean;
  sortDir: "" | "asc" | "desc";
  column: T;
};

export type DataTableFilterProps<T = string> = {
  column: T;
  value: string | number | string[] | number[] | boolean;
  operator: "=" | ">" | "<" | ">=" | "<=" | "!=" | "in" | "not in";
};

export type DataTableRequest<T = string> = {
  limit: number;
  offset: number;
  search: {
    column: T | "";
    value: string;
  };
  columns: DataTableColumnDefs<T>[];
  filter?: DataTableFilterProps<T>[];
};

export type DataTableResponse<T = unknown> = {
  data: T[];
  total: number;
};
