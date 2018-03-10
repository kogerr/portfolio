import { AsyncValidator, AbstractControl, NG_ASYNC_VALIDATORS, AsyncValidatorFn, ValidationErrors, } from '@angular/forms';
import { Directive, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';


export function titleValidator(dataService: DataService): AsyncValidatorFn {
    return function (control: AbstractControl) {
        return new Promise<ValidationErrors>(resolve => {
            dataService.checkPost(control.value).subscribe(
                data => data.found ? resolve({ 'occupiedTitle': { value: control.value } }) : resolve(null)
            );
        });
    };
}

@Directive({
    selector: '[validateTitle]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: TitleValidatorDirective,
        multi: true
    }]
})
@Injectable()
export class TitleValidatorDirective implements AsyncValidator {
    constructor(private dataService: DataService) { }

    validate = function (control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
        return titleValidator(this.dataService)(control);
    };
}
