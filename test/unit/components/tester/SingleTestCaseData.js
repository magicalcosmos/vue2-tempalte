import Mock from 'mockjs';
const typeSystemData = Mock.mock({
  data: {
    '616fd5f0780b8c7e9baf2c8c': {
      char: {
        '@attributes': ['isChar', 'isInteger', 'isReal'],
        '@canonical': 'char',
        '@unqualified': 'char'
      },
      'char *': {
        '@attributes': ['isPointer'],
        '@canonical': 'char *',
        '@pointeeType': 'char',
        '@unqualified': 'char *'
      },
      'const char': {
        '@attributes': ['isChar', 'isInteger', 'isReal', 'isConst'],
        '@canonical': 'const char',
        '@unqualified': 'char'
      },
      'const char *': {
        '@attributes': ['isPointer'],
        '@canonical': 'const char *',
        '@pointeeType': 'const char',
        '@unqualified': 'const char *'
      },
      int: {
        '@attributes': ['isInteger', 'isReal'],
        '@canonical': 'int',
        '@unqualified': 'int'
      },
      'int (*)(const char *, ．．．)': {
        '@attributes': ['isPointer', 'isFunctionPointer'],
        '@canonical': 'int (*)(const char *, ．．．)',
        '@pointeeType': 'int (const char *, ．．．)',
        '@unqualified': 'int (*)(const char *, ．．．)'
      },
      'int (*)(int, int)': {
        '@attributes': ['isPointer', 'isFunctionPointer'],
        '@canonical': 'int (*)(int, int)',
        '@pointeeType': 'int (int, int)',
        '@unqualified': 'int (*)(int, int)'
      },
      'int (const char *, ．．．)': {
        '%': {
          '@type': 'int'
        },
        '@attributes': ['isFunction', 'isVariadic'],
        '@canonical': 'int (const char *, ．．．)',
        '@name': 'int (const char *, ．．．)',
        '@unqualified': 'int (const char *, ．．．)',
        params: [
          {
            '@name': '_0',
            '@type': 'const char *'
          }
        ]
      },
      'int (int, int)': {
        '%': {
          '@type': 'int'
        },
        '@attributes': ['isFunction'],
        '@canonical': 'int (int, int)',
        '@name': 'int (int, int)',
        '@unqualified': 'int (int, int)',
        params: [
          {
            '@name': '_0',
            '@type': 'int'
          },
          {
            '@name': '_1',
            '@type': 'int'
          }
        ]
      },
      'int *': {
        '@attributes': ['isPointer'],
        '@canonical': 'int *',
        '@pointeeType': 'int',
        '@unqualified': 'int *'
      },
      'int [2]': {
        '@attributes': ['isArray'],
        '@canonical': 'int [2]',
        '@elementType': 'int',
        '@length': '2',
        '@unqualified': 'int [2]'
      }
    },
    '616fd5f0780b8c7e9baf2c8d': {
      char: {
        '@attributes': ['isChar', 'isInteger', 'isReal'],
        '@canonical': 'char',
        '@unqualified': 'char'
      },
      'char *': {
        '@attributes': ['isPointer'],
        '@canonical': 'char *',
        '@pointeeType': 'char',
        '@unqualified': 'char *'
      },
      'const char': {
        '@attributes': ['isChar', 'isInteger', 'isReal', 'isConst'],
        '@canonical': 'const char',
        '@unqualified': 'char'
      },
      'const char *': {
        '@attributes': ['isPointer'],
        '@canonical': 'const char *',
        '@pointeeType': 'const char',
        '@unqualified': 'const char *'
      },
      int: {
        '@attributes': ['isInteger', 'isReal'],
        '@canonical': 'int',
        '@unqualified': 'int'
      },
      'int (*)(const char *, ．．．)': {
        '@attributes': ['isPointer', 'isFunctionPointer'],
        '@canonical': 'int (*)(const char *, ．．．)',
        '@pointeeType': 'int (const char *, ．．．)',
        '@unqualified': 'int (*)(const char *, ．．．)'
      },
      'int (*)(int)': {
        '@attributes': ['isPointer', 'isFunctionPointer'],
        '@canonical': 'int (*)(int)',
        '@pointeeType': 'int (int)',
        '@unqualified': 'int (*)(int)'
      },
      'int (const char *, ．．．)': {
        '%': {
          '@type': 'int'
        },
        '@attributes': ['isFunction', 'isVariadic'],
        '@canonical': 'int (const char *, ．．．)',
        '@name': 'int (const char *, ．．．)',
        '@unqualified': 'int (const char *, ．．．)',
        params: [
          {
            '@name': '_0',
            '@type': 'const char *'
          }
        ]
      },
      'int (int)': {
        '%': {
          '@type': 'int'
        },
        '@attributes': ['isFunction'],
        '@canonical': 'int (int)',
        '@name': 'int (int)',
        '@unqualified': 'int (int)',
        params: [
          {
            '@name': '_0',
            '@type': 'int'
          }
        ]
      }
    },
    '616fd5f0780b8c7e9baf2c8f': {
      _IO_lock_t: {
        '@alias': 'void',
        '@attributes': ['isVoid', 'isNonCanonical', 'isTypedef'],
        '@canonical': 'void',
        '@unqualified': 'void'
      },
      '_IO_lock_t *': {
        '@attributes': ['isPointer', 'isVoidPointer'],
        '@canonical': 'void *',
        '@pointeeType': '_IO_lock_t',
        '@unqualified': 'void *'
      },
      __off64_t: {
        '@alias': 'long',
        '@attributes': ['isInteger', 'isReal', 'isNonCanonical', 'isTypedef'],
        '@canonical': 'long',
        '@unqualified': 'long'
      },
      __off_t: {
        '@alias': 'long',
        '@attributes': ['isInteger', 'isReal', 'isNonCanonical', 'isTypedef'],
        '@canonical': 'long',
        '@unqualified': 'long'
      },
      char: {
        '@attributes': ['isChar', 'isInteger', 'isReal'],
        '@canonical': 'char',
        '@unqualified': 'char'
      },
      'char *': {
        '@attributes': ['isPointer'],
        '@canonical': 'char *',
        '@pointeeType': 'char',
        '@unqualified': 'char *'
      },
      'char [1]': {
        '@attributes': ['isArray'],
        '@canonical': 'char [1]',
        '@elementType': 'char',
        '@length': '1',
        '@unqualified': 'char [1]'
      },
      'char [20]': {
        '@attributes': ['isArray'],
        '@canonical': 'char [20]',
        '@elementType': 'char',
        '@length': '20',
        '@unqualified': 'char [20]'
      },
      'const char': {
        '@attributes': ['isChar', 'isInteger', 'isReal', 'isConst'],
        '@canonical': 'const char',
        '@unqualified': 'char'
      },
      'const char *': {
        '@attributes': ['isPointer'],
        '@canonical': 'const char *',
        '@pointeeType': 'const char',
        '@unqualified': 'const char *'
      },
      'const char *[]': {
        '@attributes': ['isArray'],
        '@canonical': 'const char *[]',
        '@elementType': 'const char *',
        '@length': '0',
        '@unqualified': 'const char *[]'
      },
      'const char *const': {
        '@attributes': ['isPointer', 'isConst'],
        '@canonical': 'const char *const',
        '@unqualified': 'const char *'
      },
      'const char *const []': {
        '@attributes': ['isArray'],
        '@canonical': 'const char *const[]',
        '@elementType': 'const char *const',
        '@length': '0',
        '@unqualified': 'const char *[]'
      },
      'const char *const[]': {
        '@attributes': ['isArray', 'isConst'],
        '@canonical': 'const char *const[]',
        '@non-canonicals': ['const char *const []'],
        '@unqualified': 'const char *[]'
      },
      int: {
        '@attributes': ['isInteger', 'isReal'],
        '@canonical': 'int',
        '@unqualified': 'int'
      },
      'int (*)(const char *, ．．．)': {
        '@attributes': ['isPointer', 'isFunctionPointer'],
        '@canonical': 'int (*)(const char *, ．．．)',
        '@pointeeType': 'int (const char *, ．．．)',
        '@unqualified': 'int (*)(const char *, ．．．)'
      },
      'int (*)(int, int, int)': {
        '@attributes': ['isPointer', 'isFunctionPointer'],
        '@canonical': 'int (*)(int, int, int)',
        '@pointeeType': 'int (int, int, int)',
        '@unqualified': 'int (*)(int, int, int)'
      },
      'int (const char *, ．．．)': {
        '%': {
          '@type': 'int'
        },
        '@attributes': ['isFunction', 'isVariadic'],
        '@canonical': 'int (const char *, ．．．)',
        '@name': 'int (const char *, ．．．)',
        '@unqualified': 'int (const char *, ．．．)',
        params: [
          {
            '@name': '_0',
            '@type': 'const char *'
          }
        ]
      },
      'int (int, int, int)': {
        '%': {
          '@type': 'int'
        },
        '@attributes': ['isFunction'],
        '@canonical': 'int (int, int, int)',
        '@name': 'int (int, int, int)',
        '@unqualified': 'int (int, int, int)',
        params: [
          {
            '@name': '_0',
            '@type': 'int'
          },
          {
            '@name': '_1',
            '@type': 'int'
          },
          {
            '@name': '_2',
            '@type': 'int'
          }
        ]
      },
      long: {
        '@attributes': ['isInteger', 'isReal'],
        '@canonical': 'long',
        '@non-canonicals': ['__off_t', '__off64_t'],
        '@unqualified': 'long'
      },
      'signed char': {
        '@attributes': ['isChar', 'isInteger', 'isReal'],
        '@canonical': 'signed char',
        '@unqualified': 'signed char'
      },
      size_t: {
        '@alias': 'unsigned long',
        '@attributes': ['isInteger', 'isReal', 'isNonCanonical', 'isTypedef'],
        '@canonical': 'unsigned long',
        '@unqualified': 'unsigned long'
      },
      'struct _IO_FILE': {
        '@attributes': ['isRecord', 'isStructure'],
        '@canonical': 'struct _IO_FILE',
        '@fields': {
          _IO_backup_base: {
            '@type': 'char *'
          },
          _IO_buf_base: {
            '@type': 'char *'
          },
          _IO_buf_end: {
            '@type': 'char *'
          },
          _IO_read_base: {
            '@type': 'char *'
          },
          _IO_read_end: {
            '@type': 'char *'
          },
          _IO_read_ptr: {
            '@type': 'char *'
          },
          _IO_save_base: {
            '@type': 'char *'
          },
          _IO_save_end: {
            '@type': 'char *'
          },
          _IO_write_base: {
            '@type': 'char *'
          },
          _IO_write_end: {
            '@type': 'char *'
          },
          _IO_write_ptr: {
            '@type': 'char *'
          },
          __pad1: {
            '@type': 'void *'
          },
          __pad2: {
            '@type': 'void *'
          },
          __pad3: {
            '@type': 'void *'
          },
          __pad4: {
            '@type': 'void *'
          },
          __pad5: {
            '@type': 'size_t'
          },
          _chain: {
            '@type': 'struct _IO_FILE *'
          },
          _cur_column: {
            '@type': 'unsigned short'
          },
          _fileno: {
            '@type': 'int'
          },
          _flags: {
            '@type': 'int'
          },
          _flags2: {
            '@type': 'int'
          },
          _lock: {
            '@type': '_IO_lock_t *'
          },
          _markers: {
            '@type': 'struct _IO_marker *'
          },
          _mode: {
            '@type': 'int'
          },
          _offset: {
            '@type': '__off64_t'
          },
          _old_offset: {
            '@type': '__off_t'
          },
          _shortbuf: {
            '@type': 'char [1]'
          },
          _unused2: {
            '@type': 'char [20]'
          },
          _vtable_offset: {
            '@type': 'signed char'
          }
        },
        '@unqualified': 'struct _IO_FILE'
      },
      'struct _IO_FILE *': {
        '@attributes': ['isPointer'],
        '@canonical': 'struct _IO_FILE *',
        '@pointeeType': 'struct _IO_FILE',
        '@unqualified': 'struct _IO_FILE *'
      },
      'struct _IO_FILE_plus': {
        '@attributes': ['isRecord', 'isStructure', 'isIncomplete'],
        '@canonical': 'struct _IO_FILE_plus',
        '@unqualified': 'struct _IO_FILE_plus'
      },
      'struct _IO_marker': {
        '@attributes': ['isRecord', 'isStructure'],
        '@canonical': 'struct _IO_marker',
        '@fields': {
          _next: {
            '@type': 'struct _IO_marker *'
          },
          _pos: {
            '@type': 'int'
          },
          _sbuf: {
            '@type': 'struct _IO_FILE *'
          }
        },
        '@unqualified': 'struct _IO_marker'
      },
      'struct _IO_marker *': {
        '@attributes': ['isPointer'],
        '@canonical': 'struct _IO_marker *',
        '@pointeeType': 'struct _IO_marker',
        '@unqualified': 'struct _IO_marker *'
      },
      'unsigned long': {
        '@attributes': ['isInteger', 'isReal'],
        '@canonical': 'unsigned long',
        '@non-canonicals': ['size_t'],
        '@unqualified': 'unsigned long'
      },
      'unsigned short': {
        '@attributes': ['isInteger', 'isReal'],
        '@canonical': 'unsigned short',
        '@unqualified': 'unsigned short'
      },
      void: {
        '@attributes': ['isVoid'],
        '@canonical': 'void',
        '@non-canonicals': ['_IO_lock_t'],
        '@unqualified': 'void'
      },
      'void *': {
        '@attributes': ['isPointer', 'isVoidPointer'],
        '@canonical': 'void *',
        '@non-canonicals': ['_IO_lock_t *'],
        '@pointeeType': 'void',
        '@unqualified': 'void *'
      }
    }
  }
});

const variablesData = Mock.mock({
  data: {
    fileId: '616fd5f0780b8c7e9baf2c8c',
    functionId: '61722aeb358f1d10e9f93b39',
    output: {
      '%': {
        '@type': 'int'
      },
      exceptions: [],
      global: {
        g1: {
          '@attributes': ['isExtern', 'isDefined'],
          '@type': 'int',
          '@value': '1',
          fileId: '616fd5f0780b8c7e9baf2c8c',
          filePath: './main.c',
          isOriginal: true,
          originalName: 'g1',
          '@name': 'g1'
        },
        g2: {
          '@attributes': ['isExtern', 'isDefined'],
          '@type': 'int',
          '@value': '2',
          fileId: '616fd5f0780b8c7e9baf2c8c',
          filePath: './main.c',
          isOriginal: true,
          originalName: 'g2',
          '@name': 'g2'
        },
        g6: {
          '@attributes': ['isStatic'],
          '@type': 'int',
          fileId: '616fd5f0780b8c7e9baf2c8c',
          filePath: './main.c',
          isOriginal: true,
          originalName: 'g6',
          '@name': 'g6'
        }
      },
      statics: {
        '0@61722aeb358f1d10e9f93b39': {
          '@attributes': ['isStatic', 'isDefined'],
          '@fullname': 's1',
          '@mangled': '_ZZ5main1E2s1',
          '@name': 's1',
          '@scopes': [
            {
              '@kind': ['FUNCTION'],
              '@mangled': '_Z5main1',
              '@name': 'main1'
            }
          ],
          '@type': 'int',
          '@value': '1',
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
          functionId: '61722aeb358f1d10e9f93b39',
          fileId: '616fd5f0780b8c7e9baf2c8c',
          filePath: './main.c',
          originalName: '0'
        }
      }
    },
    variables: {
      global: {
        g1: {
          '@attributes': ['isExtern', 'isDefined'],
          '@type': 'int',
          '@value': '1',
          fileId: '616fd5f0780b8c7e9baf2c8c',
          filePath: './main.c',
          isOriginal: true,
          originalName: 'g1',
          '@name': 'g1'
        },
        g2: {
          '@attributes': ['isExtern', 'isDefined'],
          '@type': 'int',
          '@value': '2',
          fileId: '616fd5f0780b8c7e9baf2c8c',
          filePath: './main.c',
          isOriginal: true,
          originalName: 'g2',
          '@name': 'g2'
        },
        g6: {
          '@attributes': ['isStatic'],
          '@type': 'int',
          fileId: '616fd5f0780b8c7e9baf2c8c',
          filePath: './main.c',
          isOriginal: true,
          originalName: 'g6',
          '@name': 'g6'
        },
        g4: {
          '@attributes': ['isExtern', 'isDefined'],
          '@type': 'int',
          '@value': '1',
          fileId: '616fd5f0780b8c7e9baf2c8d',
          filePath: './mcdc.c',
          isOriginal: false,
          originalName: 'g4',
          '@name': 'g4'
        },
        'g5@616fd5f0780b8c7e9baf2c8f': {
          '@attributes': ['isStatic', 'isDefined'],
          '@type': 'int',
          '@value': '5',
          fileId: '616fd5f0780b8c7e9baf2c8f',
          filePath: './static.c',
          isOriginal: false,
          originalName: 'g5',
          '@name': 'g5'
        }
      },
      statics: {
        '0@61722aeb358f1d10e9f93b39': {
          '@attributes': ['isStatic', 'isDefined'],
          '@fullname': 's1',
          '@mangled': '_ZZ5main1E2s1',
          '@name': 's1',
          '@scopes': [
            {
              '@kind': ['FUNCTION'],
              '@mangled': '_Z5main1',
              '@name': 'main1'
            }
          ],
          '@type': 'int',
          '@value': '1',
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
          functionId: '61722aeb358f1d10e9f93b39',
          fileId: '616fd5f0780b8c7e9baf2c8c',
          filePath: './main.c',
          originalName: '0'
        },
        '0@61722ac5358f1d10e9f93758': {
          '@attributes': ['isStatic', 'isDefined'],
          '@fullname': 's4',
          '@mangled': '_ZZ4add3E2s4',
          '@name': 's4',
          '@scopes': [
            {
              '@kind': ['FUNCTION'],
              '@mangled': '_Z4add3',
              '@name': 'add3'
            }
          ],
          '@type': 'int',
          '@value': '1',
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
          functionId: '61722ac5358f1d10e9f93758',
          fileId: '616fd5f0780b8c7e9baf2c8d',
          filePath: './mcdc.c',
          originalName: '0'
        }
      }
    },
    stubs: {
      printf: {
        '%': {
          '@type': 'int'
        },
        '@attributes': ['isVariadic', 'isNotDefined'],
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
        enableStub: true,
        fileId: '616fd5f0780b8c7e9baf2c8f',
        filePath: './static.c',
        originalName: 'printf'
      }
    }
  }
});

const functionInvokeData = Mock.mock({
  data: {
    functions: [
      {
        functionId: '61722ac7358f1d10e9f9383d',
        functionName: 'add1',
        mangledId: '_Z4add1',
        enableStub: false,
        attributes: null,
        returnType: 'int',
        isCreateManual: false,
        isDefine: true,
        fileId: '616fd5f0780b8c7e9baf2c8f',
        fileName: 'static.c',
        filePath: './static.c',
        files: [
          {
            fileName: 'static.c',
            path: './static.c',
            fileId: '616fd5f0780b8c7e9baf2c8f'
          }
        ]
      },
      {
        functionId: null,
        functionName: 'printf',
        mangledId: '_Z6printf',
        enableStub: true,
        attributes: ['isVariadic', 'isNotDefined'],
        returnType: 'int',
        isCreateManual: false,
        isDefine: false,
        fileId: '616fd5f0780b8c7e9baf2c8c',
        fileName: 'main.c',
        filePath: './main.c',
        files: [
          {
            fileName: 'mcdc.c',
            path: './mcdc.c',
            fileId: '616fd5f0780b8c7e9baf2c8d'
          },
          {
            fileName: 'static.c',
            path: './static.c',
            fileId: '616fd5f0780b8c7e9baf2c8f'
          },
          {
            fileName: 'main.c',
            path: './main.c',
            fileId: '616fd5f0780b8c7e9baf2c8c'
          }
        ]
      },
      {
        functionId: '61722ac7ff3c9f10e3322df3',
        functionName: 'add2',
        mangledId: '_Z4add2',
        enableStub: false,
        attributes: null,
        returnType: 'int',
        isCreateManual: false,
        isDefine: true,
        fileId: '616fd5f0780b8c7e9baf2c90',
        fileName: 'struct.c',
        filePath: './struct.c',
        files: [
          {
            fileName: 'struct.c',
            path: './struct.c',
            fileId: '616fd5f0780b8c7e9baf2c90'
          }
        ]
      },
      {
        functionId: '61722ac5358f1d10e9f93758',
        functionName: 'add3',
        mangledId: '_Z4add3',
        enableStub: false,
        attributes: null,
        returnType: 'int',
        isCreateManual: false,
        isDefine: true,
        fileId: '616fd5f0780b8c7e9baf2c8d',
        fileName: 'mcdc.c',
        filePath: './mcdc.c',
        files: [
          {
            fileName: 'mcdc.c',
            path: './mcdc.c',
            fileId: '616fd5f0780b8c7e9baf2c8d'
          }
        ]
      }
    ]
  }
});

const testCaseData = Mock.mock({
  data: {
    testId: '61722afb358f1d10e9f93ce2',
    functionId: '61722aeb358f1d10e9f93b39',
    kind: 0,
    description: '',
    result: {
      kind: 4,
      log: null,
      location: null
    },
    userDefinedFields: [
      {
        value: null,
        key: '60a4bd837b1e6515028f6848',
        name: 'test'
      },
      {
        value: null,
        key: '60a4bd96df811414fc5d906c',
        name: 'tt'
      },
      {
        value: null,
        key: '60a4bda2df811414fc5d906d',
        name: 'no'
      },
      {
        value: null,
        key: '60a5f34ded66f359cc6e2fd1',
        name: 'w'
      },
      {
        value: null,
        key: '60a5f350a1fd5459c9b68e5b',
        name: 'werwerwr'
      },
      {
        value: null,
        key: '60a5f352ed66f359cc6e2fd2',
        name: 'werwer'
      },
      {
        value: null,
        key: '60a5f378ed66f359cc6e2fd3',
        name: 'fs'
      }
    ],
    number: 1,
    data: {
      output: {
        '%': {
          '@result': '0',
          '@type': 'int',
          '@value': ''
        },
        global: {
          g1: {
            '@result': '0',
            '@type': 'int'
          },
          g2: {
            '@result': '0',
            '@type': 'int'
          },
          g6: {
            '@result': '0',
            '@type': 'int'
          }
        },
        malloc: {},
        fixedAddrs: {
          bases: {}
        },
        statics: {
          '0@61722aeb358f1d10e9f93b39': {
            '@type': 'int'
          }
        },
        exceptions: {}
      },
      malloc: {},
      stubs: {
        printf: {
          '@value': {
            '0': {
              params: {
                '0': {
                  '@value': '',
                  '@type': 'const char *'
                }
              }
            }
          },
          '@type': {
            '%': {
              '@type': 'int'
            },
            '@attributes': ['isVariadic', 'isNotDefined'],
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
            enableStub: true,
            fileId: '616fd5f0780b8c7e9baf2c8d',
            filePath: './mcdc.c',
            originalName: 'printf'
          }
        }
      },
      variables: {
        global: {
          g1: {
            '@type': 'int',
            '@value': ''
          },
          g2: {
            '@type': 'int',
            '@value': ''
          },
          g6: {
            '@type': 'int',
            '@value': ''
          },
          'g5@616fd5f0780b8c7e9baf2c8f': {
            '@type': 'int',
            '@value': ''
          },
          g4: {
            '@type': 'int',
            '@value': ''
          }
        },
        params: {},
        statics: {
          '0@61722aeb358f1d10e9f93b39': {
            '@type': 'int',
            '@value': ''
          },
          '0@61722ac5358f1d10e9f93758': {
            '@type': 'int',
            '@value': ''
          }
        }
      },
      fixedAddrs: {
        exprs: {},
        bases: {}
      }
    }
  }
});
export { typeSystemData, variablesData, functionInvokeData, testCaseData };
