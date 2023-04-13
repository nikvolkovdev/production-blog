import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleType } from 'entities/Article/model/types/article';

export const getArticlesPageType = (state: StateSchema) => state.articlesPage?.type || ArticleType.ALL;
