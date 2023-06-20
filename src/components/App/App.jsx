import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import ContactsForm from 'components/ContactsForm/ContactsForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';

import styles from '../../styles/App.module.css';

const App = () => {
  const STOR_KEY = 'contacts';
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [phonebook, setPhonebook] = useState(() => {
    return JSON.parse(localStorage.getItem(STOR_KEY)) ?? defaultContacts;
  });

  useEffect(() => {
    localStorage.setItem(STOR_KEY, JSON.stringify(phonebook));
  }, [phonebook]);

  const [filter, setFilter] = useState('');

  const addToList = conctact => {
    const isInContact = phonebook.some(
      ({ name }) => name.toLowerCase() === conctact.name.toLowerCase()
    );

    if (isInContact) {
      alert(`${conctact.name} is already in contacts`);
      return;
    }

    const updateConctactsList = [{ id: nanoid(), ...conctact }, ...phonebook];

    setPhonebook(updateConctactsList);
  };

  const removeFromList = contactId => {
    setPhonebook(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  const handleFilterChange = event => {
    const filterValue = event.target.value;
    setFilter(filterValue);
  };

  const filteredContacts = phonebook.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className={styles.app}>
      <ContactsForm onSubmit={addToList} />
      <Filter filter={handleFilterChange} value={filter} />
      <ContactsList
        contactList={filteredContacts}
        onContactRemove={removeFromList}
      />
    </section>
  );
};

export default App;
