import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { AppInput } from 'shared/ui/AppInput/AppInput';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDisptach';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addNewCommentSelectors';
import cls from './AddNewCommentForm.module.scss';

interface addNewCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addNewComment: addNewCommentReducer,
};

const AddNewCommentForm = memo((props: addNewCommentFormProps) => {
    const {
        className,
        onSendComment,
    } = props;

    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addNewCommentActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.addNewCommentForm, {}, [className])}>
                <AppInput
                    placeholder="Введите текст комментария"
                    value={text || ''}
                    onChange={onCommentTextChange}
                    className={cls.input}
                />
                <AppButton variant={ButtonVariant.OUTLINE} onClick={onSendHandler}>
                    Отправить
                </AppButton>
            </div>
        </DynamicModuleLoader>
    );
});

export default AddNewCommentForm;
