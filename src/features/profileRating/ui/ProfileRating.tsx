import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { useGetProfileRating, useRateProfile } from '../api/profileRatingApi';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { RatingCard } from '@/entities/Rating';

interface ProfileRatingProps {
    className?: string;
    profileId: string;
}

export const ProfileRating = memo((props: ProfileRatingProps) => {
    const {
        className, profileId,
    } = props;

    const user = useSelector(getUserAuthData);

    const { data, isLoading } = useGetProfileRating({
        profileId, userId: user?.id ?? '',
    });

    const [rateProfileMutation] = useRateProfile();

    const rating = data?.[0];

    const onRateProfile = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateProfileMutation({
                userId: user?.id ?? '',
                profileId,
                rate: starsCount,
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    }, [profileId, rateProfileMutation, user?.id]);

    const onCancel = useCallback((starsCount: number) => {
        onRateProfile(starsCount);
    }, [onRateProfile]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        onRateProfile(starsCount, feedback);
    }, [onRateProfile]);

    if (isLoading) {
        return (
            <Skeleton width="100%" height={120} />
        );
    }

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={classNames('', {}, [className])}
            title="Оцените статью"
            feedbackTitle="Оставьте, пожалуйста, свой отзыв о статье"
            hasFeedback
        />
    );
});
