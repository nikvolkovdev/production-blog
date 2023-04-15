import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer, ValidateProfileError,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDisptach';
import { useSelector } from 'react-redux';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { AppText, AppTextVariant } from 'shared/ui/AppText/AppText';
import { useParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { AppPage } from 'widgets/AppPage/AppPage';
import { VStack } from 'shared/ui/Stack';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import cls from './ProfilePage.module.scss';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const {
        className,
    } = props;

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readOnly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorMap = {
        [ValidateProfileError.INCORRECT_USER_DATA]: 'Неверно указано имя или фамилия',
        [ValidateProfileError.INCORRECT_AGE]: 'Неверно указан возраст',
        [ValidateProfileError.INCORRECT_COUNTRY]: 'Неверно указана страна',
        [ValidateProfileError.NO_DATA]: 'Нет данных',
        [ValidateProfileError.SERVER_ERROR]: 'Произошла серверная ошибка',
    };

    const profileId = useParams<{id: string}>();
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        if (profileId.id) {
            dispatch(fetchProfileData(profileId.id));
        }
    });

    const onChangeFirstname = useCallback((firstname: string | undefined) => {
        dispatch(profileActions.updateProfile({ firstname: firstname || '' }));
    }, [dispatch]);

    const onChangeLastname = useCallback((lastname: string | undefined) => {
        dispatch(profileActions.updateProfile({ lastname: lastname || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((age: string | undefined) => {
        dispatch(profileActions.updateProfile({ age: Number(age || 0) }));
    }, [dispatch]);

    const onChangeCity = useCallback((city: string | undefined) => {
        dispatch(profileActions.updateProfile({ city: city || '' }));
    }, [dispatch]);

    const onChangeUsername = useCallback((username: string | undefined) => {
        dispatch(profileActions.updateProfile({ username: username || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((avatar: string | undefined) => {
        dispatch(profileActions.updateProfile({ avatar: avatar || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <AppPage className={classNames(cls.ProfilePage, {}, [className])}>
                <VStack max gap="16">
                    <ProfilePageHeader />
                    {validateErrors?.length && validateErrors.map((err) => (
                        <AppText
                            key={err}
                            variant={AppTextVariant.ERROR}
                            description={validateErrorMap[err]}
                        />
                    ))}
                    <ProfileCard
                        data={formData}
                        isLoading={isLoading}
                        error={error}
                        readOnly={readOnly}
                        onChangeFirstname={onChangeFirstname}
                        onChangeLastname={onChangeLastname}
                        onChangeAge={onChangeAge}
                        onChangeCity={onChangeCity}
                        onChangeAvatar={onChangeAvatar}
                        onChangeUsername={onChangeUsername}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                    />
                </VStack>

            </AppPage>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
