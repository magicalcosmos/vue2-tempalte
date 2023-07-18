import Mock from 'mockjs';
const versionData = Mock.mock({
  versionId: '613b058978b1b818381f8d62',
  versionName: 'v1',
  createAt: 1631257993000,
  visitAt: 1631257992999,
  finishAt: 1631257992999,
  environmentChanged: false,
  headers: {
    suffixes: ['.h']
  },
  languages: {
    c: {
      standard: 'c89',
      suffixes: ['.c']
    }
  },
  includes: ['./'],
  macros: [],
  caseSensitive: true,
  systemType: 32,
  repository: {
    type: 'git',
    url: 'http://localhost:9526/60fa24ca1ed9ab04053c2c61/613b057ebf132f2663ffb562'
  },
  language: 'c',
  environment: 'localhost',
  ignoreAsm: true,
  projectType: 'gcc',
  exits: [''],
  rootDirectory: {
    id: '613b058f9b6c8a264d8aae5d',
    fileId: '613b058f9b6c8a264d8aae5d',
    fileName: '.',
    name: '.',
    path: '.',
    status: 201,
    kind: 2,
    statementCoverage: 0,
    branchCoverage: 0,
    mcdcCoverage: 0,
    invokeCoverage: 0,
    invokedFuncCoverage: 0,
    defectsCount: {},
    fileCount: {
      _: 1,
      _c: 6,
      _h: 1
    },
    blockFilesCount: {}
  },
  unitTest: {
    eventReminder: {
      defectsCleared: 0,
      configConfirmed: true,
      parsed: true,
      regressionStatusPrompt: 0,
      firstVisit: 0
    },
    timeoutTestGen: 10,
    timeoutTestRun: 10,
    coverages: 7,
    status: 1,
    strictOutputCheck: true
  },
  staticAnalyze: {
    eventReminder: {
      defectsCleared: 0,
      configConfirmed: true,
      parsed: false,
      regressionStatusPrompt: 0,
      firstVisit: 1
    },
    status: 1,
    analyzeTemplate: '612893bcede44676432c4374'
  },
  integrationTest: {
    eventReminder: {
      defectsCleared: 0,
      configConfirmed: true,
      parsed: true,
      regressionStatusPrompt: 0,
      firstVisit: 0
    },
    fileRelation: false,
    timeoutTestRun: 10,
    coverages: 31,
    status: 1,
    strictOutputCheck: false
  }
});

const statisticsData = Mock.mock({
  function: {
    total: 20
  },
  file: {
    total: 7,
    headers: {
      total: 1
    },
    languages: {
      c: {
        total: 6
      },
      'c++': {
        total: 0
      }
    },
    notCompiledCount: 1,
    compileFailedCount: 0,
    compiledCount: 6,
    waiting4compiling: 0,
    coverage: 6,
    codeDefects: 1,
    testResult: {
      unknown: 2,
      succeed: 0,
      failed: 0,
      noResult: 0,
      runtimeError: 0,
      exception: 0,
      nonStrictSucceed: 0
    }
  }
});

const wsMessageData = Mock.mock({
  cmd: 'update',
  domain: 'function',
  data: {
    functionFullName: 'func(int (*)())',
    functionNameArgs: 'func(int (*)())',
    depth: 1,
    parentId: '613b058f9b6c8a264d8aae5f',
    kind: 30,
    mangledId: '_Z4func',
    index: 1,
    language: 'c',
    functionAttrs: [],
    parents: ['613b058f9b6c8a264d8aae5f'],
    location: {
      column: 1,
      line: 1
    },
    creatorId: '60fa24ca1ed9ab04053c2c61',
    projectId: '613b057ebf132f2663ffb562',
    versionId: '613b058978b1b818381f8d62',
    fileId: '613b058f9b6c8a264d8aae5f',
    functionId: '61775baeabf031550e2f327b',
    id: '61775baeabf031550e2f327b',
    failed: null,
    statementCoverage: 0,
    invokeCoverage: 0,
    invokedFuncCoverage: 0,
    functionStatus: 205
  }
});
export { versionData, statisticsData, wsMessageData };
