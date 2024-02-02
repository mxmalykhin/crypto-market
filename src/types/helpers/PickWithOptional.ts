export type PickWithOptional<
  T,
  K extends keyof T,
  Optional extends keyof T = never,
> = Pick<T, Exclude<K, Optional>> & Partial<Pick<T, Optional>>;
