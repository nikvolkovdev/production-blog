import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppComment } from 'entities/Comment';
import { AppAvatar } from 'shared/ui/AppAvatar/AppAvatar';
import { AppText } from 'shared/ui/AppText/AppText';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment: AppComment;
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
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} borderRadius="50%" />
                    <Skeleton width={100} height={16} className={cls.username} />
                </div>
                <Skeleton width="100%" height={50} className={cls.description} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <div className={cls.header}>
                {comment.user.avatar ? <AppAvatar size={30} src={comment.user.avatar} /> : null}
                <AppText className={cls.username} title={comment.user.username} />
            </div>
            <AppText className={cls.description} description={comment.text} />
        </div>
    );
});
