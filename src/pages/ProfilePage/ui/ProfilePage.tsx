import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppPage } from 'widgets/AppPage/AppPage';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { useParams } from 'react-router-dom';
import { AppText } from 'shared/ui/AppText/AppText';

import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo((props: ProfilePageProps) => {
    const {
        className,
    } = props;

    const profile = useParams<{id: string}>();

    return (
        <AppPage className={classNames(cls.ProfilePage, {}, [className])}>

            <EditableProfileCard id={profile.id} />

        </AppPage>
    );
});

export default ProfilePage;
