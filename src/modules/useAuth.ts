import { Provider } from "@supabase/supabase-js";
import { reactive, toRefs } from "vue";
import { supabase } from "../services/supabase";

const state = reactive<any>({
  authenticated: false,
  user: false,
  error: false,
});

export const useAuth = (): any => {
  // Set authenticated user
  const setUser = (event: string, payload: any) => {
    if (event === "SIGNED_IN" && payload?.user) {
      state.user = payload.user;
      state.authenticated = true;
      state.error = undefined;
    } else if (event === "SIGNED_OUT") {
      state.user = undefined;
      state.authenticated = false;
      state.error = undefined;
    } else {
      state.user = undefined;
      state.authenticated = false;
      state.error = undefined;
    }
  };

  // Sign in with OAuth provider
  const signInWithProvider = async (
    provider: Provider,
    redirectTo: string | undefined = undefined
  ) => {
    const { error } = await supabase.auth.signIn(
      { provider },
      {
        redirectTo:
          typeof redirectTo !== "undefined"
            ? `${import.meta.env.VITE_BASE_URL}/auth/continue?url=${redirectTo}`
            : undefined,
      }
    );

    if (error) {
      console.error("[supabase.auth.signInWithProvider]", error);
      return { error };
    }
    return true;
  };

  // Sign in with magic link
  const signInWithMagicLink = async (
    email: string,
    redirectTo: string | undefined = undefined
  ): Promise<any> => {
    try {
      const { error, user } = await supabase.auth.signIn(
        {
          email: email,
        },
        {
          redirectTo:
            typeof redirectTo !== "undefined"
              ? `${
                  import.meta.env.VITE_SUPABASE_KEY
                }/auth/continue?url=${redirectTo}`
              : undefined,
        }
      );
      if (error) {
        console.log("[supabase.auth.signInWithMagicLink]", error);
        return { error };
      }
      if (!error && !user) {
        return { message: "Check your email for the login link!", error: null };
      }
    } catch (error) {
      console.log("[supabase.auth.signInWithMagicLink]", error);
      return { error: error.error_description || error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log("[supabase.auth.signOut]", error);
        return { error: error };
      }
      if (!error) {
        return { message: "You have signed out!", error: null };
      }
    } catch (error) {
      console.log("[supabase.auth.signOut]", error);
      return { error: error.error_description || error };
    }
  };

  // Password reset
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      console.log("[supabase.auth.resetPassword]", error);
      return { error: error };
    }
    return { message: "Password recovery has been sent!", error: null };
  };

  // Update user info
  const updateUser = async (credentials: any) => {
    try {
      const { error } = await supabase.auth.update(credentials);
      if (error) {
        console.log("[supabase.auth.updateUser]", error);
        return { error: error };
      }
      return { message: "Successfully update user info!", error: null };
    } catch (error) {
      console.log("[supabase.auth.updateUser]", error);
      return { error: error.message };
    }
  };

  return {
    setUser,
    signOut,
    signInWithProvider,
    signInWithMagicLink,
    resetPassword,
    updateUser,
    ...toRefs(state),
  };
};
