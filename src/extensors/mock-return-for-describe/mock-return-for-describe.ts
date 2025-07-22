import { mergeDeepLeft } from 'ramda'

import { ImplementationFn } from '@/types/helpers'

export function mockReturnForDescribe(
  this: jest.Mock,
  value: unknown,
  mergeWithPrevious = false,
) {
  let previousImplementation: ImplementationFn
  let firstImplementation: ImplementationFn

  beforeAll(() => {
    firstImplementation = this.getMockImplementation()
  })

  beforeEach(() => {
    previousImplementation = this.getMockImplementation()
    this.mockImplementation(() => {
      const lastValue = mergeWithPrevious && previousImplementation?.()

      if (value instanceof Object && lastValue instanceof Object) {
        return mergeDeepLeft(value, lastValue)
      }

      return value
    })
  })

  afterEach(() => {
    this.mockImplementation(previousImplementation)
  })

  afterAll(() => {
    this.mockImplementation(firstImplementation)
  })

  return this
}
