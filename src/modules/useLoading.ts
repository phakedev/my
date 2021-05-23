import { reactive } from "@vue/reactivity";
import { toRefs } from "@vueuse/core";

const state = reactive<any>({
  screen: false,
});

export const useLoading = (): any => {
  const setLoading = (type: string, status: boolean | null = null): void => {
    if (Object.keys(state).includes(type))
      state[type] = status === null ? !state[type] : status;
  };

  return {
    setLoading,
    ...toRefs(state),
  };
};
