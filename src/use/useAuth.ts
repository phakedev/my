import { ref } from "vue";
import { supabase } from "./../services/supabase";
import {
  Session,
  Provider,
  UserCredentials,
} from "@supabase/gotrue-js/dist/main/lib/types";

const userSession = ref<Session | null>(null);

async function handleLogin(credentials: UserCredentials) {
  try {
    const { error, user } = await supabase.auth.signIn({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      alert("Error logging in: " + error.message);
    }
    // No error throw, but no user detected so send magic link
    if (!error && !user) {
      alert("Check your email for the login link!");
    }
  } catch (error) {
    console.error("Error thrown:", error.message);
    alert(error.error_description || error);
  }
}

async function handleLoginWithMagicLink(email: string): Promise<any> {
  try {
    const { error, user } = await supabase.auth.signIn({
      email: email,
    });
    if (error) {
      return { error };
    }

    if (!error && !user) {
      return { message: "Check your email for the login link!", error: null };
    }
  } catch (error) {
    console.error("Error thrown:", error.message);
    return { error: error.error_description || error };
  }
}

async function handleSignup(credentials: UserCredentials) {
  try {
    const { email, password } = credentials;
    if (!email || !password) {
      alert("Please provide both your email and password.");
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
      console.error(error, error.message);
      return;
    }
    alert("Signup successful, confirmation mail should be sent soon!");
  } catch (err) {
    alert("Fatal error signing up");
    console.error("signup error", err);
  }
}

async function handleOAuthLogin(provider: Provider) {
  const { error } = await supabase.auth.signIn({ provider });
  if (error) console.error("Error: ", error.message);
}

async function handlePasswordReset() {
  const email = prompt("Please enter your email:");
  if (!email) {
    window.alert("Email address is required.");
  } else {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Password recovery email has been sent.");
    }
  }
}

async function handleUpdateUser(credentials: UserCredentials) {
  try {
    const { error } = await supabase.auth.update(credentials);
    if (error) {
      alert("Error updating user info: " + error.message);
    } else {
      alert("Successfully updated user info!");
      window.location.href = "/";
    }
  } catch (error) {
    alert("Error updating user info: " + error.message);
  }
}

/**
 * Handles logging a user out of a superbase session
 */
async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error signing out");
      console.error("Error", error);
      return;
    }

    alert("You have signed out!");
  } catch (err) {
    alert("Unknown error signing out");
    console.error("Error", err);
  }
}

export {
  userSession,
  handleLogin,
  handleOAuthLogin,
  handleLoginWithMagicLink,
  handleSignup,
  handleLogout,
  handlePasswordReset,
  handleUpdateUser,
};
