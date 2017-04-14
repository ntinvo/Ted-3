import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';
// import '../systemjs.config.js'
// import "core-js/client/shim.min.js";
// import "systemjs/dist/system.src.js";


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
