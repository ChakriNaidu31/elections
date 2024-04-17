import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {VotersService} from '../../services/voters.service';
import {Country} from '../../services/country';
import {NgbdSortableHeader, SortEvent} from '../../services/sortable.directive';


@Component({
  selector: 'app-pollingstation-list',
  templateUrl: './pollingstation-list.component.html',
  styleUrls: ['./pollingstation-list.component.css'],
  providers: [VotersService, DecimalPipe]
})



export class PollingstationListComponent {
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: VotersService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
