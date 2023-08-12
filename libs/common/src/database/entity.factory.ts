import { Observable } from 'rxjs';

export interface EntityFactory<TEntity> {
  create(
    ...args: any
  ): TEntity | Promise<TEntity> | Observable<Promise<TEntity>>;
}
