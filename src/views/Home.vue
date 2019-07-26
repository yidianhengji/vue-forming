<template>
  <div>
    <TopContainer/>
    <div class="home">
      <FieldListContainer/>
      <ShowArea/>
      <AttributeContainer/>
    </div>
  </div>
</template>

<script>
import FieldListContainer from '@/components/FieldListContainer'
import ShowArea from '@/components/ShowArea'
import AttributeContainer from '@/components/AttributeContainer'
import TopContainer from '@/components/TopContainer'

export default {
  name: 'home',
  components: {
    FieldListContainer,
    ShowArea,
    AttributeContainer,
    TopContainer
  }
}
</script>

<style scoped>
  .home {
    display: flex;
    padding: 10px;
  }
</style>
