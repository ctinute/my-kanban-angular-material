import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Card} from '../../_models/card';
import {CardService} from '../../_services/card.service';

@Component({
    selector: 'app-new-card',
    templateUrl: './dialog-new-card.component.html',
    styleUrls: ['dialog-new-card.component.css']
})
export class DialogNewCardComponent {
    columnId: string;
    newCard: Card;
    name: string;
    content: string;
    // labels: Label;
    dueDay: Date;
    date: string;
    hour: number;
    min: number;

    // display: number;

    constructor(public dialogRef: MatDialogRef<DialogNewCardComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _cardService: CardService) {
        console.log('DialogNewCardComponent: cid: ' + this.data);
        this.columnId = data.columnId;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }

    create() {
        this.newCard = new Card();
        this.newCard.name = this.name;
        this.newCard.content = this.content;
        const dateParts = this.date.toString().split('/', 3);
        this.newCard.dueTime = new Date(+dateParts[2], +dateParts[0], +dateParts[1], this.hour % 12 + 1, this.min, 0, this.hour / 12);
        this.newCard.columnId = this.columnId;
        this._cardService.createCard(this.newCard).subscribe(
            data => {
                this.dialogRef.close();
            },
            err => {
                alert(err.error.message);
            }
        );
    }
}
