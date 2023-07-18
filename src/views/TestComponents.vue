<template>
  <section>
    <!-- <div>
      <r-tag
        v-for="tag in tags"
        :key="tag.name"
        closable
        :type="tag.type">
        {{tag.name}}
      </r-tag>
    </div>
    <div>
      <r-input placeholder="Please input" v-model="input"></r-input>
    </div>
    <div>
      <r-radio v-model="radio" label="1">Option A</r-radio>
      <r-radio v-model="radio" label="2">Option B</r-radio>
    </div>
    <div>
      <r-checkbox v-model="checked1" disabled>Option</r-checkbox>
      <r-checkbox v-model="checked2" disabled>Option</r-checkbox>
    </div>
    <div>
      <r-select v-model="value" placeholder="Select">
        <r-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </r-option>
      </r-select>
    </div>
    <div>
        <r-cascader
          :options="cascaderOptions"
          v-model="selectedOptions"
          @change="handleChange">
        </r-cascader>
    </div> -->
    <!-- <delete-confirm
    :visible.sync="checked2"
    title="删除指针目标"
    tip="删除数据后不可恢复,是否确定要删除如下指针？"
    icon="icon-delete-stub-function"
    confirm="确认删除"></delete-confirm> -->
    <!-- <test-script :data="options" :visible.sync="checked2"></test-script> -->
    <VariadicParams :visible="true" :data="varidicParamsData" :customData="customData" />

  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Cascader } from '@/components';
import { TestTable, DeleteConfirm, TestCaseShowConfig, TestScript, VariadicParams } from '@/views/components';
import { TestCaseManagement } from '@/api';
import common from '@/utils/common';
@Component({
  components: {
    Cascader,
    TestTable,
    DeleteConfirm,
    TestCaseShowConfig,
    TestScript,
    VariadicParams
  }
})
class TestComponents extends Vue {
  private tags: any = [
    { name: 'Tag 1', type: '' },
    { name: 'Tag 2', type: 'success' },
    { name: 'Tag 3', type: 'info' },
    { name: 'Tag 4', type: 'warning' },
    { name: 'Tag 5', type: 'danger' }
  ];
  private input: string = '';
  private radio: string = '1';
  private checked1: boolean = false;
  private checked2: boolean = true;
  private options = [{
    value: 'Option1',
    label: 'Option1'
  }, {
    value: 'Option2',
    label: 'Option2'
  }, {
    value: 'Option3',
    label: 'Option3'
  }, {
    value: 'Option4',
    label: 'Option4'
  }, {
    value: 'Option5',
    label: 'Option5'
  }];
  private value: string = '';
  private cascaderOptions = [{
    value: 'null',
    label: 'null'
  }, {
    value: '_afafa',
    label: '_afafa',
    children: [{
      value: '0',
      label: '0'
    }, {
      value: '1',
      label: '1'
    }]
  }, {
    value: '_kim',
    label: '_kim',
    children: [{
      value: '0',
      label: '0'
    }, {
      value: '1',
      label: '1'
    }]
  }];
  private selectedOptions: any = '';
  private visible: boolean = false;
  private testStyle: any = {};
  private tableData: Array < any > = [];
  private activeNames: Array<string> = ['1'];

  private varidicParamsData: any = [
    {
      id: 1,
      'name': 'test1',
      'type': 'Point'
    },
    {
      id: 2,
      'name': 'test2',
      'type': 'int'
    }, 
    {
      id: 3,
      'name': 'test3',
      'type': 'Float'
    } 
  ];
  private customData: any = {
    types: {
      'Point': {
        '@attributes': [
          'isRecord',
          'isStructure'
        ],
        '@canonical': 'Point',
        '@fields': {
          'x': {
            '@isUsed': 1,
            '@type': 'int',
            '@usedFunc': [
              '_Z19test_struct_pointer',
              '_Z9test_list'
            ]
          },
          'y': {
            '@isUsed': 1,
            '@type': 'int',
            '@usedFunc': [
              '_Z19test_struct_pointer'
            ]
          }
        },
        '@unqualified': 'Point'
      },
      'Point *': {
        '@attributes': [
          'isPointer'
        ],
        '@canonical': 'Point *',
        '@pointeeType': 'Point',
        '@unqualified': 'Point *'
      },
      'Point[100]': {
        '@attributes': [
          'isArray'
        ],
        '@canonical': 'Point[100]',
        '@elementType': 'Point',
        '@length': '100',
        '@unqualified': 'Point[100]'
      },
      'int': {
        '@attributes': [
          'isInteger',
          'isReal'
        ],
        '@canonical': 'int',
        '@range': {
          '@max': '2147483647',
          '@min': '-2147483648'
        },
        '@unqualified': 'int',
        '@width': 32,
        '@name': 'int'
      },
      'int *': {
        '@attributes': [
          'isPointer'
        ],
        '@canonical': 'int *',
        '@pointeeType': 'int',
        '@unqualified': 'int *'
      },
      'int **': {
        '@attributes': [
          'isPointer'
        ],
        '@canonical': 'int **',
        '@pointeeType': 'int *',
        '@unqualified': 'int **'
      },
      'int[100]': {
        '@attributes': [
          'isArray'
        ],
        '@canonical': 'int[100]',
        '@elementType': 'int',
        '@length': '100',
        '@unqualified': 'int[100]'
      },
      'struct Node': {
        '@attributes': [
          'isRecord',
          'isStructure'
        ],
        '@canonical': 'struct Node',
        '@fields': {
          'next': {
            '@isUsed': 1,
            '@type': 'struct Node *',
            '@usedFunc': [
              '_Z9test_list'
            ]
          },
          'p': {
            '@isUsed': 1,
            '@type': 'Point[100]',
            '@usedFunc': [
              '_Z9test_list'
            ]
          },
          'point': {
            '@type': 'Point *'
          },
          'value': {
            '@isUsed': 1,
            '@type': 'int',
            '@usedFunc': [
              '_Z9test_list'
            ]
          },
          'values': {
            '@isUsed': 1,
            '@type': 'int[100]',
            '@usedFunc': [
              '_Z9test_list'
            ]
          }
        },
        '@unqualified': 'struct Node'
      },
      'struct Node *': {
        '@attributes': [
          'isPointer'
        ],
        '@canonical': 'struct Node *',
        '@pointeeType': 'struct Node',
        '@unqualified': 'struct Node *'
      },
      'void': {
        '@attributes': [
          'isVoid'
        ],
        '@canonical': 'void',
        '@unqualified': 'void',
        '@width': 0
      },
      'void *': {
        '@attributes': [
          'isPointer',
          'isVoidPointer'
        ],
        '@canonical': 'void *',
        '@pointeeType': 'void',
        '@unqualified': 'void *'
      },
      'void **': {
        '@attributes': [
          'isPointer'
        ],
        '@canonical': 'void **',
        '@pointeeType': 'void *',
        '@unqualified': 'void **'
      },
      'void **()': {
        '%': {
          '@type': 'void **'
        },
        '@attributes': [
          'isFunction'
        ],
        '@canonical': 'void **()',
        '@name': 'void **()',
        '@unqualified': 'void **()'
      },
      'void **(*)()': {
        '@attributes': [
          'isPointer',
          'isFunctionPointer'
        ],
        '@canonical': 'void **(*)()',
        '@pointeeType': 'void **()',
        '@unqualified': 'void **(*)()'
      }
    }
  }

  handleBtnClick(evt: any) {
    this.visible = true;
    this.testStyle['right'] = evt.clientX + 'px';
    this.testStyle['top'] = evt.clientY + 'px';
  }
  handleSelected(selectedData: Array<any>) {

  }
  handleChange() {

  }

  created() {
    const params = {
      functionId: '5eddb145f6be7d2ecd68869a'
    };
    TestCaseManagement.list(params, (error, data) => {
      this.loading = false;
      if (error) {
        let message = error.message;
        if (error.response) {
          switch (error.response.status) {
            case 400:
              message = 'message.incorrect_parameters';
              break;
            case 403:
              message = 'projects.not_tester';
              break;
            default:

          }
          this['$message'].error(common.i18n(message));
        }
      } else {
        if (data) {
          this.tableData = data.data.tests;
          this.tableData.forEach((item, index) => {
            this.$set(this.tableData[index], 'isEdit', false);
          });
        }
      }
    });
  }
}
export default TestComponents;
</script>
<style lang="scss" scoped>

</style>
