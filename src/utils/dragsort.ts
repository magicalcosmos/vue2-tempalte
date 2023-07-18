export default class DragSort {
  private el: HTMLElement;
  private options: IOptions;
  /**
   * 源对象dom元素
   */
  private dragEl: HTMLElement;
  /**
   * 目标元素的索引
   */
  private newIndex: number = -1;
  /**
   * 拖拽元素的索引
   */
  private oldIndex: number = -1;

  private originIndex: number = -1;

  private isAnim: boolean = true;

  private isDrop: boolean = false;
  private onDragStart: EventFnType;
  private onDragEnd: EventFnType;
  private onDragEnter: EventFnType;
  private onDragOver: EventFnType;
  private onDrop: EventFnType;

  /**
   * constructor method
   * @param el
   * @param options
   */
  constructor(el: HTMLElement, options: IOptions) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw new Error('`el` must be an HTMLElement, not '.concat({}.toString.call(el)));
    }
    this.el = el;
    this.options = options;
    this.initialize();
  }

  /**
   * initialize
   * @date 2022-02-15
   * @return {any}
   */
  initialize() {
    this.destroy();
    this.onDragStart = this.handleDragStart.bind(this);
    this.onDragEnd = this.handleDragEnd.bind(this);
    this.onDragEnter = this.handleDragEnter.bind(this);
    this.onDragOver = this.handleDragOver.bind(this);
    this.onDrop = this.handleDrop.bind(this);
    this.bindEvents(this.el, 'dragstart', this.onDragStart);
    this.bindEvents(this.el, 'dragend', this.onDragEnd);
    this.bindEvents(this.el, 'dragenter', this.onDragEnter);
    this.bindEvents(this.el, 'dragover', this.onDragOver);
    this.bindEvents(this.el, 'drop', this.onDrop);
  }

  /**
   * bind events
   * @param el event source
   * @param eventName The name of the event to listen
   * @param eventFn The method the event invokes
   */
  private bindEvents(el: HTMLElement, eventName: string, eventFn: EventListenerOrEventListenerObject) {
    if (!el) {
      return;
    }

    el.addEventListener(eventName, eventFn);
  }
  /**
   * unbind events
   * @param el event source
   * @param eventName The name of the event to listen
   * @param eventFn The method the event invokes
   * @returns
   */
  private unbindEvents(el: HTMLElement, eventName: string, eventFn: EventListenerOrEventListenerObject) {
    if (!el) {
      return;
    }

    el.removeEventListener(eventName, eventFn);
  }

  /**
   * 开始拖拽
   */
  private handleDragStart(event: DragEvent) {
    const target: HTMLElement = event.target as HTMLElement;
    this.dragEl = target;
    this.oldIndex = this.originIndex = this.getIndex(target);

    // 设置拖放元素移动时的视觉效果
    event.dataTransfer.effectAllowed = 'move';
  }
  /**
   * 拖拽结束
   */
  private handleDragEnd(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (this.originIndex === this.newIndex) {
      this.isDrop = false;
      return;
    }
    if (this.isDrop) {
      this.options.onEnd({ newIndex: this.newIndex, oldIndex: this.oldIndex });
      this.isAnim = true;
      this.isDrop = false;
    }
  }
  /**
   * 拖拽到目标范围
   */
  private handleDragEnter(event: DragEvent) {
    event.preventDefault();
    const target = this.getNode(event.target as HTMLElement);
    if (target.nodeName.toLowerCase() === this.options.delegate) {
      this.newIndex = this.getIndex(target);

      // 设置拖放目标元素的视觉效果
      event.dataTransfer.dropEffect = 'move';
      if (this.oldIndex !== this.newIndex) {
        this.options.onDragEnter({ newIndex: this.newIndex, oldIndex: this.oldIndex });
        this.oldIndex = this.newIndex;
        this.isDrop = true;
      }
    }
  }
  /**
   * 目标对象被源对象拖动着悬停在上方
   */
  private handleDragOver(event: DragEvent) {
    const me = this;
    event.preventDefault();
    const targetEl = this.getNode(event.target as HTMLElement);

    // 设置拖放目标元素的视觉效果
    event.dataTransfer.dropEffect = 'move';

    if (!me.isAnim) {
      return;
    }
    if (targetEl !== me.dragEl) {
      const targetRect = targetEl.getBoundingClientRect();
      const draggingRect = me.dragEl.getBoundingClientRect();
      me.animate(me.dragEl, me.dragEl.getBoundingClientRect(), draggingRect);
      me.animate(targetEl, targetEl.getBoundingClientRect(), targetRect);
    }
  }
  /**
   * 源对象拖动着在目标对象上方释放/松手
   */
  private handleDrop(event: DragEvent) {
    event.preventDefault();
  }

  /**
   * 获取元素的索引
   * @date 2022-02-15
   * @param {Element} el
   * @return {any}
   */
  getIndex(el: Element): number {
    let index = 0;

    if (!el || !el.parentNode) {
      return -1;
    }

    while (el && (el = el.previousElementSibling)) {
      index++;
    }

    return index;
  }

  /**
   * 获取委托节点
   * @date 2022-03-02
   * @param {Element} el
   * @return {Element}
   */
  getNode(el: Element): HTMLElement {
    let parent: HTMLElement = el.parentNode as HTMLElement;
    while (parent) {
      if (parent.nodeName.toLowerCase() === this.options.delegate || (parent.className.includes && parent.className.includes(this.options.delegate))) {
        return parent;
      }
      parent = parent.parentNode as HTMLElement;
    }
  }

  /**
   * 拖拽动画
   * @param {HTMLElement&{animated:any}} target
   * @param {DOMRect} currentRect
   * @param {DOMRect} toRect
   * @param {number} duration?
   * @return {any}
   */
  private animate(
    target: HTMLElement & { animated: any },
    currentRect: DOMRect,
    toRect: DOMRect,
    duration: number = 1000
  ) {
    this.isAnim = false;
    target.style.transition = '';
    target.style.transform = '';
    const translateX: number = currentRect.left - toRect.left;
    const translateY: number = currentRect.top - toRect.top;
    target.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;

    // 触发重绘
    this.repaint(target);

    target.style.transition = `all ${duration}ms ${this.options.easing ? ' ' + this.options.easing : ''}`;
    target.style.transform = 'translate3d(0,0,0)';
    clearTimeout(target.animated);
    target.animated = setTimeout(() => {
      target.style.transition = '';
      target.style.transform = '';
    }, duration);
  }

  /**
   * 触发重绘
   * @param HTMLElement target
   */
  private repaint(target: HTMLElement) {
    return target.offsetHeight;
  }

  /**
   * destroy
   */
  destroy() {
    this.unbindEvents(this.el, 'dragstart', this.onDragStart);
    this.unbindEvents(this.el, 'dragend', this.onDragEnd);
    this.unbindEvents(this.el, 'dragenter', this.onDragEnter);
    this.unbindEvents(this.el, 'dragover', this.onDragOver);
    this.unbindEvents(this.el, 'drop', this.onDrop);
    this.dragEl = null;
  }
}
type EventFnType = (e: DragEvent) => void;
interface IOptions {
  easing?: string;
  /**
   * 委托对象，可以是nodeName或className
   */
  delegate: string;
  onEnd?: (any) => void;
  onDragEnter?: (any) => void;
}
