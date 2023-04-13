// page address, scroll position
export type ScrollSchema = Record<string, number>

export interface ScrollRecoverySchema {
    scroll: ScrollSchema;
}
