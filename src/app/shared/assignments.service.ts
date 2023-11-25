import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs'
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  obsAssignments : Observable<Assignment[]>;
  assignments : Assignment[] = [];
 
  constructor(private logginService:LoggingService, private http:HttpClient) { }

  /* url = "http://localhost:8010/api/assignments" */
  /* url = "https://api-assignments-app.onrender.com/api/assignments" */
  url = "https://crabby-jade-gilet.cyclic.app/api/assignments"

  getAssignments(): Observable<Assignment[]> {
    this.obsAssignments = this.http.get<Assignment[]>(this.url);
    this.obsAssignments.subscribe(
      (data) => {
        this.assignments = data;
      }
    )
    return this.obsAssignments;
  }

  getAssignment(id:number): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.url}/${id}`)
    .pipe(
      /* map(
        assignment => {
          assignment.nom += " transformé avec un pipe...";
          return assignment;
        }), */
      tap(_ =>{
        console.log("tap: assignment avec id =" + id + " requête GET envoyée sur MongoDB cloud");
        }),
      catchError(this.handleError<Assignment>("### catchError : getAssignment by id avec id=" + id + " a échoué"))
    );
  }

  private handleError<T>(operation, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} ${error.message}`);
      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    assignment.id = this.assignments.length + 1;
    this.assignments.push(assignment);
    this.logginService.log(assignment.nom, "ajouté");
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    this.logginService.log(assignment.nom, "supprimé");
    return this.http.delete<Assignment>(`${this.url}/${assignment._id}`);
  }
}
