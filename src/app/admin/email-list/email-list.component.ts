import { Component, OnInit } from '@angular/core';
import {AdminDataService} from '../data.service';
import {Email} from '../../models/email.interface';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
  emails: Array<Email>;

  constructor(private dataService: AdminDataService) { }

  ngOnInit(): void {
      this.dataService.getEmails().subscribe(data => this.emails = data
          .filter(mail => mail.to && mail.to.includes('botondvoros.com')));
  }

}
