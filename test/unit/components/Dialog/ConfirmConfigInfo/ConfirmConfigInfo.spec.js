/* eslint-disable no-undef */
import ConfirmConfigInfo from '../../../../../src/views/components/Dialog/ConfirmConfigInfo.vue';
import i18n from '@/i18n';
import { shallowMount } from '@vue/test-utils';
import { BaseDialog, Includes, Macros, Timeout } from '@/views/components';
import Mock from 'mockjs';

const mockData = {
  versionId: '614a96b57297677cd8d33818',
  versionName: 'v2',
  visitAt: 1632278196746,
  finishAt: 1632278196746,
  environmentChanged: false,
  headers: {
    suffixes: [
      '.h'
    ]
  },
  languages: {
    c: {
      standard: 'c89',
      suffixes: [
        '.c'
      ]
    }
  },
  includes: [
    './'
  ],
  macros: [],
  caseSensitive: true,
  systemType: 32,
  repository: {
    type: 'git',
    url: 'http://localhost:9526/60dabf716c7276667670f902/613f10910af87062e3faa735'
  },
  language: 'c',
  environment: 'localhost',
  ignoreAsm: true,
  projectType: 'gcc',
  exits: [
    ''
  ],
  rootDirectory: {
    id: '614a96bb32a0497cd2be1767',
    fileId: '614a96bb32a0497cd2be1767',
    fileName: '.',
    name: '.',
    path: '.',
    status: 201,
    kind: 2,
    defectsCount: {},
    fileCount: {
      _: 1,
      _c: 7,
      _h: 1
    },
    blockFilesCount: {}
  },
  unitTest: {
    eventReminder: {
      defectsCleared: 0,
      configConfirmed: false,
      parsed: false,
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
      configConfirmed: false,
      parsed: false,
      regressionStatusPrompt: 0,
      firstVisit: 0
    },
    status: 1
  },
  integrationTest: {
    eventReminder: {
      defectsCleared: 0,
      configConfirmed: false,
      parsed: false,
      regressionStatusPrompt: 0,
      firstVisit: 0
    },
    fileRelation: false,
    timeoutTestRun: 10,
    coverages: 24,
    status: 1,
    strictOutputCheck: true
  }
};

const mountItem = {
  mocks: {
    $t: key => i18n.t(key),
    $route: {
      name: 'IntegrationHome'
    }
  }
};

const factory = options => {
  return shallowMount(ConfirmConfigInfo, {
    ...mountItem,
    ...options
  });
};

describe('ConfirmConfigInfo.vue', () => {
  it('Renders ConfirmConfigInfo', () => {
    const wrapper = factory({
      propsData: {
        data: mockData
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(BaseDialog)).toBe(true);
    expect(wrapper.contains(Includes)).toBe(true);
    expect(wrapper.contains(Macros)).toBe(true);
    expect(wrapper.contains(Timeout)).toBe(true);
    expect(wrapper.find('div.w-100.config-form.config-form-theme').exists()).toBe(true);
    expect(wrapper.find('div.mx-auto.config-form-content').exists()).toBe(true);
    expect(wrapper.find('r-form').exists()).toBe(true);
    expect(wrapper.find('.dialog-includes').exists()).toBe(true);
    expect(wrapper.find('.dialog-macros').exists()).toBe(true);
    wrapper.destroy();
  });
  it('Test Analysis', () => {
    const wrapper = factory({
      mocks: {
        $t: key => i18n.t(key),
        $route: {
          name: 'AnalysisHome'
        }
      },
      propsData: {
        data: mockData
      }
    });
    expect(wrapper.vm.isShowStatic).toBe(true);
    expect(wrapper.find('div.text-999.mt-2').text()).toBe(wrapper.vm.$t('project.static_analysis'));
    expect(wrapper.find('.df-row-accs.pb-2 .fs-12').text()).toBe(wrapper.vm.$t('static_analysis.choose_template'));
    expect(wrapper.find('.auto-fill p').text()).toBe(`*${wrapper.vm.$t('static_analysis.tips')}`);
    wrapper.destroy();
  });
  it('Test UnitTest', () => {
    const wrapper = factory({
      mocks: {
        $t: key => i18n.t(key),
        $route: {
          name: 'ProjectMain'
        }
      },
      propsData: {
        data: mockData
      }
    });
    expect(wrapper.vm.isShowUnitTest).toBe(true);
    expect(wrapper.find('div.text-999.mt-2').text()).toBe(wrapper.vm.$t('project.module_test'));
    expect(wrapper.find('r-form-item').attributes('label')).toBe(wrapper.vm.$t('project.coverage_criteria'));
    expect(wrapper.findAll('.checkbox-btn').at(0).text()).toBe(wrapper.vm.$t('project.statement'));
    expect(wrapper.findAll('.checkbox-btn').at(1).text()).toBe(wrapper.vm.$t('project.branch'));
    expect(wrapper.findAll('.checkbox-btn').at(2).text()).toBe(wrapper.vm.$t('project.mcdc'));
    expect(wrapper.find('.checkbox-form-item').attributes('label')).toBe(wrapper.vm.$t('project.auto_expect'));
    expect(wrapper.find('.checkbox-form-item label').text()).toMatch(wrapper.vm.$t('project.auto_expect'));
    expect(wrapper.find('.checkbox-form-item label p').text()).toBe(wrapper.vm.$t('project.expect_message'));
    wrapper.destroy();
  });
  it('Test IntegrationTest', () => {
    const wrapper = factory({
      mocks: {
        $t: key => i18n.t(key),
        $route: {
          name: 'IntegrationHome'
        }
      },
      propsData: {
        data: mockData
      }
    });
    expect(wrapper.vm.isShowIntegration).toBe(true);
    expect(wrapper.find('div.text-999.mt-2').text()).toBe(wrapper.vm.$t('project.hyper_test'));
    expect(wrapper.find('r-form-item').attributes('label')).toBe(wrapper.vm.$t('project.coverage_criteria'));
    expect(wrapper.findAll('.checkbox-btn').at(0).text()).toBe(wrapper.vm.$t('project.call'));
    expect(wrapper.findAll('.checkbox-btn').at(1).text()).toBe(wrapper.vm.$t('project.function'));
    expect(wrapper.findAll('.checkbox-btn').at(2).text()).toBe(wrapper.vm.$t('project.statement'));
    expect(wrapper.findAll('.checkbox-btn').at(3).text()).toBe(wrapper.vm.$t('project.branch'));
    expect(wrapper.findAll('.checkbox-btn').at(4).text()).toBe(wrapper.vm.$t('project.mcdc'));
    expect(wrapper.findAll('.checkbox-form-item').at(0).find('label').text()).toMatch(wrapper.vm.$t('project.auto_expect'));
    expect(wrapper.findAll('.checkbox-form-item').at(0).find('label p').text()).toBe(wrapper.vm.$t('project.expect_message'));
    expect(wrapper.findAll('.checkbox-form-item').at(1).find('label').text()).toMatch(wrapper.vm.$t('project.show_file_relation'));
    expect(wrapper.findAll('.checkbox-form-item').at(1).find('label p').text()).toBe(`*${wrapper.vm.$t('project.file_relation_message')}`);
    wrapper.destroy();
  });
  describe('Test Props', () => {
    it('Test the show of Props', async() => {
      const wrapper = factory({
        propsData: {
          data: mockData
        }
      });
      await wrapper.setProps({
        show: false
      });
      expect(wrapper.props('show')).toBe(false);
      expect(wrapper.find('div.assign-cards').exists()).toBe(false);
      await wrapper.setProps({
        show: true
      });
      expect(wrapper.props('show')).toBe(true);
      expect(wrapper.find('div.assign-cards').exists()).toBe(true);
      wrapper.destroy();
    });
    it('Test the data of Props', () => {
      const wrapper = factory({
        propsData: {
          data: mockData
        }
      });
      expect(wrapper.props('data')).toEqual(mockData);
      wrapper.destroy();
    });
    it('Test the version of Props', async() => {
      const _version = Mock.mock({
        'id|+1': 1, // Number，自增1，初识值为1
        'name|1-3': 'tcc', // String，随机生成1-3个重复'tcc'
        'phone|11': 1, // String，生成11个1
        'age|1-120': 20, // Nmuber，随机生成1-120之间的数字
        'salary|6000-10000.1-3': 1, // Number，随机生成6000-10000的1-3位小数的数字
        'status|1': true, // Boolean，生成true或false的概率都是1/2。
        'open|2-4': true // Boolean，生成true的概率是2/(2+4)，生成false的概率是4/(2+4)
      });
      const wrapper = factory({
        propsData: {
          data: mockData
        }
      });
      await wrapper.setProps({
        version: _version
      });
      expect(wrapper.props('version')).toEqual(_version);
      wrapper.destroy();
    });
    it('Test the visible of Props', async() => {
      const wrapper = factory({
        propsData: {
          data: mockData
        }
      });
      await wrapper.setProps({
        visible: false
      });
      expect(wrapper.props('visible')).toBe(false);
      expect(wrapper.isVisible()).toBe(false);
      await wrapper.setProps({
        visible: true
      });
      expect(wrapper.props('visible')).toBe(true);
      expect(wrapper.isVisible()).toBe(true);
      wrapper.destroy();
    });
    it('Test the assign of Props', async() => {
      const _assign = Mock.mock({
        'id|+1': 1, // Number，自增1，初识值为1
        'name|1-3': 'tcc', // String，随机生成1-3个重复'tcc'
        'phone|11': 1, // String，生成11个1
        'age|1-120': 20, // Nmuber，随机生成1-120之间的数字
        'salary|6000-10000.1-3': 1, // Number，随机生成6000-10000的1-3位小数的数字
        'status|1': true, // Boolean，生成true或false的概率都是1/2。
        'open|2-4': true // Boolean，生成true的概率是2/(2+4)，生成false的概率是4/(2+4)
      });
      const wrapper = factory({
        propsData: {
          data: mockData
        }
      });
      await wrapper.setProps({
        assign: _assign
      });
      expect(wrapper.props('assign')).toEqual(_assign);
      wrapper.destroy();
    });
    it('Test the from of Props', async() => {

      const wrapper = factory({
        propsData: {
          data: mockData
        }
      });
      await wrapper.setProps({
        from: 'project'
      });
      expect(wrapper.props('from')).toBe('project');
      expect(wrapper.vm.currentFrom).toBe('project');
      wrapper.destroy();
    });
  });
});
