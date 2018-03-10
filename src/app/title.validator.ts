import { AsyncValidator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Attribute, Injectable } from '@angular/core';
import { DataService } from './data.service';

@Directive({
    selector: '[validateTitle]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: TitleValidator,
        multi: true
    }]
})

@Injectable()
export class TitleValidator implements AsyncValidator {
    constructor(private dataService: DataService) { }

    validate(control: AbstractControl): Promise<{ [key: string]: any; }> {
        let title = control.value;
        return new Promise(resolve => {
            this.dataService.getPost(title).subscribe(
                data => resolve({titleInvalid: true}),
                err => resolve(null)
            );
        });
    }
}
