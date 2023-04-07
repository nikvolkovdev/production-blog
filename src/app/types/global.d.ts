declare module '*.css';
declare module '*.scss';

declare module '*.svg' {
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';

// eslint-disable-next-line no-unused-vars
declare const __IS_DEV__: boolean;
declare const __API__: string;

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
