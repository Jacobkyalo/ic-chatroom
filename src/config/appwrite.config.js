import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_API_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
export const ROOM_COLL_ID = import.meta.env.VITE_APPWRITE_ROOM_COLL_ID;
export const MSG_COLL_ID = import.meta.env.VITE_APPWRITE_MSG_COLL_ID;

export default client;
