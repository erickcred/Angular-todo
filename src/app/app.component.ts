import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public todos: Todo[] = []
  public title: string = 'Minhas Tarefas'
  public todoForm!: FormGroup

  constructor(
    private fBuilder: FormBuilder
  ) {
    this.todoForm = this.fBuilder.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
      ])]
    })
  }

  ngOnInit() {
    let result: Todo[] = []
    if (localStorage.getItem('Todos')) {
      const todoJson = JSON.stringify(localStorage.getItem('Todos'))
      const todoList = JSON.parse(todoJson)
      result = JSON.parse(todoList)
    }

    this.todos = result
  }

  addTask() {
    const id: number = this.todos.length === 0? 1 : this.todos.length + 1
    const name: string = this.todoForm.controls['title'].value
    this.todos.push(new Todo(id, name, false))

    this.addTodoLoacalStorage()
    this.clearForm()
  }

  markAsDone(todo: Todo) {
    todo.done = true
    this.addTodoLoacalStorage()
  }

  markAsUnDone(todo: Todo) {
    todo.done = false
    this.addTodoLoacalStorage()
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo)
    index !== -1 ? this.todos.splice(index, 1) : ''
    this.addTodoLoacalStorage()
  }

  clearForm() {
    this.todoForm.reset()
  }

  addTodoLoacalStorage() {
    localStorage.setItem('Todos', JSON.stringify(this.todos))
  }
}
