import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error$ = new Subject<string>();

  handle = (message: string | unknown) => this.error$.next(message as string);

  clear = () => this.error$.next('');
}
