import { useAuth } from "../modules";
import { supabase } from "../services/supabase";

export default {
  install() {
    // Set store if user authenticated
    supabase.auth.onAuthStateChange((event, session) => {
      const { setUser } = useAuth();
      setUser(event, session);
    });
  },
};
