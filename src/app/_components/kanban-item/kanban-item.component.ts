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
    movedDown: EventEmitter<number> = new EventEmitter();
    @Output()
    movedUp: EventEmitter<number> = new EventEmitter();
    @Output()
    movedNext: EventEmitter<number> = new EventEmitter();
    @Output()
    movedBack: EventEmitter<number> = new EventEmitter();

    constructor(public dialog: MatDialog) {
    }

    moveDown() {
        this.movedDown.emit();
    }

    moveUp() {
        this.movedUp.emit();
    }

    moveNext() {
        this.movedNext.emit();
    }

    moveBack() {
        this.movedBack.emit();
    }
}
