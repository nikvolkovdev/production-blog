import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlePageHasMore = (state: StateSchema) =>
    state.articlesPage?.hasMore;
