import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

export default class TodosController {
    public async index({request}) {
        // ambil semua data tanpa filter
        // return Todo.all()

        // get data dengan filter
        const page = request.input('page', 1)   // angka di parameter kedua adalah value default jika parameter kosong
        const limit = request.input('limit', 0)
        return Todo.query().paginate(page, limit)

        // sebagai fungsi search, get data berdasarkan id
        // const find = request.input('find', 1)
        // const todos = await Todo.find(find)
        // return todos?.serialize()

        // get semua data, tapi hanya menampilkan yang di dalam fields:[]
        // const todos = await Todo.all()
        // return todos.map(todo => todo.serialize({
        //     fields:['id', 'title']
        // }))
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
