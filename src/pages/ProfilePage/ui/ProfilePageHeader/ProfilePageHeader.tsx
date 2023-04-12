import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { AppText, TextAlign } from 'shared/ui/AppText/AppText';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { useSelector } from 'react-redux';
import {
    getProfileData, getProfileReadonly, profileActions, updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDisptach';
import { getUserAuthData } from 'entities/User';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = memo((props: ProfilePageHeaderProps) => {
    const {
        className,
    } = props;

    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
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
            {canEdit && (
                <div className={cls.btnWrapper}>
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
            )}
        </div>
    );
});
