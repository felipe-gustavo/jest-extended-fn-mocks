/* eslint-disable @typescript-eslint/no-require-imports */
import * as mockImplForDescModule from '@/extensors/mock-implementation-for-describe'
import * as mockImplForTestcaseModule from '@/extensors/mock-implementation-for-testcase'
import * as mockReturnForDescModule from '@/extensors/mock-return-for-describe'
import * as mockReturnForTestcaseModule from '@/extensors/mock-return-for-testcase'

jest.mock('@/extensors/mock-implementation-for-describe')
jest.mock('@/extensors/mock-implementation-for-testcase')
jest.mock('@/extensors/mock-return-for-describe')
jest.mock('@/extensors/mock-return-for-testcase')

describe('setup-extensions', () => {
  it.each`
    methodName                         | fn
    ${'mockImplementationForDescribe'} | ${mockImplForDescModule.mockImplementationForDescribe}
    ${'mockImplementationForTestcase'} | ${mockImplForTestcaseModule.mockImplementationForTestcase}
    ${'mockReturnForDescribe'}         | ${mockReturnForDescModule.mockReturnForDescribe}
    ${'mockReturnForTestcase'}         | ${mockReturnForTestcaseModule.mockReturnForTestcase}
  `(
    'sets $methodName on jest.fn and Function prototype',
    ({ methodName, fn }) => {
      require('./setup-extensions')
      const jsFn = () => null
      expect(jest.fn()[c<keyof jest.Mock>(methodName)]).toBe(fn)
      expect(c<jest.Mock>(jsFn)[c<keyof jest.Mock>(methodName)]).toBe(fn)
    },
  )
  it.each`
    setupName                          | setupFn
    ${'mockImplementationForTestcase'} | ${mockImplForTestcaseModule.setup}
    ${'mockReturnForTestcase'}         | ${mockReturnForTestcaseModule.setup}
  `('runs setup for $setupName', ({ setupFn }) => {
    expect(setupFn).toHaveBeenCalled()
  })
})
