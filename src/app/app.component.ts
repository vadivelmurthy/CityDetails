import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CityDetailsList';
  cities: any[] =[];
  displayedCities: any[] = [];
  batchSize: number=10;
  loading: boolean = true;

  ngOnInit(){
    this.fetchCities();
  }

  fetchCities() {
    axios.get('https://datahub.io/core/world-cities/r/world-cities.json')
    .then(response => {
      this.cities = response.data;
      this.loading = false;
      this.loadMoreCities();
    })
    .catch(error => {
      console.error('Error fetching cities:', error);
    });
  }

  loadMoreCities() {
    const startIndex = this.displayedCities.length;
    const endIndex = startIndex + this.batchSize;
    this.displayedCities.push(...this.cities.slice(startIndex, endIndex));

  }
}

