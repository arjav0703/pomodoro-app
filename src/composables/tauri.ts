import { load } from '@tauri-apps/plugin-store';

async function save_to_store(key: string, value: string | number | boolean) {
  const store = await load('store.json');
  await store.set(key, value);
  await store.save();
}

async function get_from_store(key: string) {
  const store = await load('store.json');
  const val = await store.get<{ value: number }>(key);
  return val;
}

export { save_to_store, get_from_store };
