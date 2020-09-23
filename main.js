let app = new Vue({
    el: "#app",
    data: {
        contacts: [],
        name: "Contatos App" , 
        contact: {
            id: '',
            name: '' , 
            email: '' ,
            phone: '' ,
        },
        isEdit: false
    },
    computed:{
        contactsCount() {
        return `Total de contatos é ${this.contacts.length}`;
        }
    },
    created(){
        this.contacts = JSON.parse(localStorage.getItem('contactsApp'));
    },
    methods: {
        saveContact(contact){

            let contacts = localStorage.getItem('contactsApp');

            contact.id = new Date().getTime();

            if(contacts){

                contacts = JSON.parse(contacts);
                contacts.push(contact);

            }else{
                contacts = [contact];
            }

            this.contacts = contacts;
            localStorage.setItem('contactsApp',JSON.stringify(contacts));
            location.reload();
        },
        removeContact(contactId){

            let contacts = localStorage.getItem('contactsApp');

            if(!contacts) return;

            contacts = JSON.parse(contacts);

            contacts = contacts.filter((contact) => {
                return contact.id != contactId;
            }); 

            this.contacts = contacts;
            localStorage.setItem('contactsApp', JSON.stringify(contacts));                      
        },

        editContact(contact){
            this.contact = contact;
            this.isEdit = true;
        },

        updateContact(contact){
            let contacts = this.contacts.map(contactMap => {
                if(contactMap.id = contact.id){
                    return contact;
                }

                return contactMap;
            })

            this.contacts = contacts;
            this.isEdit = false;
            localStorage.setItem('contactsApp', JSON.stringify(contacts));

            location.reload();
        }
        
    
    }
});