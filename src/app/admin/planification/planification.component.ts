import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-planification',
  standalone: true,
  imports: [
    NavComponent
  ],
  templateUrl: './planification.component.html',
  styleUrl: './planification.component.css'
})
export class PlanificationComponent {

}
