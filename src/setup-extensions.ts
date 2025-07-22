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

FnConstructor.prototype.mockReturnForDescribe = mockReturnForDescribe
FnConstructor.prototype.mockImplementationForDescribe =
  mockImplementationForDescribe
FnConstructor.prototype.mockReturnForTestcase = mockReturnForTestcase
FnConstructor.prototype.mockImplementationForTestcase =
  mockImplementationForTestcase

mockImplementationForTestcaseSetup()
mockReturnForTestcaseSetup()
