export class Contact {
    public contactId: string;
    public name: string;
    public email: string;
    public phone: string;
    public imageUrl: string;
    public group: string;

    constructor(contactId: string, name: string, email: string, phone: string, imageUrl: string, group: string) {
        this.contactId = contactId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.group = group;
    } 
}