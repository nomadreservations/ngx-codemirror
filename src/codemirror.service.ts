
import { Editor } from 'codemirror';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

/**
 * Main Codemirror import, utilizing window's existence to determine if we're server side or not.
 */
// tslint:disable-next-line:variable-name
const CodeMirror: any =
  typeof window !== 'undefined' && typeof window.navigator !== 'undefined'
  ? require('codemirror')
  : undefined;

/**
 * Initialize Event for CodeMirror.Editor instance
 *
 * Holds a referencable pointer to the code mirror instance for users.
 */
@Injectable()
export class CodemirrorService {
  /**
   * Codemirror instance subject
   *
   * Emits a refrence to the initialized CodeMirror.Editor once it's insantiated.
   */
  public instance$: ReplaySubject<Editor> = new ReplaySubject<Editor>();
}
