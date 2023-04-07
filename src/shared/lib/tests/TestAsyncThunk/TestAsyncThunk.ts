import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<Return, Arg, {rejectValue: string}>;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();
    }

    // теперь сделаем функцию, с помощью которой мы этот асинхронный экшен будем вызывать.
    // Аргументом передаем как раз тот аргумент, который ожидает asyncThunk.

    async callThunk(arg: Arg) {
        const asyncThunkAction = this.actionCreator(arg);
        return asyncThunkAction(this.dispatch, this.getState, undefined);
    }

    // т.е. делаем то же самое, что мы до этого делали в тесте, ну и по итогу мы возвращаем результат
}
