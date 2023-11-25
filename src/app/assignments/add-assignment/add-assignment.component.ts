import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  @Output() nouvelAssignment = new EventEmitter<Assignment>();
  @Output() cancel = new EventEmitter<boolean>();
  @Input() assignmentList!: Assignment[];
  @Input() formVisible!: boolean

  ajoutActive = false
  nomDevoir : string = ""
  nom_du_prof : string = ""
  matiere : string = ""
  dateDeRendu : any = null

  constructor(private assignmentService:AssignmentsService, private router:Router) { }

  ngOnInit(): void {
    setTimeout (() => {
      this.ajoutActive = true;
    }, 2000)
  }

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.nom_du_prof = this.nom_du_prof;
    newAssignment.matiere = this.matiere;
    newAssignment.rendu = false;

    this.assignmentService.addAssignment(newAssignment)
    .subscribe(response => {console.log(response.message); this.router.navigate(['/home']);});
  }

}
