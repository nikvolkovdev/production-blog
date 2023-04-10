import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppText } from 'shared/ui/AppText/AppText';
import { AppComment } from 'entities/Comment/model/types/comment';
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

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard isLoading={isLoading} className={cls.comment} comment={comment} />
                ))
                : <AppText title="Комментариев пока нет" />}
        </div>
    );
});
