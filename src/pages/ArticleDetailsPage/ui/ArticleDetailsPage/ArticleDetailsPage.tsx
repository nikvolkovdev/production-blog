import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleDetails } from '@/entities/Article';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AppPage } from '@/widgets/AppPage';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../../ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { articleDetailsPageReducer } from '../../model/slices';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleRating } from '@/features/articleRating';
import { getFeatureFlag } from '@/shared/lib/features';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');

    if (!id) {
        return <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>Статья не найдена</div>;
    }

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <AppPage className={classNames('', {}, [className])}>
                <VStack
                    gap="16"
                    max
                >
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    {isArticleRatingEnabled && <ArticleRating articleId={id} />}
                    {/* { */}
                    {/*    toggleFeatures({ */}
                    {/*        name: 'isArticleRatingEnabled', */}
                    {/*        on: () => <ArticleDetailsPageRedesigned />, */}
                    {/*        off: () => <ArticleDetailsPage />, */}
                    {/*    }) */}
                    {/* } */}
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments
                        id={id}
                        className={cls.commentTitle}
                    />
                </VStack>
            </AppPage>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
