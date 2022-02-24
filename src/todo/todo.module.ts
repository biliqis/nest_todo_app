import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './controllers/todos/todos.controller';
import { TodoSchema } from './Schema/todo.schema';
import { TodoService } from './services/todos/todos.service';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Todo', schema:TodoSchema }])
    ],
    controllers:[TodosController],
    providers:[TodoService]
})
export class TodoModule {}
