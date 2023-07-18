<template>
  <div class='faq'>
    <header class='faq-header'>
      <i class='iconfont icon-logo'></i>
      <div class='title'>{{$t('help.faq')}}</div>
    </header>
    <div class='faq-body'>
      <div class='faq-items'>
        <div class='left-bar'>
          <span class='bar'></span>
          <span class='all-faq'>{{$t('help.all_faq')}}</span>
          <ul class='items'>
            <li
              v-for="(item, index) in data"
              :key="index"
              class='item'>
              <a :class="item.selected ? 'selected' : ''" @click="() => {handleClick(index);}" :title="item.title">{{item.title}}</a>
            </li>
          </ul>
        </div> 
        <div class='faq-content'>
          <div class='title'>{{selectedData.title}}</div>
          <div class='publish-info'>
            {{selectedData.publishInfo}}
          </div>
          <div class='content'>
            <div class="anwser" v-html="selectedData.content"></div>
          </div>
        </div>
      </div>
    </div>
    <footer class="faq-footer">
      <div class="faq-footer-content">
        {{$t('help.link')}}:
        <a href="https://www.51fusa.com/client/index/index.html" target="_blank">{{$t('help.ticpsh_51fusa')}}</a>
        <a href="https://www.ticpsh.com" target="_blank">{{$t('help.ticpsh')}}</a>
      </div> 
    </footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
class FAQ extends Vue {
   private publishInfo = 'SmartRocket • 发表于：2020年05月14日 11:55:28 • 更新于：2021年06月23日 18:40:48';
   private data: Array<any> = [
     {
       title: '1.	文件树中的icon分别具有什么含义？',
       selected: true,
       publishInfo: this.publishInfo,
       content: `<img height="350px" src="static/help/icon-meaning-in-file-tree.png?${+new Date()}" />`
     },
     {
       title: '2.	CFG图中棱形与矩形组合的图标具有什么含义？',
       publishInfo: this.publishInfo,
       content: `
        <div>
          <img src="static/help/ternary.png?${+new Date()}" />代表了三元表达式，即语句中有判断条件，例如以下代码就会出现该种样式：
        </div>
        <div>\`\`\`</div>        <div>int test_me(int x, int y)</div>
        <div>{ return x > y ? 0 : 1; }</div>
        <div>\`\`\`</div>
        `
     },
     {
       title: '3.	文件解析失败时该如何处理？',
       publishInfo: this.publishInfo, 
       content: `
         <div>当文件出现解析失败的情况，可以通过源代码区域的解析结果查看具体的错误信息和位置。可能的失败原因和解决方案如下：</div>
         <ul>
           <li>
             （1）	无法区分头文件大小写。打开页面最左侧导航栏中的“配置信息”，打开“区分头文件大小写”开关。
            </li>
            <li>
             （2）	缺少头文件。有两种解决方案：一种是在文件树中选中合适的文件夹并右键，然后上传需要的头文件；另一种是打开页面最左侧导航栏中的“版本详情”将完整的源代码重新上传。
            </li>
         </ul>
        `
     },
     {
       title: '4.	测试用例自动生成的支持情况？',
       publishInfo: this.publishInfo,
       content: `
        <div>测试用例生成在以下情况弱支持：</div>
        <ul class="faq-content-list">
          <li class="faq-content-item">
            <div>复杂的强制类型转化</div>  
            <div>\`\`\`</div>
            <div>derived1 = (struct Derived1 *)a;</div>
            <div>if (derived1->content) {</div>
            <div>\`\`\`</div>
          </li> 
          <li class="faq-content-item">
            <div>大循环</div>
            <div>\`\`\`</div>
            <div>for (int i = 0; i < 100000; i++) {</div>
            <div>…</div>
            <div>}</div>
            <div>\`\`\`</div>
          </li>

          <li class="faq-content-item">
            <div>复杂的下标符号操作</div>
            <div>\`\`\`</div>
            <div>int test(int arr*, int n) {</div>
            <div> if (n * n > 100000000) {</div>
            <div> return arr[n];</div>
            <div> }</div>
            <div> return -1;</div>
            <div> }</div>
            <div> \`\`\`</div>
          </li>

          <li class="faq-content-item">
            <div>复杂约束，难以求解</div>
            <div\`\`\`</div>
            <div>if (a * a * a % b > 9 && (a << 3 & x > 3) && a1 > 1 && a2 > 1 && a3 > 1 && ... && a20 > 1) {</div>
            <div>...</div>
            <div>}</div>
            <div>\`\`\`</div>
          </li>
        </ul>
        <div>测试用例生成在以下情况不支持：</div>
        <ul class="faq-content-list">
          <li class="faq-content-item">绝对地址</li>
          <li class="faq-content-item">不定参数</li>
        </ul>
        <div>若覆盖率无法达到要求，可以手动添加测试用例从而提高覆盖率。</div>
        `
     },
     {
       title: '5.	测试用例执行过程中为什么会出现执行异常和代码缺陷的结果？',
       publishInfo: this.publishInfo,
       content: `
          <div>(1) 执行异常，由以下情况造成：</div>
          <ul class="faq-content-list">
            <li class="faq-content-item">
              插桩或者编译错误
            </li>
          </ul>
          <div>
      出现执行异常的情况时，可以直接删除该用例，并手动添加合适的用例。在此之前希望您可以及时保存日志，并能够将脱敏后的数据提供给控安（联系方式：support.smartrocket@ticpsh.com），从而帮助控安优化工具为您提供更好的服务与体验。</div>
          <br/>
          <div>(2) 代码缺陷（该用例使得当前函数跑崩溃），由以下情况造成：</div>
          <ul class="faq-content-list">
            <li class="faq-content-item">空指针解引用</li>
            <li class="faq-content-item">数组越界</li>
            <li class="faq-content-item">除零</li>
          </ul>
          <div>出现代码缺陷的情况时，需要检查确认代码是否包含以上缺陷，并进行缺陷修复。</div>
        `
     },
     {
       title: '6.	如何在用例设计时手动添加绝对地址？',
       publishInfo: this.publishInfo,
       content: `对于任何一条测试用例，打开用例数据编辑窗口，在该窗口内支持添加绝对地址。 
将鼠标悬浮在<img src="static/help/button.png?${+new Date()}"/> 按钮上，即可在展开框中看到“添加绝对地址”，点击“添加绝对地址”，即可打开添加绝对地址弹窗。在该弹窗内，点击不同的绝对地址，可以查看其对应的代码，勾选绝对地址并点击确定，则已勾选的绝对地址会被添加至测试用例数据中，支持数据的填写。`
     }
   ]
   private selectedData: any = this.data[0];
   /**
    * question selection
    */
   handleClick(index: number) {
     this.selectedData = this.data[index];
     this.data.forEach((item) => {
       item.selected = false;
     });
     this.selectedData.selected = true;
   }
}
export default FAQ; 
</script>
