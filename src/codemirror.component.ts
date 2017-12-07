// Imports
import {
  Component,
  Input,
  Output,
  ElementRef,
  ViewChild,
  EventEmitter,
  forwardRef,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Editor } from 'codemirror';
import { CodemirrorService } from './codemirror.service';

/**
 * Main Codemirror import, utilizing window's existence to determine if we're server side or not.
 */
// tslint:disable-next-line:variable-name
const CodeMirror: any =
  typeof window !== 'undefined' && typeof window.navigator !== 'undefined'
  ? require('codemirror')
  : undefined;

/**
 * CodeMirror component
 *
 * **Usage** :
 * ```html
 *   <ngx-codemirror [(ngModel)]="data" [config]="{...}" (init)="onInit" (blur)="onBlur" (focus)="onFocus" ...></ngx-codemirror>
 * ```
 */
@Component({
  selector: 'ngx-codemirror',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => CodemirrorComponent),
      multi: true
    }
  ],
  template: '<textarea #host></textarea>',
})
export class CodemirrorComponent implements AfterViewInit, OnDestroy {

  /** Codemirror config object (see [details](http://codemirror.net/doc/manual.html#config)) */
  @Input() public config: any;
  /** change output event, pass through from codemirror */
  @Output() public change = new EventEmitter();
  /** focus output event, pass through from codemirror */
  @Output() public focus = new EventEmitter();
  /** blur output event, pass through from codemirror */
  @Output() public blur = new EventEmitter();
  /** cursorActivity output event, pass through from codemirror */
  @Output() public cursorActivity = new EventEmitter();
  /** Host element for codemirror to attach to */
  @ViewChild('host') public host: ElementRef;

  /** Current editor instance */
  private _instance: any;

  /** Value storage */
  private _value = '';

  /**
   * Constructor
   *
   * @param _zone NgZone injected for Initialization
   */
  constructor(
    private _codeMirror: CodemirrorService,
    private _zone: NgZone
  ) {}

  /** Implements ControlValueAccessor.value */
  get value() { return this._value; }

  /** Implements ControlValueAccessor.value */
  @Input() set value(v) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  /**
   * On component destroy
   */
  public ngOnDestroy() {

  }

  /**
   * On component view init
   */
  public ngAfterViewInit() {
    this.config = this.config || {};
    this.codemirrorInit(this.config);
  }

  /**
   * Value update process
   */
  public updateValue(value: any) {
    this.value = value;
    this.onTouched();
    this.change.emit(value);
  }

  /**
   * Implements ControlValueAccessor
   */
  public writeValue(value: any) {
    this._value = value || '';
    if (this._instance) {
      this._instance.setValue(this._value);
    }
  }

  /** Change event trigger */
  public  onChange(_: any) {}
  /** Dirty/touched event trigger */
  public onTouched() {}
  /** Implements ControlValueAccessor.registerOnChange */
  public registerOnChange(fn: any) { this.onChange = fn; }
  /** Implements ControlValueAccessor.registerOnTouched */
  public registerOnTouched(fn: any) { this.onTouched = fn; }

  /**
   * Initialize codemirror
   */
  private codemirrorInit(config: any) {
    if (CodeMirror) {
      this._zone.runOutsideAngular(() => {
        this._instance = CodeMirror.fromTextArea(this.host.nativeElement, config);
        this._instance.setValue(this._value);
      });

      this._instance.on('change', () => {
        this.updateValue(this._instance.getValue());
      });

      this._instance.on('focus', (instance: any, event: any) => {
        this.focus.emit({instance, event});
      });

      this._instance.on('cursorActivity', (instance: any) => {
        this.cursorActivity.emit({instance});
      });

      this._instance.on('blur', (instance: any, event: any) => {
        this.blur.emit({instance, event});
      });

      this._codeMirror.instance$.next(this._instance);
    }
  }
}
