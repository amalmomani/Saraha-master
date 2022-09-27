import { TestBed } from '@angular/core/testing';

import { SarahaWeatherService } from './saraha-weather.service';

describe('SarahaWeatherService', () => {
  let service: SarahaWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SarahaWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
