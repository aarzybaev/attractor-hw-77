
export interface Message {
    id: string;
    author: string;
    message: string;
    image: string | null;
    createdAt?: string;
}

export type MessageWithoutId = Omit<Message, 'id'>;
