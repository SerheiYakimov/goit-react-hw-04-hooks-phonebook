
import "./App.css";
import { useState } from "react";
import { useLS } from './hooks/LS';
import Form from "./components/Form/Form";
import { Filter } from "./components/Filter/Filter";
import { ContactList } from "./components/ContactList/ContactList";
import PropsType from "prop-types";



export default function App() {
    
    const [contacts, setContacts] = useLS('contacts', [
        { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
        { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
        { id: "id-3", name: "Eden Clements", number: "645-17-79" },
        { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ]);
    const [filter, setFilter] = useState('');

    const addNewContact = (contact) => {
        if (contacts.find((el) => el.name === contact.name)) {
        alert(`${contact.name} is already in contacts`);
        } else {
            setContacts([...contacts, contact])
        };
    };

    const handleFilter = (e) => {
        setFilter(e.target.value)
    };

    const findContact = () => {
        const normalizeFilter = filter.toLowerCase();
        if (filter.length > 0) {
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(normalizeFilter)
        );
        } else {
        return contacts;
        }
    };
    
   const deleteContact = (id) => {
        setContacts(contacts.filter((el) => el.id !== id));
   };



    return (
        <div className="App">
            <div className="container">
                <h2 className="title">Phonebook</h2>
                <Form addNewContact={addNewContact} />
                <div>
                    <h2 className="title">Contacts</h2>
                    <Filter value={filter} onChange={handleFilter} />
                    <ContactList
                        findContact={findContact}
                        onDeleteContact={deleteContact}
                    />
                </div>
            </div>
        </div>
    );
}


App.PropsType = {
    addNewContact: PropsType.func.isRequired,
    value: PropsType.string.isRequired,
    onChange: PropsType.func.isRequired,
    findContact: PropsType.func.isRequired,
    onDeleteContact: PropsType.func.isRequired,
};
