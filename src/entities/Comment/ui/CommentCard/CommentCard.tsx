import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppComment } from 'entities/Comment';
import { AppAvatar } from 'shared/ui/AppAvatar/AppAvatar';
import { AppText } from 'shared/ui/AppText/AppText';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment?: AppComment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className,
        comment,
        isLoading,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} borderRadius="50%" />
                    <Skeleton width={100} height={16} className={cls.username} />
                </div>
                <Skeleton width="100%" height={50} className={cls.description} />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink to={`${ROUTE_PATH.profile}${comment.user.id}`} className={cls.header}>
                {comment.user.avatar ? <AppAvatar size={30} src={comment.user.avatar} /> : null}
                <AppText className={cls.username} title={comment.user.username} />
            </AppLink>
            <AppText className={cls.description} description={comment.text} />
        </div>
    );
});
