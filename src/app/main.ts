import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import 'meteor-client'

platformBrowserDynamic().bootstrapModule(AppModule);
