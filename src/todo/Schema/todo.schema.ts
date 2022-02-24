import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoSchema = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  name: string;

  @Prop()
  Description: string;

  @Prop()
  completed: boolean;
}
export const TodoSchema = SchemaFactory.createForClass(Todo);

