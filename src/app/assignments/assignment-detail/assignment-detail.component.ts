import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit{
  assignmentTransmis!:Assignment;

  constructor(private assignmentService:AssignmentsService, private route:ActivatedRoute
    , private router:Router, public authService:AuthService) { }
  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment(){
    const id = + this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id)
    .subscribe(a => this.assignmentTransmis = a);
  }

  onDelete() {
    if (!this.assignmentTransmis) return; 
    this.assignmentService.deleteAssignment(this.assignmentTransmis)
    .subscribe(response => {console.log(response.message); this.router.navigate(['/home']);});
    this.assignmentTransmis = null;
  }

  onEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
    {queryParams: {name: this.assignmentTransmis.nom}, fragment:'editing'}
    );
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = !this.assignmentTransmis.rendu;

    this.assignmentService.updateAssignment(this.assignmentTransmis)
    .subscribe(response => console.log(response.message));
  }

  isAdmin():boolean {
    return this.authService.isAdmin();
  }

}
