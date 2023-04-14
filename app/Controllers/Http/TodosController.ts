import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

export default class TodosController {
    public async index({request}) {
        // return Todo.all()        ambil semua data tanpa filter
        const page = request.input('page', 1)
        const limit = request.input('limit', 3)

        return Todo.query().paginate(page, limit)
    }

    public async store({request, response}:HttpContextContract) {
        Todo.create({
            title: request.input('title'),
            is_completed: false
        })
        return response.created({
            'created': true
        })
    }

    public async update({request, response, params}:HttpContextContract) {
        const todo = await Todo.findOrFail(params.id)
        todo.is_completed = request.input('is_completed')
        todo.save()
        return response.status(202).send(todo)
    }
}
