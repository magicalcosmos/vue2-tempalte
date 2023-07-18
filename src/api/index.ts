/*
 * @Author: your name
 * @Date: 2020-05-27 17:51:03
 * @LastEditTime: 2020-07-14 15:06:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /rocket-web/src/api/index.ts
 */
import Authorization from './authorization';
import UserInformation from './userInformation';
import Common from './common';
import UserManagement from './systemManagement/userManagement';
import CompileEnvManagement from './systemManagement/compileEnvManagement';
import UserDefinedFieldsManagement from './systemManagement/userDefinedFieldsManagement';
import LicenseManagement from './systemManagement/licenseManagement';
import ProjectManagement from './tester/projectManagement';
import ProjectVersionManagement from './tester/projectVersionManagement';
import FileManagement from './tester/fileManagement';
import FilesManagement from './systemManagement/filesManagement';
import GlobalConfig from './tester/globalConfig';
import FunctionsManagement from './tester/functionsManagement';
import TestCaseManagement from './tester/testCaseManagement';
import AllTaskMonitorManagement from './systemManagement/allTaskMonitorManagement';
import MyTaskMonitorManagement from './tester/myTaskMonitorManagement';
import PointerTargetManagement from './tester/pointerTargetManagement';
import StubPointerTargetManagement from './tester/stubPointerTargetManagement';
import StubFunctionManagement from './tester/stubFunctionManagement';
import AbsoluteAddressManagement from './tester/absoluteAddressManagement';
import TesterCompileEnvManagement from './tester/compileEnvManagement';
import FileSubElementManagement from './tester/fileSubElementManagement';
import SystemTestReport from './systemManagement/testReport';
import KnowledgeCenterManagement from './tester/knowledgeCenterManagement';
import DetectionTemplateManagement from './tester/detectionTemplateManagement';
import StaticAnalysis from './tester/staticAnalysis';
import TestLeadManagement from './systemManagement/testLeadManagement';
import LogManagement from './systemManagement/logManagement';

export {
  Authorization,
  UserInformation,
  Common,
  UserManagement,
  CompileEnvManagement,
  UserDefinedFieldsManagement,
  LicenseManagement,
  ProjectManagement,
  ProjectVersionManagement,
  FileManagement,
  FilesManagement,
  GlobalConfig,
  FunctionsManagement,
  TestCaseManagement,
  AllTaskMonitorManagement,
  MyTaskMonitorManagement,
  PointerTargetManagement,
  StubPointerTargetManagement,
  StubFunctionManagement,
  AbsoluteAddressManagement,
  TesterCompileEnvManagement,
  FileSubElementManagement,
  SystemTestReport,
  KnowledgeCenterManagement,
  DetectionTemplateManagement,
  StaticAnalysis,
  TestLeadManagement,
  LogManagement
};
