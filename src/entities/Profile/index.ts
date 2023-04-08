export { Profile, ProfileSchema } from './model/types/Profile';

// Здесь делаем отлично от AuthByUsername, там была изоляция внутри самой фичи, а здесь мы отдадим наружу из entity
// и изолируем в рамках страницы. Этот подход так себе, надо было изначально все редюсеры стейт и селекторы делать на уровне страницы

export { profileReducer, profileActions } from './model/slice/profileSlice';
export { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';

export { ProfileCard } from './ui/ProfileCard/ProfileCard';
export { getProfileError } from './model/selectors/getProfileError/getProfileError';
export { getProfileData } from './model/selectors/getProfileData/getProfileData';
export { getProfileIsLoading } from './model/selectors/getProfileIsLoading/getProfileIsLoading';
export { getProfileReadonly } from './model/selectors/getProfileReadonly/getProfileReadonly';
export { getProfileForm } from './model/selectors/getProfileForm/getProfileForm';
export { updateProfileData } from './model/services/updateProfileData/updateProfileData';
