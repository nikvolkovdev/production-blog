import { EntityState } from '@reduxjs/toolkit';
import { AppComment } from '@/entities/Comment';

export interface ArticleDetailsCommentsSchema extends EntityState<AppComment> {
    isLoading?: boolean;
    error?: string;
}
