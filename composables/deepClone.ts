export function useDeepCloneArray<T>(array: T[]) {
  return array.map((item) => structuredClone(toRaw(item)));
}
