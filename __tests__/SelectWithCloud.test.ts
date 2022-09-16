
import React from 'react';
import renderer from 'react-test-renderer';
import ReactTest from '../src/ReactTest';

jest.mock('../src/ReactTest');
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

it('We can check if the consumer called the class constructor', () => {
    const Test = new ReactTest({}).render();
    const component = renderer.create(Test)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});
