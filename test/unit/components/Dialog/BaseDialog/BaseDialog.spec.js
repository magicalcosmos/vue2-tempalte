import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import BaseDialog from '../../../../../src/views/components/Dialog/BaseDialog.vue';
import i18n from '../../../../../src/i18n';
import Mock from 'mockjs';
import { Random } from 'mockjs';

const localVue = createLocalVue();
describe('BaseDialog', () => {
  beforeEach(() => {
    window['vm'] = localVue;
    window['vm'].$i18n = i18n;
  });

  // 测试dialog骨架是否搭好
  describe('test dialog', () => {
    it('1)render a root Element', () => {
      const wrapper = mount(BaseDialog);
      expect(wrapper.find('div.base-dialog').isVisible()).toBe(true);
      expect(wrapper.find('div.base-dialog .dialog-pop').isVisible()).toBe(true);
      expect(wrapper.find('div.base-dialog .dialog-pop .dialog-pop-wrap').isVisible()).toBe(true);
      expect(wrapper.find('div.base-dialog .dialog-pop .dialog-pop-wrap .dialog-title').isVisible()).toBe(true);
      expect(wrapper.find('div.base-dialog .dialog-pop .dialog-pop-wrap .dialog-title span.closes').isVisible()).toBe(true);
      expect(wrapper.find('div.base-dialog .dialog-pop .dialog-pop-wrap .dialog-content').isVisible()).toBe(true);

      wrapper.destroy();
    });
  });

  // 设置dialog弹出条件
  describe('test dialog visible', () => {
    it('1)test dialog visible default true', () => {
      const wrapper = shallowMount(BaseDialog);
      const dialogVisible = wrapper.find('div.base-dialog.open').isVisible();
      expect(dialogVisible).toBe(true);

      wrapper.destroy();
    });
    it('2)test dialog visible be set random bool', () => {
      const visible = Random.boolean();
      const wrapper = shallowMount(BaseDialog, {
        propsData: {
          visible: visible
        }
      });
      if (visible) {
        expect(wrapper.find('div.base-dialog').classes()).toContain('open');
      } else {
        expect(wrapper.find('div.base-dialog').classes()).toContain('close');
      }
      wrapper.destroy();
    });
  });

  // 给dialog设置id
  describe('test dialog id', () => {
    it('1)id default', () => {
      const wrapper = shallowMount(BaseDialog);
      let dialogIdDefault = wrapper.vm.dialogId;
      let contentIdDefault = wrapper.vm.contentId;
      expect(dialogIdDefault).toMatch(/dialog_id_/);
      expect(contentIdDefault).toMatch(/dialog_content_/);

      wrapper.destroy();
    });
    it('2)fresh id when visible was changed', async() => {
      const wrapper = shallowMount(BaseDialog);
      let dialogIdDefault = wrapper.vm.dialogId;
      let contentIdDefault = wrapper.vm.contentId;
      expect(dialogIdDefault).toMatch(/dialog_id_/);
      expect(contentIdDefault).toMatch(/dialog_content_/);

      await wrapper.setProps({
        visible: false
      });
      await wrapper.setProps({
        visible: true
      });

      let dialogIdFresh = wrapper.vm.dialogId;
      let contentIdFresh = wrapper.vm.contentId;
      expect(dialogIdDefault === dialogIdFresh).toBeFalsy();
      expect(contentIdDefault === contentIdFresh).toBeFalsy();

      wrapper.destroy();
    });
  });

  // 设置主题样式
  describe('test dialog theme', () => {
    it('1)test theme default', () => {
      const wrapper = shallowMount(BaseDialog);
      expect(wrapper.vm.currentTheme).toBe('annie');
      expect(wrapper.find('div.base-dialog').classes()).toContain('annie');

      wrapper.destroy();
    });
    it('2)test theme be set random', () => {
      const theme = (Mock.mock({
        'array|1': [
          'rocketui', 'annie', 'sandra', 'cathy', 'dean'
        ]
      })).array;
      const wrapper = shallowMount(BaseDialog, {
        propsData: {
          theme: theme
        }
      });
      expect(wrapper.vm.currentTheme).toBe(theme);
      expect(wrapper.find('div.base-dialog').classes()).toContain(theme);

      wrapper.destroy();
    });
  });

  // 设置dialog居中样式
  describe('test dialog-pop align', () => {
    it('1)test dialog-pop align default', () => {
      const wrapper = shallowMount(BaseDialog);
      expect(wrapper.vm.type).toBe('left');
      expect(wrapper.find('div.dialog-pop').isVisible()).toBe(true);

      wrapper.destroy();
    });
    it('2)test dialog-pop align be set center', () => {
      const wrapper = shallowMount(BaseDialog, {
        propsData: {
          type: 'center'
        }
      });
      expect(wrapper.vm.type).toBe('center');
      expect(wrapper.find('div.dialog-pop').classes()).toContain('center');

      wrapper.destroy();
    });
    it('3)test dialog-pop align be set left', () => {
      const wrapper = shallowMount(BaseDialog, {
        propsData: {
          type: 'left'
        }
      });
      expect(wrapper.vm.type).toBe('left');
      expect(wrapper.find('div.dialog-pop').isVisible()).toBe(true);

      wrapper.destroy();
    });
  });

  // 设置dialog标题
  describe('test dialog title element', () => {
    it('test title', async() => {
      const wrapper = shallowMount(BaseDialog);
      expect(wrapper.vm.title).toBe(window['vm'].$i18n.t('dialog.tip'));

      await wrapper.setProps({
        title: 'baseDialog'
      });
      expect(wrapper.find('.dialog-title span:first-of-type').text()).toBe('baseDialog');

      await wrapper.setProps({
        title: window['vm'].$i18n.t('dialog.compile_error')
      });
      expect(wrapper.find('.dialog-title span:first-of-type svg').isVisible()).toBe(true);
      expect(wrapper.find('.dialog-title span:first-of-type svg').html()).toMatch(/icon-warning/);

      await wrapper.setProps({
        title: window['vm'].$i18n.t('dialog.runtime_error')
      });
      expect(wrapper.find('.dialog-title span:first-of-type svg').isVisible()).toBe(true);
      expect(wrapper.find('.dialog-title span:first-of-type svg').html()).toMatch(/code-defect/);

      wrapper.destroy();
    });
  });

  // 设置dialog全屏模式
  describe('test dialog fullscreen', () => {
    it('1)test fullscreen icon default', () => { // 创建fullscreen图标和全屏样式
      const wrapper = shallowMount(BaseDialog);
      expect(wrapper.vm.showMaximize).toBeFalsy();
      expect(wrapper.vm.isMax).toBeFalsy();
      expect(wrapper.find('span.closes i.icon.icon-fullscreen').isVisible()).toBe(false);
      expect(wrapper.find('.dialog-pop-wrap').classes()).not.toContain('is-max');

      wrapper.destroy();
    });
    it('2)switch fullscreen showMaximize tobe true', () => { // 图标切换功能和样式
      const wrapper = shallowMount(BaseDialog, {
        propsData: {
          showMaximize: true
        }
      });
      expect(wrapper.vm.isMax).toBeFalsy();
      expect(wrapper.find('span.closes i.icon').classes()).toContain('icon-fullscreen');
      expect(wrapper.find('.dialog-pop-wrap').classes()).not.toContain('is-max');

      wrapper.destroy();
    });
    it('3)switch fullscreen tobe true', async() => {
      const wrapper = shallowMount(BaseDialog, {
        propsData: {
          showMaximize: true
        }
      });
      await wrapper.setData({
        isMax: true
      });
      expect(wrapper.vm.isMax).toBeTruthy();
      expect(wrapper.find('span.closes i.icon').classes()).not.toContain('icon-fullscreen');
      expect(wrapper.find('span.closes i.icon').classes()).toContain('icon-fullscreen-exit');
      expect(wrapper.find('.dialog-pop-wrap').classes()).toContain('is-max');

      wrapper.destroy();
    });
    it('4)test fullscreen icon click', async() => { // 给icon添加点击事件
      const wrapper = shallowMount(BaseDialog, {
        propsData: {
          showMaximize: true
        }
      });
      expect(wrapper.vm.isMax).toBeFalsy();
      expect(wrapper.find('span.closes i.icon').classes()).toContain('icon-fullscreen');
      expect(wrapper.find('span.closes i.icon').classes()).not.toContain('icon-fullscreen-exit');
      expect(wrapper.find('.dialog-pop-wrap').classes()).not.toContain('is-max');

      await wrapper.find('span.closes i.icon.icon-fullscreen').trigger('click');
      expect(wrapper.vm.isMax).toBeTruthy();
      expect(wrapper.find('span.closes i.icon').classes()).not.toContain('icon-fullscreen');
      expect(wrapper.find('span.closes i.icon').classes()).toContain('icon-fullscreen-exit');
      expect(wrapper.find('.dialog-pop-wrap').classes()).toContain('is-max');

      wrapper.destroy();
    });
  });

  // 设置关闭按钮
  describe('test dialog close', () => {
    it('close icon default', () => {
      const wrapper = mount(BaseDialog);
      expect(wrapper.props().showClose).toBeTruthy();
      expect(wrapper.find('.closes').contains('i.icon-close')).toBeTruthy();
      wrapper.destroy();
    });
    it('close icon click', async() => {
      const wrapper = mount(BaseDialog);
      expect(wrapper.props().showClose).toBeTruthy();
      expect(wrapper.find('.closes').contains('i.icon-close')).toBeTruthy();

      await wrapper.find('.closes>i.icon-close').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().handleClose).toBeTruthy();
      wrapper.destroy();
    });
  });

  // 设置dialog内容插槽
  describe('test dialog content', () => {
    it('content slot', async() => {
      const wrapper = shallowMount(BaseDialog, {
        slots: {
          default: 'content'
        }
      });
      expect(wrapper.find('.dialog-content').text()).toBe('content');

      wrapper.destroy();
    });
  });

  // 设置底部按钮区域
  describe('test dialog footer', () => {
    it('1)footer default show', () => {
      const wrapper = shallowMount(BaseDialog);
      expect(wrapper.props().showDefaultButton).toBeTruthy();
      expect(wrapper.find('.buttons').isVisible()).toBeTruthy();

      expect(wrapper.props().isShowCancelButton).toBeTruthy();
      expect(wrapper.find('.buttons .cancel').isVisible()).toBeTruthy();

      expect(wrapper.props().isShowConfirmButton).toBeTruthy();
      expect(wrapper.find('.buttons .confirm').isVisible()).toBeTruthy();

      wrapper.destroy();
    });
    it('2)set footer show tobe false', async() => {
      const wrapper = shallowMount(BaseDialog, {
        propsData: {
          isShowCancelButton: false,
          isShowConfirmButton: false
        }
      });
      expect(wrapper.props().showDefaultButton).toBeTruthy();
      expect(wrapper.find('.buttons').isVisible()).toBeTruthy();

      expect(wrapper.props().isShowCancelButton).toBeFalsy();
      expect(wrapper.find('.buttons .cancel').isVisible()).toBeFalsy();

      expect(wrapper.props().isShowConfirmButton).toBeFalsy();
      expect(wrapper.find('.buttons .confirm').isVisible()).toBeFalsy();

      await wrapper.setProps({
        showDefaultButton: false
      });
      await wrapper.vm.$nextTick();
      expect(wrapper.props().showDefaultButton).toBeFalsy();
      expect(wrapper.find('.buttons').isVisible()).toBeFalsy();

      wrapper.destroy();
    });
    it('3)footer text default', () => {
      const wrapper = shallowMount(BaseDialog);
      expect(wrapper.props().cancel).toBe('取 消');
      expect(wrapper.find('.buttons .cancel').text()).toBe('取 消');

      expect(wrapper.props().confirm).toBe('确 定');
      expect(wrapper.find('.buttons .confirm').text()).toBe('确 定');

      wrapper.destroy();
    });
    it('3)set footer text', () => {
      const cancelText = Random.word();
      const confirmText = Random.word();
      const wrapper = shallowMount(BaseDialog, {
        propsData: {
          cancel: cancelText,
          confirm: confirmText
        }
      });
      expect(wrapper.props().cancel).toBe(cancelText);
      expect(wrapper.find('.buttons .cancel').text()).toBe(cancelText);

      expect(wrapper.props().confirm).toBe(confirmText);
      expect(wrapper.find('.buttons .confirm').text()).toBe(confirmText);

      wrapper.destroy();
    });
    it('4)footer button click', async() => {
      const wrapper = shallowMount(BaseDialog);

      await wrapper.find('.buttons .cancel').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().handleCancel).toBeTruthy();

      await wrapper.find('.buttons .confirm').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().handleConfirm).toBeTruthy();

      wrapper.destroy();
    });
  });
});
