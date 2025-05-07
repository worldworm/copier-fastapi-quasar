<template>
  <!-- @vue-ignore -->
  <q-item v-ripple clickable tag="a" :to="link" :href="external_link" :active="$router.currentRoute.value.path == link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-separator v-if="separator" />
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "MenuItem",
});

export interface MenuItemProps {
  title: string;
  link?: string;
  icon?: string;
  separator?: boolean;
}

const props = withDefaults(defineProps<MenuItemProps>(), {
  link: "#",
  icon: "",
  separator: false,
});

const external_link = computed((): string | undefined => {
  return /^https?:\/\//.test(props.link) ? props.link : undefined;
});
</script>
