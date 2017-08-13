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

    render () {
        let matchedContacts;

        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            matchedContacts = this.props.contacts.filter((c) => match.test(c.name))
        } else {
            matchedContacts = this.props.contacts
        }

        matchedContacts.sort(sortBy('name'));
        return (
            <div className='list-contacts'>
                <input 
                    className='search-contacts'
                    type='text'
                    placeholder='Search Contacts'
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
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
                            <button onClick={() => this.props.deleteContact(contact)} className='contact-remove'>Remove</button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts 