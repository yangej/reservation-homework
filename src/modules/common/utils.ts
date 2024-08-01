export const pick = <T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): Pick<T, K> => {
  let result: any = {};

  for (const key of keys) {
    result = { ...result, [key]: source[key] };
  }

  return result;
};
