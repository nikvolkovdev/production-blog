export { Profile, ProfileSchema } from './model/types/Profile';
export { profileReducer, profileActions } from './model/slice/profileSlice';

// здесь делаем отлично от AuthByUsername, там была изоляция внутри самой фичи, а здесь мы отдадим наружу
// и изолируем в рамках страницы.
