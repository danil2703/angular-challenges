import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TodoItem } from './components/todo-item.component';
import { Todo } from './models/models';
import { TodoService } from './services/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, TodoItem],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      <todo-item [todo]="todo"></todo-item>
    </div>
  `,
  providers: [TodoService],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.todoService.getTodoList().subscribe((t) => {
      this.todos = t;
      this.cdr.detectChanges();
    });
  }
}
