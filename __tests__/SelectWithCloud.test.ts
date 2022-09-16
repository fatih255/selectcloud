
import React from 'react';
import renderer from 'react-test-renderer';
import ReactTest from '../src/ReactTest';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))
it('Select Cloud Component Test Render with React', () => {

    const Test = new ReactTest({}) as unknown as React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    const component = renderer.create(Test);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
