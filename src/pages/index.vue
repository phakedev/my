<template>
  <div
    v-if="user"
    class="w-full mx-auto py-4 text-center max-w-xl px-4 md:px-0"
  >
    <h1 class="font-medium text-xl">Welcome back, {{ user.email }}!</h1>
    <h3 class="font-medium text-base text-gray-600 mt-2 dark:text-gray-300">
      There's nothing here, yet!
    </h3>
    <p class="mt-2 text-gray-500">
      If you like to make something fun with me, contact me via
      <a
        href="mailto:pp@phuongphung.com"
        class="text-black dark:text-white hover:underline"
      >
        pp@phuongphung.com
      </a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuth } from "../modules/useAuth";

export default defineComponent({
  setup() {
    const { user } = useAuth();
    return {
      user,
    };
  },
});
</script>
