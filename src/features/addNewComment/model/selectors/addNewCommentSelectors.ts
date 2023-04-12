import { StateSchema } from 'app/providers/StoreProvider';

export const getAddCommentFormText = (state: StateSchema) => state.addNewComment?.text;
export const getAddCommentFormError = (state: StateSchema) => state.addNewComment?.error;
