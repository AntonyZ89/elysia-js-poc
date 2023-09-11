import Elysia from 'elysia';

export type ResolveDotNotation<
  TObj,
  T extends string,
> = T extends `${infer Key}.${infer Rest}`
  ? Key extends keyof TObj
    ? ResolveDotNotation<TObj[Key], Rest>
    : never
  : T extends keyof TObj
  ? TObj[T]
  : never;

export type ResolveElysia<
  TInstance,
  TPath extends string,
> = TInstance extends Elysia<string, infer T>
  ? ResolveDotNotation<T, TPath>
  : never;
