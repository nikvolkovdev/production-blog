import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDisptach';
import { AppText, TextAlign, TextSize } from '@/shared/ui/AppText';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppAvatar } from '@/shared/ui/AppAvatar';
import { AppIcon } from '@/shared/ui/AppIcon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleBlock } from '../../model/types/article';
import { ArticleBlockType } from '../../model/consts/consts';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import EyeIcon from '../../../../shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '../../../../shared/assets/icons/calendar-20-20.svg';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const {
        className,
        id,
    } = props;

    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const dispatch = useAppDispatch();

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block} />;
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block} />;
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />;
        default:
            return null;
        }
    }, []);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={200} height={200} borderRadius="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <AppText title="Произошла ошибка при загрузке статьи" align={TextAlign.CENTER} />
        );
    } else {
        content = (
            <>
                <HStack justify="center" className={cls.avatarWrapper}>
                    <AppAvatar size={200} src={article?.img} className={cls.avatar} />
                </HStack>
                <VStack gap="4" data-testid="ArticleDetails.Info">
                    <AppText
                        className={cls.title}
                        title={article?.title}
                        description={article?.subtitle}
                        size={TextSize.L}
                    />
                    <HStack gap="8" className={cls.articleInfo}>
                        <AppIcon className={cls.icon} Svg={EyeIcon} />
                        <AppText description={String(article?.views)} />
                    </HStack>
                    <HStack gap="8" className={cls.articleInfo}>
                        <AppIcon className={cls.icon} Svg={CalendarIcon} />
                        <AppText description={article?.createdAt} />
                    </HStack>
                </VStack>

                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack gap="16" className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </VStack>
        </DynamicModuleLoader>

    );
});
