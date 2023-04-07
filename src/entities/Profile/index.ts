export { Profile, ProfileSchema } from './model/types/Profile';

// здесь делаем отлично от AuthByUsername, там была изоляция внутри самой фичи, а здесь мы отдадим наружу
// и изолируем в рамках страницы.

export { profileReducer, profileActions } from './model/slice/profileSlice';
export { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';

export { ProfileCard } from './ui/ProfileCard/ProfileCard';
