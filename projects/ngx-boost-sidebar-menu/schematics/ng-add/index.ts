import type { Rule } from '@angular-devkit/schematics';
import { chain, noop } from '@angular-devkit/schematics';

export function ngAdd(): Rule {
  return chain([
    // Future: detect CSS/SCSS and add variables import
    noop(),
  ]);
}
