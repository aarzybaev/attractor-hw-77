import Messages from "./routers/messages";

export interface Message {
    id: string;
    author: string | null;
    message: string;
    image: string | null;
}

export type MessageWithoutId = Omit<Message, 'id'>;
