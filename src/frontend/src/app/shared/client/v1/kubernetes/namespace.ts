import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { KubeNamespace } from '../../../model/v1/kubernetes/namespace';
import { PageState } from '../../../page/page-state';
import { BaseClient } from './base-client';

@Injectable()
export class NamespaceClient {
  constructor(private http: HttpClient) {
  }

  getNames(cluster: string): Observable<any> {
    return this.http
      .get(`/api/v1/kubernetes/namespaces/clusters/${cluster}/names`)
      .catch(error => Observable.throw(error));
  }

  listPage(pageState: PageState, cluster: string): Observable<any> {
    const params = BaseClient.buildParam(pageState);
    return this.http
      .get(`/api/v1/kubernetes/namespaces/clusters/${cluster}`, {params: params})
      .catch(error => Observable.throw(error));
  }

  getNamespaceDetail(cluster: string, namespace: string): Observable<any> {
    return this.http
      .get(`/api/v1/kubernetes/namespaces/${namespace}/clusters/${cluster}`)
      .catch(error => Observable.throw(error));
  }

  update(ns: KubeNamespace, cluster: string): Observable<any> {
    return this.http
      .put(`/api/v1/kubernetes/namespaces/${ns.metadata.name}/clusters/${cluster}`, ns)
      .catch(error => Observable.throw(error));
  }

  create(name: string, cluster: string): Observable<any> {
    return this.http
      .post(`/api/v1/kubernetes/namespaces/${name}/clusters/${cluster}`, {})
      .catch(error => Observable.throw(error));
  }


  getResourceUsage(namespaceId: number, appName?: string): Observable<any> {
    let params = new HttpParams();
    if (appName) {
      params = params.set('app', appName);
    }
    return this.http
      .get(`/api/v1/kubernetes/namespaces/${namespaceId}/resources`, {params: params})
      .catch(error => Observable.throw(error));
  }

  getResource(namespaceId: number, appName?: string): Observable<any> {
    let params = new HttpParams();
    if (appName) {
      params = params.set('app', appName);
    }
    return this.http
      .get(`/api/v1/kubernetes/namespaces/${namespaceId}/statistics`, {params: params})
      .catch(error => Observable.throw(error));
  }

  getHistory(namespaceId: number, appName?: string): Observable<any> {
    let params = new HttpParams();
    if (appName) {
      params = params.set('app', appName);
    }
    return this.http
      .get(`/api/v1/namespaces/${namespaceId}/history`, {params: params})
      .catch(error => Observable.throw(error));
  }
}
