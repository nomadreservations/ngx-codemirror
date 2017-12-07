import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodemirrorComponent } from './codemirror.component';
import { CodemirrorService } from './codemirror.service';

/**
 * @angular 5.x+ SSR ready CodeMirror wrapping module.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CodemirrorComponent,
  ],
  providers: [
    CodemirrorService
  ],
  exports: [
    CodemirrorComponent,
  ]
})
export class CodemirrorModule {}
