import { AppComment } from 'entities/Comment';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleDetailsCommentsSchema extends EntityState<AppComment>{
    isLoading?: boolean;
    error?: string;
}
