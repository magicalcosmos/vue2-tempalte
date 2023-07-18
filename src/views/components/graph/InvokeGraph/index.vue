
<template>
  <section class="invoke-relative-graph">
    <div id="invokeGraphId" class="invoke-graph">
      <div id="invoke-graph-tooltip">
        <div>{{$t('function.name')}}: {{ functionName }}</div>
        <div>{{$t('function.type')}}: {{ functionType }}</div>
        <div>{{$t('function.file_path')}}: {{ filePath }}</div>
        <div>{{$t('function.file_description')}}: {{ fileDesc === 'invoke' ? $t('function.invoke') : $t('function.define') }}</div>
      </div>
    </div>
    <a
      href="javascript:void(0)"
      class="download"
      :title="$t('title.export_invoke_graph')"
      @click="handleDownload">
      <i class="iconfont icon-overview-download"></i>
    </a>
  </section>
</template>
<script lang="ts" src="./index.ts"></script>
