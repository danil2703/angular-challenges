import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Directive({
  selector: '[card-list-item]',
  standalone: true,
})
export class CardListItemDirective {}

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[card-image]"></ng-content>

    <section>
      <ng-template
        *ngFor="let item of list"
        [ngTemplateOutlet]="rowTemplate"
        [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="added.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent<T> {
  @Input() list: T[] = [];
  @Input() customClass = '';
  @Output() added: EventEmitter<void> = new EventEmitter<void>();
  @ContentChild(CardListItemDirective, { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: T }>;
}
