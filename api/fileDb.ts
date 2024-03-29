import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Message, MessageWithoutId} from "./types";


const filename = './db.json';
let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    }
    catch (e) {
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async getItemById(id: string) {
    return data.find(product => product.id === id);
  },
  async addItem (item: MessageWithoutId) {
    const message: Message = {
      id: crypto.randomUUID(),
      ...item,
      createdAt: new Date().toISOString(),
    };
    data.push(message);
    await this.save();
  },
  async save() {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
  }
}

export default fileDb;