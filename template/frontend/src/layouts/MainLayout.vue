<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggle_left_drawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left_drawer_open" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <MenuItem v-for="link in links_list" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MenuItem from "components/MenuItem.vue";
import type { MenuItemProps } from "components/MenuItem.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const links_list: MenuItemProps[] = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/",
    separator: true,
  },
];

const left_drawer_open = ref(false);

function toggle_left_drawer() {
  left_drawer_open.value = !left_drawer_open.value;
}
</script>
