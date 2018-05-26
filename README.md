# @nomadreservations/ngx-codemirror
`@nomadreservations/ngx-codemirror` [CodeMirror (5.x)](http://codemirror.net/) code editor in your Angular application. Server Side Rendering(SSR) compliant and @angular 6+ Ready.

_Note: If you're looking for @angular 5 support please use version [1.0.x](https://github.com/nomadreservations/ngx-codemirror/tree/1.0.0)_

Originally derived from [ng2-codemirror](https://github.com/chymz/ng2-codemirror)

__Table of Contents:__

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [1. Installation](#1-installation)
- [2. Project structure](#2-project-structure)
- [3. Testing](#3-testing)
- [4. Building](#4-building)
- [5. Publishing](#5-publishing)
- [6. Documentation](#6-documentation)
- [7. Using the library](#7-using-the-library)
  - [7.1. Installing](#71-installing)
  - [7.2. Sample](#72-sample)
  - [7.3. Configuration](#73-configuration)
  - [7.4. Loading](#74-loading)
  - [7.5. AoT compilation](#75-aot-compilation)
- [8. License](#8-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## 1. Installation
To use @nomadreservations/ngx-codemirror in your project install it via npm:
```
npm i @nomadreservations/ngx-codemirror --save
```

## 2. Project structure
- Library:
    - **src** folder for the classes
    - **src/lib/public_api.ts** entry point for all public APIs of the package
    - **package.json** _npm_ options


## 3. Testing
The following command run unit & integration tests that are in the `tests` folder (you can change the folder in `spec.bundle.js` file):
```Shell
yarn test
```
It also reports coverage using Istanbul.

## 4. Building
The following command:
```Shell
yarn build
```
To test locally the npm package:
```Shell
yarn pack-lib
```
Then you can install it in an app to test it:
```Shell
yarn add [path]@nomadreservations/ngx-codemirror-[version].tgz
```

## 5. Publishing
Before publishing the first time:
- you can register your library on [Travis CI](https://travis-ci.org/): you have already configured `.travis.yml` file
- you must have a user on the _npm_ registry: [Publishing npm packages](https://docs.npmjs.com/getting-started/publishing-npm-packages)

```Shell
yarn publish-lib
```

## 6. Documentation
To generate the documentation, this project uses [compodoc](https://github.com/compodoc/compodoc):
```Shell
yarn docs:watch
yarn compodoc
```

## 7. Using the library
### 7.1. Installing
```Shell
npm install @nomadreservations/ngx-codemirror --save
```

Then you need to include base CSS of codemirror located in `codemirror/lib/codemirror.css`

### 7.2. Sample

Include `CodemirrorModule` in your main module :

```javascript
import { CodemirrorModule } from '@nomadreservations/ngx-codemirror';

@NgModule({
  // ...
  imports:      [
    CodemirrorModule
  ],
  // ...
})
export class AppModule { }
```

```javascript
import { Component } from '@angular/core';
import { CodemirrorService } from '@nomadreservations/ngx-codemirror';

@Component({
  selector: 'sample',
  template: `
    <ngx-codemirror [(ngModel)]="code"
      [config]="{...}"
      (focus)="onFocus()"
      (blur)="onBlur()">
    </ngx-codemirror>
  `
})
export class Sample{

  constructor(
    private _codeMirror: CodemirrorService,
  ) { }

  public ngOnInit() {
    this._codeMirror.instance$.subscribe((editor) => {
      console.log(editor.state);
    });
  }
}
```

### 7.3. Configuration

* `config` : The configuration object for CodeMirror see http://codemirror.net/doc/manual.html#config

### 7.4. Loading
#### Using SystemJS configuration
```JavaScript
System.config({
    map: {
        '@nomadreservations/ngx-codemirror': 'node_modules/@nomadreservations/ngx-codemirror/bundles/@nomadreservations/ngx-codemirror.umd.js'
    }
});
```
#### Angular-CLI
No need to set up anything, just import it in your code.
#### Rollup or webpack
No need to set up anything, just import it in your code.
#### Plain JavaScript
Include the `umd` bundle in your `index.html`:
```Html
<script src="node_modules/@nomadreservations/ngx-codemirror/bundles/@nomadreservations/ngx-codemirror.umd.js"></script>
```
and use global `nomadreservations.ngxCodemirror` namespace.

### 7.5. AoT compilation
The library is compatible with _AoT compilation_.

## 8. License

MIT
