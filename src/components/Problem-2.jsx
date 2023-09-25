import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        height: '80%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '50px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const Problem2 = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [showAllContact, setShowAllContact] = useState();
    const [contacts, setContacts] = useState()

    useEffect(() => {
        if (modalIsOpen) {
            const url = showAllContact ? 'https://contact.mediusware.com/api/contacts/' : 'https://contact.mediusware.com/api/country-contacts/United%20States/'
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setContacts(data.results);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [modalIsOpen, showAllContact]);

    const openModal = (value) => {
        const allContact = value === "all" ? true : false
        setShowAllContact(allContact)
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }
    const showEvenkHandler = (e) => {
        if (e.target.checked === false) {
            setContacts(contacts)
        }
        else {
            const evenContacts = contacts.filter(contact => contact.id % 2 === 0)
            setContacts(evenContacts)
        }

    }
    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button onClick={() => openModal("all")} className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                    <button onClick={() => openModal("us")} className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <div>
                            <h2 className='text-success'>{showAllContact ? "All Contact" : "US Contact"}</h2>
                            <div className="form-check">
                                <input className="form-check-input"
                                    onChange={showEvenkHandler} type="checkbox" id="flexCheckDefault" />
                                <label className="form-check-label" for="flexCheckDefault">
                                    Show Only Even
                                </label>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope="col">Country Name</th>
                                        <th scope="col">Contact Number</th>
                                    </tr>
                                </thead>
                                <tbody style={{ height: '500px' }}>
                                    {contacts?.map(contact => <tr
                                        key={contact.id}>
                                        <td className='pe-5'>{contact.id}</td>
                                        <td className='pe-5'>{contact.country.name}</td>
                                        <td>{contact.phone}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <button className='btn btn-outline-primary mx-3' onClick={closeModal}>close</button>
                        {
                            showAllContact ? <button onClick={() => openModal("us")} className='btn btn-outline-primary'>US Contact</button>
                                : <button onClick={() => openModal("all")} className='btn btn-outline-primary'>All Contact</button>

                        }

                    </Modal>
                </div>

            </div>
        </div>
    );
};

export default Problem2;