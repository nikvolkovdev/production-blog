import { classNames } from './classNames';

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('newClass')).toEqual('newClass');
    });

    test('with additional classes', () => {
        const expected = 'newClass class1 class2';
        expect(classNames('newClass', {}, ['class1', 'class2'])).toEqual(expected);
    });

    test('with additional classes and truthy mods', () => {
        const expected = 'newClass class1 class2 truthy';
        expect(classNames('newClass', { truthy: true }, ['class1', 'class2'])).toEqual(expected);
    });

    test('with additional classes and truthy mod and falsy mod', () => {
        const expected = 'newClass class1 class2 truthy';
        expect(classNames('newClass', { truthy: true, falsy: false }, ['class1', 'class2'])).toEqual(expected);
    });
});
