import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDisptach';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { AppText, AppTextVariant } from '@/shared/ui/AppText';
import { ProfileCard } from '@/entities/Profile';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import { ValidateProfileError } from '../../model/consts/consts';
import {
    getProfileIsLoading,
} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import {
    getProfileValidateErrors,
} from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
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

    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const onChangeFirstname = useCallback((firstname: string | undefined) => {
        dispatch(profileActions.updateProfile({ firstname }));
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
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="8" max className={classNames('EditableProfileCard', {}, [className])}>
                <EditableProfileCardHeader />

                {validateErrors?.length && validateErrors.map((err) => (
                    <AppText
                        key={err}
                        variant={AppTextVariant.ERROR}
                        description={validateErrorMap[err]}
                        data-testid="EditableProfileCard.Error"
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
        </DynamicModuleLoader>
    );
});
