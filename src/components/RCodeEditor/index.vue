<template>
  <section class="r-code-editor">
    <textarea ref="refCodeEditor" class="editor"></textarea>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
// language
// import 'codemirror/mode/sql/sql.js';
import 'codemirror/lib/codemirror.css';
// theme css
import 'codemirror/theme/monokai.css';

import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/fold/foldgutter.css';

// require active-line.js
import 'codemirror/addon/selection/active-line.js';

// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js';
import 'codemirror/addon/search/searchcursor.js';

// hint
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/selection/active-line.js';

// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/match-highlighter.js';

// keyMap
import 'codemirror/mode/clike/clike.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/keymap/sublime.js';

// foldGutter
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/fold/xml-fold.js';

import 'codemirror/addon/display/autorefresh.js';

import CodeMirror from 'codemirror';
import common from '@/utils/common';
/** Description
 * from: { line, ch }
 * to: { line, ch }
 * line is line, ch is column for a point
*/
@Component
class RCodeEditor extends Vue {
  @Prop({ default: '' }) content!: string;
  @Prop({ default: false }) codeReadOnly!: boolean | string;
  private currentContent: string = '';
  private name: string = 'test';
  private placeholder: string = 'estest';
  private codemirror: any;
  private cminstance: any;
  private oldBegin: any;
  private oldEnd: any;
  private cmOptions = {
    autofocus: false,
    autoRefresh: true,
    tabSize: 4,
    foldGutter: true,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    smartIndent: true,
    styleSelectedText: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    showCursorWhenSelecting: true,
    mode: 'text/x-csrc',
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    phrases: {
      '(Use /re/ syntax for regexp search)': common.i18n('codeditor.tip'),
      'Yes': common.i18n('codeditor.replace'),
      'No': common.i18n('codeditor.no_replace'),
      'With:': common.i18n('codeditor.with'),
      'Replace all:': common.i18n('codeditor.replace_all'),
      'Replace?': common.i18n('codeditor.is_replace'),
      'Replace:': common.i18n('codeditor.replace'),
      'Replace with:': common.i18n('codeditor.replace_with'),
      'All': common.i18n('codeditor.replace_all'),
      'Stop': common.i18n('codeditor.stop'),
      'Search:': common.i18n('codeditor.search')
    },
    readOnly: this.codeReadOnly
  }
  private isIncome: boolean = true;
  private timeout: number = 0;
  @Watch('content')
  getContent(content) {
    this.isIncome = true;
    this.setContent(content);
    this.currentContent = this.getSourceCode();
  }

  /**
   * option settings
   * @param options
   * @param value
   */
  setOption(options: string, value: any) {
    this.codemirror.setOption(options, value);
  }
  /**
   * 获取源码
   */
  getSourceCode() {
    return this.codemirror.getValue();
  }

  /**
   * 获取视图
   * @param from
   * @param to
   */
  getViewport(from: number, to: number) {
    return this.codemirror.getViewport(from, to);
  }

  /**
   * 跳转到坐标为(x,y)行
   * @param x 行
   * @param y 列
   */
  goToLine(x: number, y: number) {
    if (x === undefined || y === undefined) {
      return;
    }
    const line = x - 1;
    this.setCursor(line);
    const defaultTextHeight = this.codemirror.defaultTextHeight();
    const viewLines = Math.floor(this.codemirror.getScrollInfo(line).clientHeight / defaultTextHeight - 1); // 获取可视行数
    if (viewLines > 0) {
      const t = this.codemirror.charCoords({ line: line, ch: y }, 'local').top;
      const middleHeight = this.codemirror.getScrollerElement().offsetHeight / 2;
      this.codemirror.scrollTo(null, t - middleHeight - 5);
      //this.codemirror.scrollIntoView(pos);
    }
  }

  /**
   * 设置鼠标位置
   * @param line 行
   * @param ch 列
   */
  setCursor(line: number = 0, ch: number = 0) {
    this.codemirror.setCursor({
      line,
      ch
    }); // 当前行选中
  }


  /**
   * 给指定代码块加上class
   * param begin 开始位置
   * param end 结束位置
   * param colorName 背景颜色名称
   */
  markCode(begin: object, end: object, colorName: string) {
    this.codemirror.markText(begin, end, { css: `background : ${colorName}` });
    this.oldBegin = begin;
    this.oldEnd = end;
  }

  /**
   * 清除上一次的高亮标志
   * param begin 开始位置
   * param end 结束位置
   */
  clearMark(begin: object, end: object) {
    // this.codemirror.markText(begin, end, { className: 'clear' });
    this.codemirror.markText(begin, end, { css: 'background : transparent' });
  }

  /**
   * 设置内容
   * @param content 代码
   */
  setContent(content: string) {
    this.codemirror.setValue(content.toString());
  }

  /**
   * 文件change
   */
  handleChange() {
    // 解决空文件输入第一个字符未显示保存按钮问题
    if (!this.content) {
      this.isIncome = false;
    }
    this.codemirror.on('change', () => {
      if (this.isIncome) {
        this.isIncome = false;
      } else {
        const newCode = this.getSourceCode();
        // TODO: 未来修改成无更改
        this.currentContent !== newCode && this.$emit('change', newCode);
      }
    });
  }

  /**
   * 大小写敏感
   * @param query
   */
  queryCaseInsensitive(query) {
    // return typeof query === 'string' && query === query.toLowerCase();
    return typeof query === 'string';
  }


  /**
   * 字符串HTML转换
   * @param str
   */
  parseString(str) {
    return str.replace(/\\([nrt\\])/g, function(match, ch) {
      let content = '';
      switch (ch) {
        case 'n':
          content = '\n';
          break;
        case 'r':
          content = '\r';
          break;
        case 't':
          content = '\t';
          break;
        case '\\':
          content = '\\';
          break;
        default:
          content = match;
      }
      return content;
    });
  }

  /**
   * 查询转换
   * @param string
   */
  parseQuery(query) {
    const isRE = query.match(/^\/(.*)\/([a-z]*)$/);
    if (isRE) {
      try {
        query = new RegExp(isRE[1], isRE[2].indexOf('i') === -1 ? '' : 'i');
      } catch (e) {

      } // Not a regular expression after all, do a string search
    } else {
      query = this.parseString(query);
    }
    if (typeof query === 'string' ? query === '' : query.test('')) {
      query = /x^/;
    }
    return query;
  }


  /**
   * 搜索状态重置
   */
  SearchState() {
    this.posFrom = this.posTo = this.lastQuery = this.query = null;
    this.overlay = null;
  }


  /**
   * 获取搜索状态
   * @param cm
   */
  getSearchState(cm) {
    return cm.state.search || (cm.state.search = new this.SearchState());
  }

  /**
   * 获取鼠标选中位置
   * @param cm
   * @param query
   * @param pos
   */
  getSearchCursor(cm, query, pos) {
    // Heuristic: if the query string is all lowercase, do a case insensitive search.
    return cm.getSearchCursor(query, pos, {
      caseFold: this.queryCaseInsensitive(query),
      multiline: true
    });
  }

  /**
   * 搜索覆盖
   * @param query
   * @param caseInsensitive
   */
  searchOverlay(query, caseInsensitive) {
    if (typeof query === 'string') {
      query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'), caseInsensitive ? 'gi' : 'g');
    } else if (!query.global) {
      query = new RegExp(query.source, query.ignoreCase ? 'gi' : 'g');
    }

    return {
      token: (stream) => {
        query.lastIndex = stream.pos;
        var match = query.exec(stream.string);
        if (match && match.index === stream.pos) {
          stream.pos += match[0].length || 1;
          return 'searching';
        } else if (match) {
          stream.pos = match.index;
        } else {
          stream.skipToEnd();
        }
      }
    };
  }

  /**
   * 开始搜索
   * @param cm
   * @param state
   * @param query
   */
  startSearch(cm, state, query) {
    state.queryText = query;
    state.query = this.parseQuery(query);
    cm.removeOverlay(state.overlay, this.queryCaseInsensitive(state.query));
    state.overlay = this.searchOverlay(state.query, this.queryCaseInsensitive(state.query));
    cm.addOverlay(state.overlay);
    if (cm.showMatchesOnScrollbar) {
      if (state.annotate) {
        state.annotate.clear(); state.annotate = null;
      }
      state.annotate = cm.showMatchesOnScrollbar(state.query, this.queryCaseInsensitive(state.query));
    }
  }

  /**
   * 清空搜索
   * @param cm
   */
  clearSearch(cm) {
    cm.doc.setSelection({
      ch: 0,
      line: 0
    }, {
      ch: 0,
      line: 0
    });
    cm.operation(() => {
      var state = this.getSearchState(cm);
      state.lastQuery = state.query;
      if (!state.query) {
        return;
      }
      state.query = state.queryText = null;
      cm.removeOverlay(state.overlay);
      state.posFrom = {};
      state.posTo = {};
      if (state.annotate) {
        state.annotate.clear();
        state.annotate = null;
      }
    });
  }


  /**
   * 搜索
   * @param cm
   * @param rev
   * @param query
   */
  doSearch(cm, rev, query) {
    var state = this.getSearchState(cm);
    if (state.query) {
      return this.findNext(cm, rev);
    }
    var q = cm.getSelection() || state.lastQuery;
    if (q instanceof RegExp && q.source === 'x^') {
      q = null;
    }
    cm.operation(() => {
      this.startSearch(cm, state, query);
      state.posFrom = cm.getCursor();
      state.posTo = cm.getCursor();
      this.findNext(cm, rev);
    });
  }

  /**
   * 查找下一个
   * @param cm
   * @param rev
   * @param callback
   */
  findNext(cm, rev, callback?: Function) {
    cm.operation(() => {
      const state = this.getSearchState(cm);
      let cursor = this.getSearchCursor(cm, state.query, rev ? state.posFrom : state.posTo);
      if (!cursor.find(rev)) {
        cursor = this.getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) : CodeMirror.Pos(cm.firstLine(), 0));
        if (!cursor.find(rev)) {
          return;
        }
      }
      cm.setSelection(cursor.from(), cursor.to());
      cm.scrollIntoView({ from: cursor.from(), to: cursor.to() }, 20);
      state.posFrom = cursor.from();
      state.posTo = cursor.to();
      if (callback) {
        callback(cursor.from(), cursor.to());
      }
    });
  }

  /**
   * 查找下一个
   * @param query
   * @param rev
   */
  find(query, rev = false) {
    const cm = this.codemirror;
    this.clearSearch(cm);
    this.doSearch(cm, rev, query);
  }

  /**
   * 向后查找
   */
  findBack() {
    this.findNext(this.codemirror, true);
  }

  /**
   * 向前查找
   */
  findForward() {
    this.findNext(this.codemirror);
  }

  /**
   * 替换所有
   * @param cm
   * @param query
   * @param text
   */
  replaceAll(cm, query, text) {
    cm.operation(() => {
      for (var cursor = this.getSearchCursor(cm, query); cursor.findNext();) {
        if (typeof query !== 'string') {
          var match = cm.getRange(cursor.from(), cursor.to()).match(query);
          cursor.replace(text.replace(/\$(\d)/g, (_, i) => {
            return match[i];
          }));
        } else {
          cursor.replace(text);
        }
      }
    });
  }

  /**
   * 替换
   * @param text
   * @param all
   */
  replace(text, all) {
    const cm = this.codemirror;
    if (cm.getOption('readOnly')) {
      return;
    }
    var query = cm.getSelection() || this.getSearchState(cm).lastQuery;
    if (!query) {
      return;
    }
    text = this.parseString(text);

    if (all) {
      this.replaceAll(cm, query, text);
    } else {
      var cursor = this.getSearchCursor(cm, query, cm.getCursor('from'));
      var start = cursor.from(), match;
      if (!(match = cursor.findNext())) {
        cursor = this.getSearchCursor(cm, query);
        if (!(match = cursor.findNext()) || (start && cursor.from().line === start.line && cursor.from().ch === start.ch)) {
          return;
        }
      }
      cm.setSelection(cursor.from(), cursor.to());
      cm.scrollIntoView({
        from: cursor.from(),
        to: cursor.to()
      });
      cursor.replace(typeof query === 'string' ? text : text.replace(/\$(\d)/g, (_, i) => {
        return match[i];
      }));
      this.findForward();
    }
  }

  /*
   * Replace the part of the document between from and to with the given string. from and to must be {line, ch} objects. to can be left off to simply insert the string at position from. When origin is given, it will be passed on to "change" events, and its first letter will be used to determine whether this change can be merged with previous history events, in the way described for selection origins.
   * @param replacement
   * @param from {line, ch}
   * @param to {line, ch}
   * @param origin
   */
  replaceRange(replacement: string, from: {line, ch}, to: {line, ch}, origin?: string) {
    this.codemirror.replaceRange(replacement, from, to, origin);
  }

  /**
   * 执行事件
   * @param command
   */
  execCommand(command: string) {
    this.codemirror && this.codemirror.execCommand(command);
  }

  /**
   * 滚动到可见位置
   * @param line 行
   * @param ch 列
   */
  scrollIntoView(line, ch) {
    this.codemirror.scrollIntoView({ line, ch });
  }

  /**
   *
   * @param line 行
   * @param ch 列
   */
  focus(line?: number, ch?: number) {
    const cm = this.codemirror;
    const timeout = setTimeout(() => {
      cm.focus();
      const totalLine = cm.lineCount() - 1;
      const content = cm.getLine(totalLine);
      this.setCursor(line || this.codemirror.lineCount() - 1, ch || content.length);
      clearTimeout(timeout);
    }, 0);
  }

  init() {
    this.codemirror = CodeMirror.fromTextArea(this.$refs.refCodeEditor, this.cmOptions);
    this.setContent(this.content);
    this.handleChange();
    this.currentContent = this.getSourceCode();
  }

  mounted() {
    this.init();
  }
}
export default RCodeEditor;
</script>
<style lang="scss">
.r-code-editor {
  @include setWH(100%, 100%);
  .editor {
    @include setWH(100%, 100%);
    border: none;
  }
  .CodeMirror {
    height: 100%;
  }

  .CodeMirror-linenumbers {
    width: 39px !important;
  }
  .text-align {
    @include setWH(100%, 100%);
  }
  .mark-green {
    background : #78c06e;
  }
  .mark-yellow {
    background : #F9F900;
  }
  .clear {
    background : red;
  }

  .CodeMirror-sizer {
    margin-left: 48px !important;
  }

  .CodeMirror-linenumber {
    width: 32px !important;
  }
}
.styled-background {
  color: red;
  background: blue;
}
</style>
