import React, { Component } from 'react'
import {PropTypes} from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
    static PropTypes = {
        contacts: PropTypes.array.isRequired,
        deleteContact: PropTypes.func.isRequired
    }
    
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({query: ''})
    }

    render () {
        const {contacts, deleteContact} = this.props
        const {query} = this.state
        let matchedContacts;

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            matchedContacts = contacts.filter((c) => match.test(c.name))
        } else {
            matchedContacts = contacts
        }

        matchedContacts.sort(sortBy('name'));
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input 
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>

                {matchedContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Showing {matchedContacts.length} of {contacts.length} total.</span>
                        <button onClick={this.clearQuery}>Show All</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {matchedContacts.map(contact => (
                        <li key={ contact.id } className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}></div>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => deleteContact(contact)} className='contact-remove'>Remove</button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts 