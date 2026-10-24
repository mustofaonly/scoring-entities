export interface ReadRepository<TEntity, TID = string> {
  getById(id: TID): Promise<TEntity | null>;
}

export interface WriteRepository<TEntity, TID = string> {
  save(payload: TEntity): Promise<TEntity>;
  update(payload: TEntity): Promise<TEntity>;
  delete(id: TID): Promise<boolean>;
}

export interface DataTableRepository<TRequest, TResponse> {
  list(payload: TRequest): Promise<TResponse>;
}
