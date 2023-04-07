import { classNames } from 'shared/lib/classNames/classNames';

import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { AppText } from 'shared/ui/AppText/AppText';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { AppInput } from 'shared/ui/AppInput/AppInput';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const {
        className,
    } = props;

    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <AppText title="Профиль" />
                <AppButton
                    className={cls.editBtn}
                    variant={ButtonVariant.OUTLINE}
                >
                    Редактировать
                </AppButton>
            </div>
            <div className={cls.data}>
                <AppInput
                    value={data?.firstname}
                    placeholder="Ваше имя"
                    className={cls.input}
                />
                <AppInput
                    placeholder="Ваша фамилия"
                    value={data?.lastname}
                    className={cls.input}
                />
            </div>
        </div>
    );
});
