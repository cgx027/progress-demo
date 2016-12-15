// Copyright 2015, EMC, Inc.

import RestAPI from '../lib/RestAPI';

export default class WorkflowsRestAPI extends RestAPI {

  entity = 'workflows';

  unsupportedMethods = ['post', 'patch', 'delete'];

  put(id, body) {
    if (!body) {
      body = id;
      id = '';
    }
    return super.put(id || '', body, 'json');
  }

  library() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + 'library/*')
        .accept('json')
        .set('authorization', this.jwtAuthorization)
        .end((err, res) => {
          if (err) {
            this.http.get(this.url + 'library')
              .accept('json')
              .set('authorization', this.jwtAuthorization)
              .end((err, res) => {
                if (err) { return reject(err); }
                resolve(res && res.body);
              });
          }
          else {
            resolve(res && res.body);
          }
        });
    });
  }

  // TODO:
  // validate(body) {
  //   new Promise((resolve, reject) => {
  //     this.http.post(this.url + 'validate')
  //       .accept('json')
  //       .type('json')
  //       .send(body)
  //       .end((err, res) => {
  //         if (err) { return reject(err); }
  //         resolve(res && res.body);
  //       });
  //   });
  // }

}
