import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from 'src/todo/services/todos/todos.service';
import { createTodoDto } from 'src/todo/Schema/dtos/todo.dto';

@Controller('todo')
export class TodosController {
  constructor(private todoService: TodoService) {}
  @Post('add')
  async createNewTodo(@Body() createTodoDto: createTodoDto) {
    const list = await this.todoService.createATodo(createTodoDto);
    return list;
  }

  @Get('all')
  async getAll(@Res() res) {
    const AllList = await this.todoService.getAllTodo();
    return res.status(HttpStatus.OK).json({
      status: 200,
      data: AllList,
    });
  }

  @Patch('/:todoId')
  async getTodo(@Res() res, @Param('todoId') noteId: string) {
    const note = await this.todoService.getATodo(noteId);
    if (!note)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: 'Not found!' });
    return res.status(HttpStatus.OK).json({ status: 200, data: note });
  }

  @Patch('/update/:todoId')
  async updateAupdate(
    @Res() res,
    @Body() createTodoDto: createTodoDto,
    @Param('todoId') _id: string,
  ) {
    const updateNote = await this.todoService.updateATodo(_id, createTodoDto);
    if (!updateNote)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: 'Not found!' });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'Successful!',
      updateNote,
    });
  }

  @Delete('/delete/:todoId')
  async deleteCustomer(@Res() res, @Param('todoId') _id) {
    const deleteMyTodo = await this.todoService.deleteATodo(_id);
    if (!deleteMyTodo)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: 'Not found!' });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: 'Successful!',
    });
  }
}
