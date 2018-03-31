// @flow strict
import * as React from 'react';
import ReactDOM from 'react-dom';
import { extractFormData } from './utils';

describe('utils.extractFormData', () => {
  it('should extract the data from all textual inputs (ignore files)', () => {
    const v = {
      email: 'dapple-dachshund@example.com',
      password: '*3ll_puppies1',
    };

    const form = document.createElement('form');
    ReactDOM.render(
      <React.Fragment>
        <input name="email" type="email" defaultValue={v.email} />
        <input name="password" type="password" defaultValue={v.password} />
      </React.Fragment>,
      form
    );

    const d = extractFormData(form);
    expect(d).toEqual(v);

    ReactDOM.unmountComponentAtNode(form);
  });
});
