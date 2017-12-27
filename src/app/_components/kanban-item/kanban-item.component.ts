import {Component, EventEmitter, Input, Output} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog} from '@angular/material';
import {Card} from '../../_models/card';

@Component({
    selector: 'app-kanban-item',
    templateUrl: './kanban-item.component.html',
    styleUrls: ['./kanban-item.component.css']
})

export class KanbanItemComponent {
    @Input() card: Card;
    @Output()
    movedNext: EventEmitter<Card> = new EventEmitter();
    @Output()
    movedBack: EventEmitter<Card> = new EventEmitter();

    constructor(public dialog: MatDialog) {
    }

    moveNext() {
        this.movedNext.emit(this.card);
    }

    moveBack() {
        this.movedBack.emit(this.card);
    }
}
