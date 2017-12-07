import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

/**
 * Add here external dependencies that actually you use.
 *
 * About RxJS
 * Each RxJS functionality that you use in the library must be added as external dependency.
 * - For main classes use 'Rx':
 *      e.g. import { Observable } from 'rxjs/Observable'; => 'rxjs/Observable': 'Rx'
 * - For observable methods use 'Rx.Observable':
 *      e.g. import 'rxjs/add/observable/merge'; => 'rxjs/add/observable/merge': 'Rx.Observable'
 *      or for lettable operators:
 *      e.g. import { merge } from 'rxjs/observable/merge'; => 'rxjs/observable/merge': 'Rx.Observable'
 * - For operators use 'Rx.Observable.prototype':
 *      e.g. import 'rxjs/add/operator/map'; => 'rxjs/add/operator/map': 'Rx.Observable.prototype'
 *      or for lettable operators:
 *      e.g. import { map } from 'rxjs/operators'; => 'rxjs/operators': 'Rx.Observable.prototype'
 */

// '@angular/animations': 'ng.animations',
// '@angular/platform-browser': 'ng.platformBrowser',
// '@angular/platform-server': 'ng.platformServer',
// '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
// '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
// '@angular/core/testing': 'ng.core.testing',
// '@angular/common/testing': 'ng.common.testing',
// '@angular/http/testing': 'ng.http.testing',
// '@angular/http': 'ng.http',
// '@angular/router': 'ng.router',

const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/material': 'ng.material',
    '@angular/cdk': 'ng.cdk',

    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/Subscription': 'Rx',
    'rxjs/Observer': 'Rx',
    'rxjs/Subscriber': 'Rx',
    'rxjs/Scheduler': 'Rx',
    'rxjs/ReplaySubject': 'Rx',
    'rxjs/observable/combineLatest': 'Rx.Observable',
    'rxjs/observable/forkJoin': 'Rx.Observable',
    'rxjs/observable/fromEvent': 'Rx.Observable',
    'rxjs/observable/merge': 'Rx.Observable',
    'rxjs/observable/of': 'Rx.Observable',
    'rxjs/observable/throw': 'Rx.Observable',
    'rxjs/observable/defer': 'Rx.Observable',
    'rxjs/operators': 'Rx.Observable',
    'rxjs/operators/index': 'Rx.Observable',

    'rxjs/add/observable/merge': 'Rx.Observable',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable',
    'rxjs/add/observable/interval': 'Rx.Observable',
    'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/distinctUntilChanged': 'Rx.Observable.prototype',
    'rxjs/add/operator/first': 'Rx.Observable.prototype',
    'rxjs/add/operator/catch': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype'
};

export default {
    external: Object.keys(globals),
    plugins: [
        resolve(),
        sourcemaps(),
    ],
    onwarn: () => { return },
    output: {
        format: 'umd',
        name: 'nomadreservations.ngxCodemirror',
        globals: globals,
        sourcemap: true,
        exports: 'named'
    }
}
