import { ImplementationFn } from '@/types/helpers'

export function mockImplementationForDescribe(
  this: jest.Mock,
  implementation: NonNullable<ImplementationFn>,
) {
  let previousImplementation: ImplementationFn
  let firstImplementation: ImplementationFn

  beforeAll(() => {
    firstImplementation = this.getMockImplementation()
  })

  beforeEach(() => {
    previousImplementation = this.getMockImplementation()
    this.mockImplementation(implementation)
  })

  afterEach(() => {
    this.mockImplementation(previousImplementation)
  })

  afterAll(() => {
    this.mockImplementation(firstImplementation)
  })

  return this
}
