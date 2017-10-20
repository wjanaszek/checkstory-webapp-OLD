import { TestBed, inject } from '@angular/core/testing';

import { ChangePasswordValidationService } from './change-password.validation.service';

describe('ChangePassword.ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePasswordValidationService]
    });
  });

  it('should be created', inject([ChangePasswordValidationService], (service: ChangePasswordValidationService) => {
    expect(service).toBeTruthy();
  }));
});
