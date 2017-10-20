import { TestBed, inject } from '@angular/core/testing';

import { RegistrationValidationService } from './registration.validation.service';

describe('Registration.ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationValidationService]
    });
  });

  it('should be created', inject([RegistrationValidationService], (service: RegistrationValidationService) => {
    expect(service).toBeTruthy();
  }));
});
