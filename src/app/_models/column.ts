import {Card} from './card';

export class Column {
    id: string;
    name: string;
    description: string;
    display: number;
    limit: number;

    projectId: string;
    cards: Card[];

    constructor() {
    }
}
