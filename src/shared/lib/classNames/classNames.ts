export type Mods = Record<string, string | boolean | undefined>;

export const classNames = (cls: string, mods: Mods = {}, additional: Array<string | undefined> = []) =>
    [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([key, value]) => Boolean(value))
            .map(([key, value]) => key),
    ].join(' ');
