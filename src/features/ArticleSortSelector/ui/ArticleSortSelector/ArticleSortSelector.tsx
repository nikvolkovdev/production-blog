import { memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppSelect, SelectOption } from '@/shared/ui/AppSelect';
import { SortOrder } from '@/shared/types/sort';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { className, sort, order, onChangeOrder, onChangeSort } = props;

    // const changeSortHandler = useCallback((newSort: string) => {
    //     onChangeSort(newSort as ArticleSortField);
    // }, [onChangeSort]);
    //
    // const changeOrderHandler = useCallback((newOrder: string) => {
    //     onChangeOrder(newOrder as SortOrder);
    // }, [onChangeOrder]);

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: 'возрастанию',
            },
            {
                value: 'desc',
                content: 'убыванию',
            },
        ],
        [],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            {
                value: ArticleSortField.CREATED,
                content: 'дате создания',
            },
            {
                value: ArticleSortField.TITLE,
                content: 'названию',
            },
            {
                value: ArticleSortField.VIEWS,
                content: 'просмотрам',
            },
        ],
        [],
    );

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <AppSelect<ArticleSortField>
                options={sortFieldOptions}
                label="Сортировать по "
                value={sort}
                onChangeValue={onChangeSort}
            />
            <AppSelect<SortOrder>
                options={orderOptions}
                label="по "
                value={order}
                onChangeValue={onChangeOrder}
                className={cls.order}
            />
        </div>
    );
});
