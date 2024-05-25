import { Injectable } from '@angular/core';

/**
 * Service to update Bootstrap's light/dark mode based on the user's OS preferences
 */
@Injectable({ providedIn: 'root' })
export class ColorSchemeService {
  setColorScheme() {
    const htmlTag = document.documentElement;
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set the tag
    if (darkModeMediaQuery.matches) {
      htmlTag.setAttribute('data-bs-theme', 'dark');
    } else {
      htmlTag.setAttribute('data-bs-theme', 'light');
    }

    // Add an event listener to update when the setting is changed
    darkModeMediaQuery.addEventListener('change', (event) => {
      if (event.matches) {
        htmlTag.setAttribute('data-bs-theme', 'dark');
      } else {
        htmlTag.setAttribute('data-bs-theme', 'light');
      }
    });
  }
}
