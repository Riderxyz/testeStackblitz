import { Component, OnInit, Input } from '@angular/core';
import { StatusCardInterface } from '../../models/statusCard.interface';

@Component({
    selector: 'app-stats-card',
    templateUrl: './stats-card.component.html',
    styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {
    @Input() data: StatusCardInterface;
    constructor() { }

    ngOnInit(): void { }

/*     startCardRenders() {

    } */
}
