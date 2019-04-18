import { Component, OnInit } from '@angular/core';
import { DirectionService } from './direction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ng-directions-service';

  from: string;
  to: string;
  distance: string;
  time: string;
  directions: object;

  constructor(private directionService: DirectionService) { }

  ngOnInit() {
    this.from = 'Boston, MA';
    this.to = 'Cambridge, MA';
    this.getDirections();
  }

  getDirections() {
    this.directionService.getDirections(this.from, this.to).subscribe(data => {
      console.log(data.route);
      this.distance = data.route.distance;
      this.time = data.route.formattedTime;
      this.directions = data.route.legs[0].maneuvers;
    });

  }
}
