import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;

    const { id } = useParams<{id: string}>();

    if (!id && __PROJECT__ !== 'storybook') {
        return (
            <div className={classNames('', {}, [className])}>
                Статья не найдена
            </div>
        );
    }

    return (
        <div className={classNames('', {}, [className])}>
            <ArticleDetails id={id || ''} />
        </div>
    );
};

export default memo(ArticleDetailsPage);
