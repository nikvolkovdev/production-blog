import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import { HStack } from 'shared/ui/Stack';
import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const {
        className,
    } = props;

    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
        navigate(ROUTE_PATH.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(`${ROUTE_PATH.article_details}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <AppButton variant={ButtonVariant.OUTLINE} onClick={onBackToList}>
                Назад к списку
            </AppButton>
            {canEdit && (
                <AppButton
                    variant={ButtonVariant.OUTLINE}
                    onClick={onEditArticle}
                >
                    Редактировать
                </AppButton>
            )}
        </HStack>
    );
});
