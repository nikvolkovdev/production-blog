import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppPage } from 'widgets/AppPage/AppPage';
import { useParams } from 'react-router-dom';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const {
        className,
    } = props;
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id);

    return (
        <AppPage className={classNames(cls.ArticleEditPage, {}, [className])}>
            {isEdit ? `Редактирование статьи с ID = ${id}` : 'Создание новой статьи'}
        </AppPage>
    );
});

export default ArticleEditPage;