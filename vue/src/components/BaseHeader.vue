<template>
  <div class="header-main">
    <siteNav></siteNav>
    <siteSearch></siteSearch>
    <headerNav></headerNav>
  </div>
</template>

<script>
import siteNav from '@/page/baseHeader/SiteNav'
import siteSearch from '@/page/baseHeader/SiteSearch'
import headerNav from '@/page/baseHeader/HeaderNav'
export default {
  components: {
    siteNav,
    siteSearch,
    headerNav
  }
};
</script>
