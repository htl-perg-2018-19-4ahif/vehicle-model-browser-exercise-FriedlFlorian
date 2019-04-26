import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IVehicle {
  id: number;
  year: number;
  make: string;
  model: string;
  hasDetails: number;
}

interface IMake {
  names: string[];
}

interface IYear {
  year: number[];
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  vehicles: IVehicle[];
  makes: IMake[];
  years: IYear[];

  yearFilter: number;
  makeFilter = '';

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.loadVehicles();
    this.laodMakes();
    this.loadYears();
  }

  async loadVehicles() {
    this.vehicles = await this.http.get<IVehicle[]>('https://vehicle-data.azurewebsites.net/api/models').toPromise();
  }

  async laodMakes() {
    this.makes = await this.http.get<IMake[]>('https://vehicle-data.azurewebsites.net/api/makes').toPromise();
  }

  async loadYears() {
    this.years = await this.http.get<IYear[]>('https://vehicle-data.azurewebsites.net/api/years').toPromise();

    console.log(this.years);
  }


  async filter() {
    console.log('year:' + this.yearFilter);
    console.log('make:' + this.makeFilter);

    if (this.makeFilter === '' && this.yearFilter === undefined) {
      this.vehicles = await this.http.get<IVehicle[]>('https://vehicle-data.azurewebsites.net/api/models').toPromise();
    }
    if (this.makeFilter === '' && this.yearFilter !== undefined) {
      // tslint:disable-next-line:max-line-length
      this.vehicles = await this.http.get<IVehicle[]>('https://vehicle-data.azurewebsites.net/api/models?year=' + this.yearFilter).toPromise();
    }
    if (this.makeFilter !== '' && this.yearFilter === undefined) {
      // tslint:disable-next-line:max-line-length
      this.vehicles = await this.http.get<IVehicle[]>('https://vehicle-data.azurewebsites.net/api/models?make=' + this.makeFilter).toPromise();
    }
    if (this.makeFilter !== '' && this.yearFilter !== undefined) {
      // tslint:disable-next-line:max-line-length
      this.vehicles = await this.http.get<IVehicle[]>('https://vehicle-data.azurewebsites.net/api/models?make=' + this.makeFilter + '&year=' + this.yearFilter).toPromise();
    }
  }

}
