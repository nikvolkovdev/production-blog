import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RatingCard } from '@/entities/Rating';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const {
        className, articleId,
    } = props;

    const user = useSelector(getUserAuthData);

    const { data, isLoading } = useGetArticleRating({
        articleId, userId: user?.id ?? '',
    });

    const [rateArticleMutation] = useRateArticle();

    const rating = data?.[0];

    const onRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: user?.id ?? '',
                articleId,
                rate: starsCount,
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    }, [articleId, rateArticleMutation, user?.id]);

    const onCancel = useCallback((starsCount: number, feedback?: string) => {
        onRateArticle(starsCount);
    }, [onRateArticle]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        onRateArticle(starsCount, feedback);
    }, [onRateArticle]);

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

export default ArticleRating;
