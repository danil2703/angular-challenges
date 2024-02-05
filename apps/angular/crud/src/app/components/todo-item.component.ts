import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../models/models';
import { TodoService } from '../services/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'todo-item',
  template: `
    <div>
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  providers: [],
  styles: [],
})
export class TodoItem implements OnInit {
  @Input() todo!: Todo;
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  update(todo: Todo) {
    this.todoService.update(todo);
  }

  delete(todo: Todo) {
    this.todoService.delete(todo);
  }
}
