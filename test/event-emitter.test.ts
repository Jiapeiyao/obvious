import { EventEmitter } from '../src/lib/event-emitter';

describe('Test event-emitter module:', () => {
    const event = new EventEmitter();
    let valueToModify = 0;
    const callback =  (newValue: number) => {
        valueToModify = newValue;
    };
    test('# case 1: trigger an event, callback should be called', () => {
        event.addEventListener('test', callback);
        expect(valueToModify).toBe(0);
        event.emit('test', 1);
        expect(valueToModify).toBe(1);
    });

    test('# case 2: remove an existed listener then emit the event, console.warn should be called', () => {
        console.warn = jest.fn();
        event.removeEventListener('test', callback);
        event.emit('test');
        const warnMessage = '[obvious] you have emitted test event, but there is no listener of this event';
        expect(console.warn).toBeCalledWith(warnMessage);
    });

    test('#case 3: remove non-existent listener of an event, it should throw an error', () => {
        const errorMessage = "[obvious] you are trying to remove a listener of test event, but the listener hasn't been registed"; // eslint-disable-line
        const expectedError = new Error(errorMessage);
        expect(() => {
            event.removeEventListener('test', callback);
        }).toThrow(expectedError);
    });

    test('#case 4: remove a listener of a non-existent event, it should throw an error', () => {
        const eventName = 'nonExistentEvent';
        const errorMessage = `[obvious] you are trying to remove a listener of ${eventName} event, but ${eventName} hasn't been registed as a event`; // eslint-disable-line
        const expectedError = new Error(errorMessage);
        expect(() => {
            event.removeEventListener(eventName, callback);
        }).toThrow(expectedError);
    });
});
