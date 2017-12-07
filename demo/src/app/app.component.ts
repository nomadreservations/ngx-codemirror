import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CodemirrorService } from '../../../src/codemirror.service';

import 'rxjs/add/operator/map';
import 'codemirror/mode/gfm/gfm';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <ngx-codemirror [(ngModel)]="value" (blur)="changed()" [config]="config"></ngx-codemirror>
  </div>
  `
})
export class AppComponent implements OnInit {
  public config = {
    mode: {
      name: 'gfm'
    },
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 2
  };
  public value: any;

  constructor(
    private _codeMirror: CodemirrorService,
    private _http: Http
  ) { }

  public ngOnInit() {
    this._http.get('/assets/README.md')
      .map((res: Response) => res.text())
      .subscribe((readme) => {
        this.value = readme;
      });

    this._codeMirror.instance$.subscribe((editor) => {
      console.log(editor.state);
    });
  }

  public changed() {
    console.log(this.value);
  }
}
