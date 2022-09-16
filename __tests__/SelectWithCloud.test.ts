
import renderer from 'react-test-renderer';
import ReactTest from '../src/ReactTest';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))
it('Select Cloud Component Test Render with React', () => {


    const component = renderer.create(ReactTest);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
