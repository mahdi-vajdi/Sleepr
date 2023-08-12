import { AggregateRoot } from '@nestjs/cqrs';
import { AbstractDocument } from './abstract.schema';

export interface EntitySchemaFactory<
  TSchema extends AbstractDocument,
  TEntity extends AggregateRoot,
> {
  create(entity: TEntity): TSchema;
  createFromSchema(entitySchema: TSchema): TEntity;
}
