export interface DataTableColumnDefs<TColumns = string> {
  searchable: boolean;
  sortDir: "" | "asc" | "desc";
  column: TColumns;
}

export interface DataTableFilterProps<TColumns = string> {
  column: TColumns;
  value: string | number | string[] | number[] | boolean;
  operator: "=" | ">" | "<" | ">=" | "<=" | "!=" | "in" | "not in";
}

export interface DataTableRequest<TColumns = string> {
  limit: number;
  offset: number;
  search: {
    column: TColumns | "";
    value: string;
  };
  columns: DataTableColumnDefs<TColumns>[];
  filter?: DataTableFilterProps<TColumns>[];
}

export interface DataTableResponse<TEntity> {
  items: TEntity[];
  total: number;
}
