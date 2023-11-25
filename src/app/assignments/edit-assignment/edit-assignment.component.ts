import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;
  nom_du_prof! : string;
  matiere! : string;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment();
    this.route.queryParams
    .subscribe(params => {
      console.log("Query Params :");
      console.log(params);
    })
    this.route.fragment
    .subscribe(fragment => {
      console.log("Fragment :");
      console.log(fragment);
    })
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
  
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.nom_du_prof = assignment.nom_du_prof;
      this.matiere = assignment.matiere;
    });
  }
  onSaveAssignment() {
    if (!this.assignment) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.nom_du_prof = this.nom_du_prof;
    this.assignment.matiere = this.matiere;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((response) => {
        console.log(response.message);

        this.router.navigate(['/home']);
      });
  }

}
