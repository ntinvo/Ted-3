import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hi, my name is {{name}}</h1>`,
})
export class AppComponent  { name = 'Tin N Vo'; }
