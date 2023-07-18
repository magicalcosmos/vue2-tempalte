import Mock, { Random } from 'mockjs';
const language = Random.boolean() ? 'c' : 'c++';
const macros = Mock.mock({
  'array|0-5': [
    {
      'key': Random.word(),
      'value': Random.word()
    }
  ]
}).array;

export const versionData = {
  'versionId': '61284eb6569a450356daac61',
  'versionName': 'v5',
  'visitAt': 1630031542086,
  'finishAt': 1630031542086,
  'environmentChanged': false,
  'headers': {
    'suffixes': [
      '.h',
      '.hpp',
      '.hh',
      '.hxx',
      '.h++',
      '.hp',
      '.inc',
      '.tpl'
    ]
  },
  'languages': {
    'c': {
      'standard': 'c89',
      'suffixes': [
        '.c'
      ]
    },
    'c++': {
      'standard': 'c++98',
      'suffixes': [
        '.cpp',
        '.cc',
        '.cxx',
        '.c++',
        '.cp'
      ]
    }
  },
  'includes': [
    './'
  ],
  'macros': [],
  'caseSensitive': true,
  'systemType': 32,
  'repository': {
    'type': 'git',
    'url': 'http://localhost:9526/608a2b3e3a82ef7fb6da6fbd/60c992f28fd6a00eed4963c1'
  },
  'language': 'c++',
  'environment': 'localhost',
  'ignoreAsm': true,
  'projectType': 'ANSI/ISO C/C++',
  'exits': [
    ''
  ],
  'rootDirectory': {
    'id': '61284ecb0c9c04037f996d26',
    'fileId': '61284ecb0c9c04037f996d26',
    'fileName': '.',
    'name': '.',
    'path': '.',
    'status': 201,
    'kind': 2,
    'defectsCount': {},
    'fileCount': {
      '_': 2,
      '_c': 13
    },
    'blockFilesCount': {}
  },
  'unitTest': {
    'eventReminder': {
      'defectsCleared': 0,
      'configConfirmed': true,
      'parsed': false,
      'regressionStatusPrompt': 0,
      'firstVisit': 0
    },
    'timeoutTestGen': 10,
    'timeoutTestRun': 10,
    'coverages': 7,
    'status': 1,
    'strictOutputCheck': true
  },
  'staticAnalyze': {
    'eventReminder': {
      'defectsCleared': 0,
      'configConfirmed': true,
      'parsed': false,
      'regressionStatusPrompt': 0,
      'firstVisit': 1
    },
    'status': 1,
    'analyzeTemplate': '60b72245372b093cd6352d77'
  },
  'integrationTest': {
    'eventReminder': {
      'defectsCleared': 0,
      'configConfirmed': true,
      'parsed': false,
      'regressionStatusPrompt': 0,
      'firstVisit': 0
    },
    'fileRelation': false,
    'timeoutTestRun': 10,
    'coverages': 26,
    'status': 1,
    'strictOutputCheck': true
  }
};
