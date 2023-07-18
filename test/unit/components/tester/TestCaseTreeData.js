const data = [
  {
    fieldPath: 'input',
    name: '输入',
    children: [
      {
        fieldPath: 'variables.global',
        name: '全局变量',
        children: [
          {
            fieldPath: 'variables.global.g1.@value',
            initFieldPath: 'variables.global.g1.@init',
            name: 'g1',
            typeName: 'int',
            kind: 1,
            scope: 1,
            fileId: '616cd746ed00316bd7128c6c',
            filePath: './main.c',
            data: {
              '@type': 'int',
              '@value': ''
            },
            type: 1
          },
          {
            fieldPath: 'variables.global.g2.@value',
            initFieldPath: 'variables.global.g2.@init',
            name: 'g2',
            typeName: 'int',
            kind: 1,
            scope: 1,
            fileId: '616cd746ed00316bd7128c6c',
            filePath: './main.c',
            data: {
              '@type': 'int',
              '@value': ''
            },
            type: 1
          },
          {
            fieldPath: 'variables.global.g6.@value',
            initFieldPath: 'variables.global.g6.@init',
            name: 'g6',
            typeName: 'int',
            kind: 1,
            scope: 1,
            fileId: '616cd746ed00316bd7128c6c',
            filePath: './main.c',
            data: {
              '@type': 'int',
              '@value': ''
            },
            type: 1
          },
          {
            fieldPath: 'variables.global.g4.@value',
            initFieldPath: 'variables.global.g4.@init',
            name: 'g4',
            typeName: 'int',
            kind: 1,
            scope: 1,
            fileId: '616cd746ed00316bd7128c6d',
            filePath: './mcdc.c',
            data: {
              '@type': 'int',
              '@value': ''
            },
            type: 1
          },
          {
            fieldPath: 'variables.global.g5@616cd746ed00316bd7128c6f.@value',
            initFieldPath: 'variables.global.g5@616cd746ed00316bd7128c6f.@init',
            name: 'g5@616cd746ed00316bd7128c6f',
            typeName: 'int',
            kind: 1,
            scope: 1,
            fileId: '616cd746ed00316bd7128c6f',
            filePath: './static.c',
            data: {
              '@type': 'int',
              '@value': ''
            },
            type: 1
          }
        ]
      },
      {
        fieldPath: 'variables.statics',
        name: '局部静态变量',
        children: [
          {
            fieldPath: 'variables.statics.0@616fe1b7309f7532bf534e9c.@value',
            name: 's1',
            typeName: 'int',
            kind: 23,
            scope: 1,
            location: {
              begin: {
                column: '15',
                line: '16'
              },
              end: {
                column: '16',
                line: '16'
              }
            },
            index: '0@616fe1b7309f7532bf534e9c',
            fileId: '616cd746ed00316bd7128c6c',
            filePath: './main.c',
            data: {
              '@type': 'int',
              '@value': ''
            },
            type: 1
          },
          {
            fieldPath: 'variables.statics.0@616fe1b83d711832c5ccb7a3.@value',
            name: 's4',
            typeName: 'int',
            kind: 23,
            scope: 1,
            location: {
              begin: {
                column: '14',
                line: '5'
              },
              end: {
                column: '15',
                line: '5'
              }
            },
            index: '0@616fe1b83d711832c5ccb7a3',
            fileId: '616cd746ed00316bd7128c6d',
            filePath: './mcdc.c',
            data: {
              '@type': 'int',
              '@value': ''
            },
            type: 1
          }
        ]
      },
      {
        fieldPath: 'stubs',
        name: '桩函数',
        children: [
          {
            fieldPath: 'stubs.printf',
            kind: 10,
            name: 'printf(const char * _0)',
            stubName: 'printf',
            typeName: 'int',
            times: [
              0
            ],
            time: 0,
            currentTimes: 0,
            currentStubKind: 1,
            children: [
              {
                fieldPath: 'stubs.printf.@value.0.%.@value',
                initFieldPath: 'stubs.printf.@value.0.%.@init',
                name: 'return',
                typeName: 'int',
                kind: 11,
                scope: 1,
                fileId: '616cd746ed00316bd7128c6c',
                filePath: './main.c',
                data: {
                  '@type': 'int',
                  '@value': ''
                },
                type: 1
              },
              {
                fieldPath: 'stubs.printf.@value.0.params.0.@value',
                name: '_0',
                kind: 12,
                scope: 1,
                stubPath: 'stubs.printf.@value.0',
                typeName: 'const char *',
                data: {
                  '@value': '',
                  '@type': 'const char *'
                },
                type: 2,
                pointeeType: 'const char',
                fileId: '616cd746ed00316bd7128c6c',
                filePath: './main.c'
              }
            ],
            data: {
              '%': {
                '@type': 'int'
              },
              '@attributes': [
                'isVariadic',
                'isNotDefined'
              ],
              '@fullname': 'printf(const char *,...)',
              '@mangled': '_Z6printf',
              '@name': 'printf',
              '@nameargs': 'printf(const char *,...)',
              '@nameparams': 'printf(const char * _0)',
              params: [
                {
                  '@name': '_0',
                  '@type': 'const char *'
                }
              ],
              stubsTriggerKind: 1,
              fileId: '616cd746ed00316bd7128c6c',
              filePath: './main.c',
              enableStub: true,
              originalName: 'printf'
            },
            fileId: '616cd746ed00316bd7128c6c',
            filePath: './main.c'
          }
        ]
      }
    ]
  },
  {
    fieldPath: 'output',
    name: '输出',
    children: [
      {
        fieldPath: 'output.%',
        name: '返回值',
        children: [
          {
            fieldPath: 'output.%.@value',
            initFieldPath: 'output.%.@init',
            name: 'return',
            typeName: 'int',
            kind: 4,
            scope: 2,
            data: {
              '@result': '0',
              '@type': 'int',
              '@value': ''
            },
            type: 1
          }
        ]
      },
      {
        fieldPath: 'output.global',
        name: '全局变量',
        children: [
          {
            fieldPath: 'output.global.g1.@value',
            initFieldPath: 'output.global.g1.@init',
            name: 'g1',
            typeName: 'int',
            kind: 1,
            scope: 2,
            fileId: '616cd746ed00316bd7128c6c',
            filePath: './main.c',
            data: {
              '@result': '0',
              '@type': 'int'
            },
            type: 1
          },
          {
            fieldPath: 'output.global.g2.@value',
            initFieldPath: 'output.global.g2.@init',
            name: 'g2',
            typeName: 'int',
            kind: 1,
            scope: 2,
            fileId: '616cd746ed00316bd7128c6c',
            filePath: './main.c',
            data: {
              '@result': '0',
              '@type': 'int'
            },
            type: 1
          },
          {
            fieldPath: 'output.global.g6.@value',
            initFieldPath: 'output.global.g6.@init',
            name: 'g6',
            typeName: 'int',
            kind: 1,
            scope: 2,
            fileId: '616cd746ed00316bd7128c6c',
            filePath: './main.c',
            data: {
              '@result': '0',
              '@type': 'int'
            },
            type: 1
          }
        ]
      },
      {
        fieldPath: 'output.statics',
        name: '局部静态变量',
        children: [
          {
            fieldPath: 'output.statics.0@616fe1b7309f7532bf534e9c.@value',
            name: 's1',
            typeName: 'int',
            kind: 23,
            scope: 2,
            location: {
              begin: {
                column: '15',
                line: '16'
              },
              end: {
                column: '16',
                line: '16'
              }
            },
            index: '0@616fe1b7309f7532bf534e9c',
            fileId: '616cd746ed00316bd7128c6c',
            filePath: './main.c',
            data: {
              '@type': 'int'
            },
            type: 1
          }
        ]
      }
    ]
  }
];



const defaultExpandKeys = {
  'input': {
    'variables.global': true,
    'variables.statics': true,
    'stubs': true
  },
  'variables.global': {
    'variables.global.g1.@value': true,
    'variables.global.g2.@value': true,
    'variables.global.g6.@value': true,
    'variables.global.g4.@value': true,
    'variables.global.g5@616cd746ed00316bd7128c6f.@value': true
  },
  'variables.statics': {
    'variables.statics.0@616fe1b7309f7532bf534e9c.@value': true,
    'variables.statics.0@616fe1b83d711832c5ccb7a3.@value': true
  },
  'stubs': {
    'stubs.printf': true
  },
  'stubs.printf': {
    'stubs.printf.@value.0.%.@value': true,
    'stubs.printf.@value.0.params.0.@value': true
  },
  'output': {
    'output.%': true,
    'output.global': true,
    'output.statics': true
  },
  'output.%': {
    'output.%.@value': true
  },
  'output.global': {
    'output.global.g1.@value': true,
    'output.global.g2.@value': true,
    'output.global.g6.@value': true
  },
  'output.statics': {
    'output.statics.0@616fe1b7309f7532bf534e9c.@value': true
  }
};
export { data, defaultExpandKeys };
