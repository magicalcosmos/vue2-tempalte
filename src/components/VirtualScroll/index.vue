<template>
  <div
    class="virtual-scroll-container position-relative"
    :class="{ 'hide-scrollbar': !showScrollbar }"
    @scroll="handleScroll"
    ref="refScrollContainer"
  >
    <slot name="header"></slot>
    <div class="text-999 position-absolute" v-if="data.length && !treeData.length">{{ $t('project.no_data') }}</div>
    <ul class="virtual-scroll-list" ref="refScroll" :style="blankFillStyle" :class="ulClass">
      <li
        :id="li[keyName]"
        class="virtual-scroll-item d-flex justify-content-lg-start"
        :class="[lineClass(li), highLightCurrentRow && li[keyName] === currentRow[keyName] && selectedCls, hoverHighLightCurrentRow ? 'hover-high-light-current-row' : '', !li.hasChildren ? 'is-leaf' : '', li.disabled ? 'is-disabled' : '', li.parentKey]"
        v-for="(li, index) in visibleData"
        :style="getItemStyle(li)"
        :key="li[keyName]"
        @click="handleItemClick(li, visibleData, index, $event)">
        <div
          class="virtual-scroll-expand-icon"
          :class="{'visible-hidden': isTree && !li.hasChildren}"
          :style="{marginRight: !showCheckbox ? '5px' : '2px'}"
          v-show="isTree && li.hasChildren === true"
          @click='handleExpand(li)'
        >
          <i :class="`iconfont ${expandIcon} ${!li.expanded ? foldIcon : ''}`"></i>
        </div>
        <r-checkbox
          class="virtual-scroll-checkbox"
          v-show="showCheckbox"
          v-model="li.checked"
          :data="li.checked"
          :indeterminate="li.indeterminate"
          :disabled="!!li.disabled"
          @change="
                    checked => {
                      handleCheckChange(li, checked);
                    }"
        >
        </r-checkbox>
        {{ registerNode(li, keyName) }}
        <slot name="scrollItem" :item="li" :backup="li" :itemIndex="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
