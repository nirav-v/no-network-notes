import { openDB } from "idb";

const initdb = async () =>
  openDB("notes", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("notes")) {
        console.log("notes database already exists");
        return;
      }
      db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
      console.log("notes database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const notesDb = await openDB('notes', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = notesDb.transaction('notes', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('notes');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ notes: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log("GET from the database");

// Create a connection to the database database and version we want to use.
const notesDb = await openDB("notes", 1);

// Create a new transaction and specify the database and data privileges.
const tx = notesDb.transaction("notes", "readonly");

// Open up the desired object store.
const store = tx.objectStore("notes");

// Use the .getAll() method to get all data in the database.
const request = store.getAll();

// Get confirmation of the request.
const result = await request;
console.log("result.value", result);
return result;
}

initdb();
