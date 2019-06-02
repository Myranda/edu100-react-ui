console.log('test~~~~~~~~~~~');
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import 'mocha';
import App from '@/components/App';

describe('Demo.vue', () => {
  it('Should use value in props when renders component', () => {
    const wrapper = shallow(<App />);
	  console.log('wrapper', wrapper);
    expcet(wrapper.find('h2')).to.have.lengthOf(1);
  });
});
