import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDisptach';
import { HStack } from 'shared/ui/Stack';
import { AppText } from 'shared/ui/AppText/AppText';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import cls from './EditableProfileCardHeader.module.scss';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo((props: EditableProfileCardHeaderProps) => {
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
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <AppText title="Профиль" className={cls.profile} />
            {canEdit && (
                <div>
                    {readOnly
                        ? (
                            <AppButton
                                variant={ButtonVariant.OUTLINE}
                                onClick={onEdit}
                                data-testid="EditableProfileCardHeader.EditButton"
                            >
                                Редактировать
                            </AppButton>
                        )
                        : (
                            <HStack gap="8">
                                <AppButton
                                    variant={ButtonVariant.OUTLINE}
                                    onClick={onSave}
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                >
                                    Сохранить
                                </AppButton>
                                <AppButton
                                    variant={ButtonVariant.OUTLINE_RED}
                                    onClick={onCancel}
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                >
                                    Отменить
                                </AppButton>
                            </HStack>
                        )}
                </div>
            )}
        </HStack>
    );
});
