
import ReactTest from '../src/ReactTest'
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

describe('my test', () => {
    it('some text', () => {
        const component = new ReactTest({});
        const setStateMock = jest.fn();
        component.setState = setStateMock;
        //  component.handleChangeSelectable(false);
        expect(setStateMock).toHaveBeenCalled();

    })
});