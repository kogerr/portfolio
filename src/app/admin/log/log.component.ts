import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor(private dataService: DataService) { }

  logs: Array<any>;

  ngOnInit(): void {
    this.dataService.getLogs().subscribe((data) => {
      this.logs = data;
    });
  }

}
