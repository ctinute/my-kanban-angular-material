import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Project} from '../../_models/project';
import {Column} from '../../_models/column';
import {CardService} from '../../_services/card.service';
import {ColumnService} from '../../_services/column.service';
import {DialogNewColumnComponent} from '../dialog-new-column/dialog-new-column.component';
import {DialogNewCardComponent} from '../dialog-new-card/dialog-new-card.component';


@Component({
    selector: 'app-project-kanban',
    templateUrl: 'project-kanban.component.html',
    styleUrls: ['project-kanban.component.css']
})

export class ProjectKanbanComponent implements OnInit {
    @Input() project: Project;
    columns: Column[];

    simpleDrop: any = null;

    constructor(private _router: Router,
                private _columnService: ColumnService,
                private _cardService: CardService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        console.log('hjajhabs');
        this.fetchData();
    }

    fetchData() {
        this._columnService.getColumnsOfProject(this.project.id)
            .subscribe(
                data => {
                    this.columns = data;
                    for (let i = 0; i < this.columns.length; i++) {
                        this._cardService.getCardsOfColumn(this.columns[i].id)
                            .subscribe(
                                cdata => this.columns[i].cards = cdata
                            );
                    }
                }
            );
    }

    createColumn() {
        const dialogRef = this.dialog.open(DialogNewColumnComponent, {
            data: {
                project: this.project
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.fetchData();
        });
    }

    createCard(cid: string) {
        const dialogRef = this.dialog.open(DialogNewCardComponent, {
            data: {
                columnId: cid
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.fetchData();
        });
    }
}
