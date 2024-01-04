import { Contact } from '@/types/contact';

export type AddContactBody = Omit<Contact, 'id'>;
