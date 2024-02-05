import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/models';

const endpoint = `https://jsonplaceholder.typicode.com/todos`;

@Injectable()
export class TodoService {
  public todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();
  constructor(private http: HttpClient) {}

  public getTodoList(): Observable<Todo[]> {
    this.http.get<Todo[]>(endpoint).subscribe((todos) => {
      this.todos.next(todos);
    });

    return this.todos$;
  }

  public update(todo: Todo) {
    this.http
      .put<Todo>(
        `${endpoint}/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: Todo) => {
        const todos = this.todos.getValue();
        this.todos.next(
          todos.map((t) => (t.id === todoUpdated.id ? todoUpdated : t)),
        );
      });
  }

  public delete(todo: Todo) {
    this.http.delete(`${endpoint}/${todo.id}`).subscribe(() => {
      const todos = this.todos.getValue();
      this.todos.next(todos.filter((t) => t.id !== todo.id));
    });
  }
}
