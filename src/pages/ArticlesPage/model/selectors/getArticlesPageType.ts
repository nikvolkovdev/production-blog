import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article/model/consts/consts';

export const getArticlesPageType = (state: StateSchema) => state.articlesPage?.type || ArticleType.ALL;
