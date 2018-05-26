import { NgModule } from '@angular/core';

import { CodemirrorComponent } from './codemirror.component';
import { CodemirrorService } from './codemirror.service';

/**
 * @angular 5.x+ SSR ready CodeMirror wrapping module.
 */
@NgModule({
  providers: [
    CodemirrorService
  ],
  declarations: [CodemirrorComponent],
  exports: [CodemirrorComponent],
  entryComponents: [CodemirrorComponent]
})
export class CodemirrorModule {}
