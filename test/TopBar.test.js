import React from 'react';               
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';             // method from enzyme which allows us to do shallow render
var sinon = require('sinon')
import { TopBar } from '../src/components';  // import our soon to be component
describe('TopBar Shallow', function () {
  it('TopBar\'s title should be Blog', function () {
    let app = shallow(<TopBar/>);
    expect(app.find('h1').text()).to.equal('Blog');
  });
});