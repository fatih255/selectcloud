/**
 * @jest-environment jsdom
 */

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

import SelectWithCloud from '../src/index';
test('My Select Cloud', () => {
    // Set up our document body
    document.body.innerHTML =
        '<div>' +
        '  <h1 class="note">item1</h1>' +
        '  <h1 class="note">item1</h1>' +
        '  <h1 class="note">item1</h1>' +
        '</div>';
    SelectWithCloud({
        itemsClass: 'note',
        onComplete: (elements) => {
            console.log(elements);
        },
        crossEffect({ style, classList }) {
            style.color = "yellow";
        },
    })
});