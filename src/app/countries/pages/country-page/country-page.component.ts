import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [],
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _countriesService: CountriesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this._countriesService.searchCountryByAlphaCode(id)
        )
      )
      .subscribe((country) => {
        if (!country) return this._router.navigateByUrl('');

        return (this.country = country);
        // return;
      });
  }
}
