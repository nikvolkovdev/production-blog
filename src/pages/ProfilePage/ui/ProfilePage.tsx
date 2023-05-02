import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import cls from './ProfilePage.module.scss';
import { ProfileRating } from '@/features/profileRating';
import { AppPage } from '@/widgets/AppPage';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const {
        className,
    } = props;

    const profile = useParams<{id: string}>();

    return (
        <AppPage className={classNames(cls.ProfilePage, {}, [className])} data-testid="ProfilePage">

            <EditableProfileCard id={profile.id} />
            <ProfileRating profileId={profile.id || ''} />
        </AppPage>
    );
});

export default ProfilePage;
