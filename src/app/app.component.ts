import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CodemirrorService } from '../lib/ngx-codemirror';

import { map } from 'rxjs/operators';
import 'codemirror/mode/gfm/gfm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
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
  public language = 'gfm';
  public codemirror;

  constructor(
    private _codeMirror: CodemirrorService,
    private _http: Http
  ) { }

  public ngOnInit() {
    this._http.get('/assets/README.md')
      .pipe(
        map((res: Response) => res.text())
      )
      .subscribe((readme) => {
        this.value = readme;
      });

    this._codeMirror.instance$.subscribe((editor) => {
      this.codemirror = editor;
      console.log(
        `%cGot CodeMirror.Editor instance, the current mode is ${editor.getDoc().getMode().name}`,
        'padding: 0 0.5rem; background: #000; color: #a1c549'
      );
      console.log(editor.getDoc());
    });
  }

  public languageChange(language) {
    if (this.codemirror) {
      switch (language) {
        case 'js':
          this.codemirror.setOption('mode', {name: 'javascript'});
          break;
        case 'gfm':
        default:
          this.codemirror.setOption('mode', {name: 'gfm'});
      }
    }

  }

  public onBlur() {
    console.log(`%c--------------------- New Document Value --------------------`, 'background-color: #2677d0; color: #fff');
    console.log(this.value);
    console.log(`%c$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$`, 'background-color: #2677d0; color: #fff');
  }
}
