import React, { useRef } from 'react';
import styles, { stylesGlobal } from '$root/components/contact/styles';

import Router from 'next/router';
import withReactContent from 'sweetalert2-react-content';

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

export default function Contact(props) {
  const MySwal = withReactContent(Swal);
  let formName = useRef(null),
    formEmail = useRef(null),
    formSubject = useRef(null),
    formMessage = useRef(null);

  async function handleForm(event) {
    event.preventDefault();
    MySwal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are going to send this message to the administrator.',
      width: '550px',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(async result => {
      if (result.value) {
        try {
          const url = '/contact';
          const formFields = {
            name: formName.current.value,
            email: formEmail.current.value,
            subject: formSubject.current.value,
            message: formMessage.current.value
          };
          await axios.post(url, formFields);
          MySwal.fire({
            icon: 'success',
            title: 'Message sent!',
            text: 'Your message has been sent to the administrator.',
            width: '550px',
            onClose: function () {
              Router.push('/');
            }
          });
        } catch (err) {
          MySwal.fire({
            icon: 'error',
            title: 'Message not sent!',
            text: 'Your message could not be sent to the administrator.',
            width: '550px'
          });
        }
      }
    });
  }

  return (
    <div className="main-container">
      <Form onSubmit={handleForm} className="form">
        <div className="name-email">
          <Form.Group className="form-group form-group-name-email">
            <Form.Label className="form-label">Full name *</Form.Label>
            <Form.Control type="text" ref={formName} className="form-control" />
          </Form.Group>
          <Form.Group className="form-group form-group-name-email">
            <Form.Label className="form-label">Email address *</Form.Label>
            <Form.Control type="email" ref={formEmail} className="form-control" />
          </Form.Group>
        </div>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Subject *</Form.Label>
          <Form.Control type="text" ref={formSubject} className="form-control" />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Message *</Form.Label>
          <Form.Control as="textarea" rows="15" ref={formMessage} className="form-control" />
        </Form.Group>
        <div className="button-send">
          <button type="submit" className="button">
            SEND MESSAGE
          </button>
        </div>
      </Form>
      <style jsx>{styles}</style>
      <style jsx global>
        {stylesGlobal}
      </style>
    </div>
  );
}
