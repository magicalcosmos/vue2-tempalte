<template>
  <span
    class="r-breadcrumb__item"
    @click="handleClick">
    <span
      :class="['r-breadcrumb__inner', to ? 'is-link' : '']"
      ref="link"
      role="link">
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="r-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="r-breadcrumb__separator" role="presentation">{{separator}}</span>
  </span>
</template>
<script>
export default {
  name: 'RBreadcrumbItem',
  props: {
    to: {},
    replace: Boolean
  },
  data() {
    return {
      separator: '',
      separatorClass: ''
    };
  },
  inject: ['rBreadcrumb'],
  mounted() {
    this.separator = this.rBreadcrumb.separator;
    this.separatorClass = this.rBreadcrumb.separatorClass;
    const link = this.$refs.link;
    link.setAttribute('role', 'link');
    link.addEventListener('click', _ => {
      const { to, $router } = this;
      if (!to || !$router) return;
      this.replace ? $router.replace(to) : $router.push(to);
    });
  },
  methods: {
    handleClick: function(evt) {
      this.$emit('click', evt);
    }
  }
};
</script>
