import { mockImplementationForDescribe } from '@/extensors/mock-implementation-for-describe'
import {
  mockImplementationForTestcase,
  setup as mockImplementationForTestcaseSetup,
} from '@/extensors/mock-implementation-for-testcase'
import { mockReturnForDescribe } from '@/extensors/mock-return-for-describe'
import {
  mockReturnForTestcase,
  setup as mockReturnForTestcaseSetup,
} from '@/extensors/mock-return-for-testcase'

const FnConstructor = jest.fn().constructor

;[
  mockReturnForDescribe,
  mockImplementationForDescribe,
  mockReturnForTestcase,
  mockImplementationForTestcase,
].forEach(fn => {
  FnConstructor.prototype[fn.name] = fn
  globalThis.Function.constructor.prototype[fn.name] = fn
})

mockImplementationForTestcaseSetup()
mockReturnForTestcaseSetup()
