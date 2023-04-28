
import { Component } from '@angular/core';
import { ErrorService } from '../../../services/error.service';

@Component({
	selector: 'app-error-data',
	templateUrl: './error-data.component.html',
})
export class GlobalErrorComponent {

	constructor(public errorService: ErrorService) { }
}
