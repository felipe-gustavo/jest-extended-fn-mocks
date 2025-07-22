export const j = <T>(source: T) => jest.mocked<T>(source)
export type J = typeof j

export type C = typeof c
export const c = <C>(value: unknown) => value as C

export function mockJestHook(
  hook: 'beforeAll' | 'beforeEach' | 'afterEach' | 'afterAll',
) {
  return jest.spyOn(globalThis, hook).mockImplementation(() => null)
}

export function getLastCallbackFromJestHook<J extends jest.SpyInstance>(
  hook: J,
): () => void {
  const callback = hook.mock.lastCall?.[0]
  return callback?.bind?.(undefined, c<jest.DoneCallback>({}))
}
