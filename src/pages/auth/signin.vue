<template>
  <div class="mx-auto w-full max-w-xl px-4 xl:px-0 pt-16">
    <h3 class="text-center mb-2 font-semibold text-2xl">
      Hey bro! Welcome back!
    </h3>

    <p class="text-center text-gray-500 mb-4">
      Sign in to start using Phake Platform.
    </p>

    <p
      v-if="form.errors.message"
      class="
        mb-4
        px-4
        bg-red-200
        text-red-800
        dark:text-white
        dark:bg-red-900
        rounded
        py-2
      "
    >
      {{ form.errors.status }}{{ form.errors.message }}
    </p>

    <template v-if="state.type === 'magic-link'">
      <div class="border-b border-gray-200 mb-4 pb-4 dark:border-gray-900">
        <p v-if="form.message">
          {{ form.message }}
        </p>

        <div>
          <label for="email" class="block mb-1 font-semibold">Email</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            placeholder="Email"
            class="dark:(bg-gray-900 border-transparent) mb-4 w-full"
          />
        </div>

        <button
          @click.prevent="signin()"
          class="btn btn-primary"
          :disabled="form.loading"
          :class="{
            'bg-pink-900 cursor-not-allowed hover:bg-pink-900': form.loading,
          }"
        >
          Continue
        </button>
      </div>
    </template>

    <div
      v-if="!state.type"
      class="
        mt-4
        mb-4
        flex
        justify-center
        flex-col
        gap-4
        w-full
        max-w-sm
        mx-auto
      "
    >
      <button
        @click.prevent="signInWithOAuth('github')"
        class="
          btn
          flex
          items-center
          justify-center
          bg-gray-800
          text-white
          hover:text-gray-200
          hover:bg-gray-600
        "
      >
        <i-carbon-logo-github class="mr-2" />
        Continue with Github
      </button>

      <button @click.prevent="setType('magic-link')" class="btn">
        Continue with Email
      </button>
    </div>

    <div v-else class="text-center">
      <p
        class="
          text-primary-700
          inline-flex
          items-center
          cursor-pointer
          hover:text-primary-500
          hover:underline
          mb-4
        "
        @click="setType(null)"
      >
        <i-carbon-chevron-left class="mr-2" />
        All sign in options
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "../../modules/useAuth";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { query } = useRoute();
    const form = reactive<any>({
      enabled: false,
      email: "",
      message: null,
      loading: false,
      errors: {
        message: null,
        sattus: null,
      },
    });
    const state = reactive<any>({
      type: null,
      service: null,
      continue: undefined,
    });
    const loading = reactive<any>({
      signInWithProvider: false,
    });
    const { signInWithProvider, signInWithMagicLink, authenticated } =
      useAuth();

    watch(authenticated, (value: boolean) => {
      if (value === true) {
        router.push({ name: "home" });
      }
    });

    onMounted(async () => {
      await nextTick();
      if (query.service) state.service = query.service || null;
      if (query.continue) state.continue = query.continue || undefined;
    });

    const signin = async (): Promise<void> => {
      try {
        form.loading = true;
        const { error, message } = await signInWithMagicLink(
          form.email,
          state.continue
        );
        if (error) {
          throw error;
        }
        form.loading = false;
        form.message = message;
      } catch (err) {
        form.errors.message = err.message;
        form.errors.status = err.status || null;
        form.loading = false;
      }
    };

    const signInWithOAuth = async (provider: string): Promise<void> => {
      try {
        loading.signInWithProvider = true;
        await signInWithProvider(provider, state.continue);
        loading.signInWithProvider = false;
      } catch (err) {
        form.errors.message = err.message;
        form.errors.status = err.status || null;
        loading.signInWithProvider = false;
      }
    };

    const setType = (type: string | null) => {
      state.type = type;
    };

    return { form, signin, signInWithOAuth, setType, state };
  },
});
</script>
