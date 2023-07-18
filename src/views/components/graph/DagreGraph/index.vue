
<template>
  <div :id="containerId" class="dagre-graph-container w-100 h-100">
    <r-popover
      v-model="showPopover"
      class="control-flow-popover"
      popper-class="control-flow-popper"
      placement="bottom"
      width="98"
      trigger="click"
      :offset="5"
      :visible-arrow="false"
    >
      <r-button slot="reference" :class="['control-flow-button', { 'is-active-button': showPopover }]" width="88" height="22">
        {{ $t('overview.control_flow_info') }}
        <i class="iconfont r-icon-arrow-left" :class="{ 'icon-active': showPopover }"></i>
      </r-button>
      <div class="control-flow-content">
        <div class="control-flow-item">{{ $t('overview.cyclomatic_complexity') }}: {{ functionData.cycleComplexity }}</div>
        <div class="control-flow-item">{{ $t('overview.fan_in') }}: {{ functionData.fanIn }}</div>
        <div class="control-flow-item">{{ $t('overview.fan_out') }}: {{ functionData.fanOut }}</div>
        <r-tooltip effect="light" placement="bottom">
          <div slot="content">
            <p>{{ $t('message.control_flow_desc') }}</p>
          </div>
          <svg class="icon icon-help" aria-hidden="true">
            <use xlink:href="#icon-help" />
          </svg>
        </r-tooltip>
      </div>
    </r-popover>
    <svg xmlns="http://www.w3.org/2000/svg" class="dagre w-100 h-100">
      <g class="container" id="container"></g>
    </svg>
    <TestCaseListForCFG
      :visible.sync="isTestCaseListVisible"
      :data="testCaseList"
      @click="handleClick"
    ></TestCaseListForCFG>
    <span v-if="!testCases.length"></span>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
