import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "src/todo/Schema/interface/todo.interface";
import { createTodoDto } from "src/todo/Schema/dtos/todo.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoService {
    constructor(@InjectModel("Todo") private readonly todoModel: Model<Todo>) { }
    async createATodo(createTodo: createTodoDto): Promise<Todo> {
        const newTodo = new this.todoModel(createTodo);
        return await newTodo.save();
    }

    async getATodo(todoId): Promise<Todo> {
        const myTodoList = await this.todoModel.findById(todoId).exec();
        return myTodoList;
    }

    async getAllTodo():Promise<Todo[]>{
        const getAllTodoDetails = await this.todoModel.find().exec()
        return getAllTodoDetails
    }

    async updateATodo(_id, createTodoDto: createTodoDto): Promise<Todo> {
        const updateTodo = await this.todoModel.findByIdAndUpdate(_id, createTodoDto, { new: true });
        return updateTodo;
    }

    async deleteATodo(_id): Promise<any> {
        const deleteTodo = await this.todoModel.findByIdAndRemove(_id);
        return deleteTodo;
    }
}