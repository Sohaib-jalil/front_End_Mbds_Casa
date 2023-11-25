import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit{
  
  assignments : Assignment[] = [];
  assignmentSelectionne!:Assignment;
  filteredArray: Assignment[] = []
  numPages!:number;
  defaultRecords: number = 3;

  constructor(private assignmentService:AssignmentsService, public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getAssignments();
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  onPaginateChange(data) {
    const startIndex = data.pageIndex * data.pageSize;
    const endIndex = startIndex + data.pageSize;

    // Update filteredArray based on the new page
    this.filteredArray = this.assignments.slice(startIndex, endIndex);
  }

  getAssignments() {
    this.assignmentService.getAssignments()
    .subscribe(assignments => {this.assignments = assignments;
      this.filteredArray = this.assignments.slice(0, this.defaultRecords);});
    console.log(this.assignments);
    this.numPages = Math.ceil(this.assignments.length / this.defaultRecords);
  }
   
  assignmentClique(assignment:Assignment) {
    this.assignmentSelectionne = assignment;
  }

  assignmentDetails(id:number) {
    if (this.authService.loggedIn) {
      this.router.navigate(['/assignment/'+ id])
    }
  }

    updateCountdown() {
      let parsedDate:Date;
      let currentDate! : Date;
      let timeRemaining! : number;
        this.assignments.forEach(a => {
          currentDate = new Date();
          parsedDate =  new Date(a.dateDeRendu);
          timeRemaining = parsedDate.getTime() - currentDate.getTime();
      
          if (timeRemaining > 0) {
            let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      
            a.countdownDisplay = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          } else {
            a.countdownDisplay = 'Countdown expired!';
          }
        });
    }

}
