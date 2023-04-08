import { classNames, Mods } from 'shared/lib/classNames/classNames';

import { memo } from 'react';
import { AppText, AppTextVariant, TextAlign } from 'shared/ui/AppText/AppText';
import { AppInput } from 'shared/ui/AppInput/AppInput';
import { Profile } from 'entities/Profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { AppAvatar } from 'shared/ui/AppAvatar/AppAvatar';
import { Currency } from 'entities/Currency/model/types/currency';
import { CurrencySelect } from 'entities/Currency/ui/CurrencySelect/CurrencySelect';
import { Country } from 'entities/Country/model/types/country';
import { CountrySelect } from 'entities/Country';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile
    isLoading?: boolean;
    error?: string | undefined;
    readOnly?: boolean | undefined;
    onChangeFirstname?: (value?: string) => void;
    onChangeLastname?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

// слой entity редко обладает своим состоянием, обычно это переиспользуемые компоненты, куски логики, запросы к серверу
// мы все данные будем сюда принимать аргументом, и, если захотим, отрисуем этих карточек сколько угодно
export const ProfileCard = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error = '',
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
        readOnly = true,
    } = props;

    const mods: Mods = {
        [cls.editing]: !readOnly,
    };

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <AppText
                    title="Произошла чудовищная ошибка при загрузке профиля"
                    description="Попробуйте обновить страницу"
                    variant={AppTextVariant.ERROR}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                {data?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <AppAvatar src={data?.avatar} alt="avatar" />
                    </div>
                )}
                <AppInput
                    value={data?.firstname}
                    placeholder="Ваше имя"
                    className={cls.input}
                    onChange={onChangeFirstname}
                    readOnly={readOnly}
                />
                <AppInput
                    placeholder="Ваша фамилия"
                    value={data?.lastname}
                    className={cls.input}
                    onChange={onChangeLastname}
                    readOnly={readOnly}
                />
                <AppInput
                    placeholder="Ваш возраст"
                    value={data?.age}
                    className={cls.input}
                    onChange={onChangeAge}
                    readOnly={readOnly}
                />
                <AppInput
                    placeholder="Ваш город"
                    value={data?.city}
                    className={cls.input}
                    onChange={onChangeCity}
                    readOnly={readOnly}
                />
                <AppInput
                    placeholder="Имя пользователя"
                    value={data?.username}
                    className={cls.input}
                    onChange={onChangeUsername}
                    readOnly={readOnly}
                />
                <AppInput
                    placeholder="Ссылка на аватар"
                    value={data?.avatar}
                    className={cls.input}
                    onChange={onChangeAvatar}
                    readOnly={readOnly}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChangeCurrency={onChangeCurrency}
                    readOnly={readOnly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    onChangeCountry={onChangeCountry}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
});
