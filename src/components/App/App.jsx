import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Box from 'components/Box';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

import { GlobalStyle } from './GlobalStyle';
import {
  Section,
  PhonebookWrapper,
  PhonebookTitle,
  ContactsWrapper,
  ContactsTitle,
} from './App.styled';

class App extends Component {
  state = {
    filter: '',
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  };

  contactsHandler = (values, { resetForm }) => {
    const { name, number } = values;
    const lowerCaseName = name.toLowerCase();
    const nameСomparison = this.state.contacts.find(
      contact => contact.name.toLowerCase() === lowerCaseName
    );

    resetForm();

    if (!nameСomparison) {
      const contact = { id: nanoid(), name, number };

      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    } else {
      Notify.failure(`${name} is already in contacts.`, {
        position: 'center-top',
        width: '300px',
        fontSize: '14px',
        failure: {
          background: '#883f2d',
        },
      });
    }
  };

  filterHandler = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  filterContacts = () => {
    const lowerCaseFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          width="1280px"
          height="970px"
          bg="bodyColor"
          boxShadow="outline"
          as="main"
        >
          <Section>
            <PhonebookWrapper>
              <PhonebookTitle>Phonebook</PhonebookTitle>
              <ContactForm
                onSubmit={this.contactsHandler}
                options={{ name: '', number: '' }}
              />
            </PhonebookWrapper>
            <ContactsWrapper>
              <ContactsTitle>Contacts</ContactsTitle>
              <Filter
                filter={this.state.filter}
                onFilter={this.filterHandler}
              />
              <ContactList
                contacts={this.filterContacts}
                onDeleteContact={this.deleteContact}
              />
            </ContactsWrapper>
          </Section>
        </Box>
        <GlobalStyle />
      </>
    );
  }
}

export default App;
