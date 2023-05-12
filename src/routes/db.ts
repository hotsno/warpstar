import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import type { Warp } from '$lib/server/fetchWarps';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

const userStore = writable();

supabase.auth.getSession().then(({ data }) => {
  userStore.set(data.session?.user);
});

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN' && session) {
    userStore.set(session.user);
  } else if (event == 'SIGNED_OUT') {
    userStore.set(null);
  }
});

export default {
  get user() {
    return userStore;
  },
  async checkIfSignedIn() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
  signIn() {
    return supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  },
  signOut() {
    return supabase.auth.signOut();
  },
  warps: {
    async add(warps: Warp[]): Promise<Warp[]> {
      const { data } = await supabase.from('warps').insert(warps).select();
      return data as Warp[];
    },
    async getAllWarps(): Promise<Warp[]> {
      const { data } = await supabase.from('warps').select('*');
      return data as Warp[];
    }
  }
};
