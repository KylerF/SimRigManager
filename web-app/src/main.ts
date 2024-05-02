import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Disable the "Download Apollo DevTools" console message
window['__APOLLO_DEVTOOLS_GLOBAL_HOOK__'] = true;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// Update color mode based on OS setting
function updateTheme() {
  document
    .querySelector('html')
    .setAttribute(
      'data-bs-theme',
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
}

updateTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
