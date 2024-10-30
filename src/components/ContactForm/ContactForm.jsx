import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

const FeedbackSchema = Yup.object().shape({
  contactName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phoneNumber: Yup.string()
    .min(7, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
});

const intialValues = {
  contactName: '',
  phoneNumber: '',
};

const ContactForm = () => {
  const nameFieldId = useId();
  const phoneNumFieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.contactName,
        number: values.phoneNumber,
      })
    );

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={intialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ errors, touched }) => (
        <Form className={css.contactForm}>
          <div>
            <label htmlFor={nameFieldId}>Name</label>
            <Field
              className={
                errors.contactName && touched.contactName ? css.errorInput : ''
              }
              type="text"
              name="contactName"
              id={nameFieldId}
            />
            <ErrorMessage
              className={css.errorMsg}
              name="contactName"
              component="span"
            />
          </div>
          <div>
            <label htmlFor={phoneNumFieldId}>Phone Number</label>
            <Field
              className={
                errors.phoneNumber && touched.phoneNumber ? css.errorInput : ''
              }
              type="tel"
              name="phoneNumber"
              id={phoneNumFieldId}
            />
            <ErrorMessage
              className={css.errorMsg}
              name="phoneNumber"
              component="span"
            />
          </div>
          <button type="submit" disabled={Object.keys(errors).length > 0}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
