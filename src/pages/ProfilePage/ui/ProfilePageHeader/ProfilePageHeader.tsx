import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { AppText, TextAlign } from 'shared/ui/AppText/AppText';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDisptach';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = memo((props: ProfilePageHeaderProps) => {
    const {
        className,
    } = props;

    const readOnly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadOnly(false));
    }, [dispatch]);

    const onCancel = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <AppText title="Профиль" className={cls.profile} />
            {readOnly
                ? (
                    <AppButton
                        className={cls.editBtn}
                        variant={ButtonVariant.OUTLINE}
                        onClick={onEdit}
                    >
                        Редактировать
                    </AppButton>
                )
                : (
                    <>
                        <AppButton
                            className={cls.saveBtn}
                            variant={ButtonVariant.OUTLINE}
                            onClick={onSave}
                        >
                            Сохранить
                        </AppButton>
                        <AppButton
                            className={cls.editBtn}
                            variant={ButtonVariant.OUTLINE_RED}
                            onClick={onCancel}
                        >
                            Отменить
                        </AppButton>
                    </>
                )}
        </div>
    );
});
