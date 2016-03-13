import { setup } from 'ghost-desktop/utils/context-menu';
import { module, test } from 'qunit';

module('Unit | Utility | context menu');

test('binds to the "contextmenu" event', function(assert) {
    // Monkeypatch
    let addEventListenerCalled = false;
    let oldAddEvent = window.addEventListener;
    window.addEventListener = function (e, cb) {
        if (e === 'contextmenu' && cb) {
            addEventListenerCalled = true;
        }

        return oldAddEvent(...arguments);
    }

    setup();
    assert.ok(addEventListenerCalled);
});

test('right click opens context menu', function(assert) {
    setup();

    var element = document.querySelector('h1#qunit-header');
    var event = document.createEvent('MouseEvents');

    var x = 10, y = 10;

    event.initMouseEvent('contextmenu', true, true, element.ownerDocument.defaultView, 1, x, y, x, y, false, false, false, false, 2, null);
    element.dispatchEvent(event);

    assert.ok(window.CONTEXTMENU_OPENED);
});