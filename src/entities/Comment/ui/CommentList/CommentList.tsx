import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppText } from 'shared/ui/AppText/AppText';
import { AppComment } from 'entities/Comment/model/types/AppComment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments?: AppComment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const {
        className,
        comments,
        isLoading,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard key={comment.id} isLoading={isLoading} className={cls.comment} comment={comment} />
                ))
                : <AppText title="Комментариев пока нет" />}
        </div>
    );
});
