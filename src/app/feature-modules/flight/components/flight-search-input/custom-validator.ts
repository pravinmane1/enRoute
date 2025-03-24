import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const departureValidator = (formGroup: FormGroup): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const destination = formGroup.get('destination')?.value;
    const departure = control.value;

    if (departure && destination) {
      return departure === destination
        ? { destinationDepartureEqual: true }
        : null;
    }
    return null;
  };
};

export const destinationValidator = (formGroup: FormGroup): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const departure = formGroup.get('departure')?.value;
    const destionation = control.value;

    if (destionation) {
      return departure && departure === destionation
        ? { destinationDepartureEqual: true }
        : null;
    }
    return null;
  };
};

export const departDateValidator = (formGroup: FormGroup): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const returnDate = formGroup.get('returnDate')?.value;
    const departDate = control.value;

    return departDate &&
      returnDate &&
      new Date(departDate).getTime() > new Date(returnDate).getTime()
      ? { returnBeforeDeparture: true }
      : null;
  };
};

export const returnDateValidator = (formGroup: FormGroup): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const departDate = formGroup.get('departDate')?.value;
    const returnDate = control.value;

    return departDate &&
      returnDate &&
      new Date(departDate).getTime() > new Date(returnDate).getTime()
      ? { returnBeforeDeparture: true }
      : null;
  };
};
