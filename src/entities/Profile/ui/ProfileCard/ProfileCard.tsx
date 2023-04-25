import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import { AppText, AppTextVariant, TextAlign } from '@/shared/ui/AppText';
import { AppInput } from '@/shared/ui/AppInput';
import { Loader } from '@/shared/ui/Loader';
import { AppAvatar } from '@/shared/ui/AppAvatar';
import { Country, CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Profile } from '../../model/types/Profile';
import cls from './ProfileCard.module.scss';
import { Currency, CurrencySelect } from '@/entities/Currency';

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

    if (isLoading) {
        return (
            <HStack
                justify="center"
                max
                className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <AppText
                    title="Произошла чудовищная ошибка при загрузке профиля"
                    description="Попробуйте обновить страницу"
                    variant={AppTextVariant.ERROR}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readOnly,
    };

    return (
        <VStack gap="8" max className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <HStack justify="center" max>
                    <AppAvatar src={data?.avatar} alt="avatar" />
                </HStack>
            )}
            <AppInput
                value={data?.firstname}
                placeholder="Ваше имя"
                className={cls.input}
                onChange={onChangeFirstname}
                readOnly={readOnly}
                data-testid="ProfileCard.firstname"
            />
            <AppInput
                placeholder="Ваша фамилия"
                value={data?.lastname}
                className={cls.input}
                onChange={onChangeLastname}
                readOnly={readOnly}
                data-testid="ProfileCard.lastname"
            />
            <AppInput
                placeholder="Ваш возраст"
                value={data?.age}
                className={cls.input}
                onChange={onChangeAge}
                readOnly={readOnly}
                data-testid="ProfileCard.age"
            />
            <AppInput
                placeholder="Ваш город"
                value={data?.city}
                className={cls.input}
                onChange={onChangeCity}
                readOnly={readOnly}
                data-testid="ProfileCard.city"
            />
            <AppInput
                placeholder="Имя пользователя"
                value={data?.username}
                className={cls.input}
                onChange={onChangeUsername}
                readOnly={readOnly}
                data-testid="ProfileCard.username"
            />
            <AppInput
                placeholder="Ссылка на аватар"
                value={data?.avatar}
                className={cls.input}
                onChange={onChangeAvatar}
                readOnly={readOnly}
                data-testid="ProfileCard.avatar"
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChangeCurrency={onChangeCurrency}
                readOnly={readOnly}
                data-testid="ProfileCard.currency"
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChangeCountry={onChangeCountry}
                readOnly={readOnly}
                data-testid="ProfileCard.country"
            />
        </VStack>
    );
});
