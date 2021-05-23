<template>
  <div class="relative min-h-screen">
    <div
      v-if="screen"
      class="
        flex
        absolute
        w-full
        h-full
        top-0
        overflow-hidden
        left-1/2
        pl-4
        transform
        -translate-1/2 -translate-x-1/2
        items-center
        justify-center
        py-1
        px-2
        rounded
        select-none
        transition
        bg-white
        dark:bg-black
        dark:transition
      "
    >
      <svg
        class="
          animate-spin
          h-8
          w-8
          text-gray-400
          mr-4
          loading-spin
          transition
          dark:transition
        "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>

    <router-view />

    <div class="text-center flex justify-center">
      <div
        class="
          flex
          items-center
          px-3
          py-1
          border-gray-200 border
          text-gray-500
          rounded
          cursor-pointer
          hover:(text-gray-700)
          dark:(text-gray-400
          border-gray-700)
        "
        @click="toggleDark"
      >
        <template v-if="isDark"> <i-carbon-moon class="mr-2" />Dark </template>
        <template v-else><i-carbon-sun class="mr-2" />Light </template>
      </div>
    </div>

    <div v-if="authenticated" class="mt-4 text-center flex justify-center">
      <button @click.prevent="onSignOut">Signout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useAuth, useLoading } from "../modules";
import { useRouter } from "vue-router";
import { useTitle } from "@vueuse/core";

export default defineComponent({
  name: "LayoutIndex",

  setup() {
    const isDark = useDark();
    const title = useTitle("My Phake | phake.dev");
    const { setLoading, screen } = useLoading();
    const toggleDark = useToggle(isDark);
    const router = useRouter();
    const errors = ref<any>(null);
    const { signOut, authenticated } = useAuth();

    const onSignOut = async () => {
      setLoading("screen", true);
      const { error } = await signOut();
      if (error) {
        errors.value = error;
      }
      router.push({ name: "signin" });
      setLoading("screen", false);
    };

    return {
      isDark,
      toggleDark,
      onSignOut,
      authenticated,
      screen,
      setLoading,
    };
  },
});
</script>
