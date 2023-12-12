import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1)
    const tx = db.transaction('jate', 'readwrite')
    const store = tx.objectStore('jate')
    const request = store.put({ id: 1, value: content })
    const result = await request
    console.log('Data added to database:', result)
  } catch (error) {
    console.error('Error adding content to database:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1)
    const result = await request;
    return result?.value;
  } catch (error) {
    console.error('Error getting content from database:', error);
    return [];
  }
};

initdb();