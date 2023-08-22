import { useState } from "react";
import Contact from "./component/Contact";
import ContactAdder from "./component/contactAdder";
import "./styles/app.css";
import Navbar from "./component/navbar";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const App = () => {
  const getContact = JSON.parse(localStorage.getItem("contact"));
  const [contact, setcontact] = useState(getContact ? getContact : []);

  const addContactdata = (contactdata) => {
    const allContact = [contactdata, ...contact];
    setcontact(allContact);
    localStorage.setItem("contact", JSON.stringify(allContact));
  };

  const cleardata = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setcontact([]);
            localStorage.clear();
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No")
        },
      ],
    });
    // };
  };

  const childFunctionHandler = () => {
    alert("Grand Parents was Called");
  };
  return (
    <>
      <Navbar />
      <div className="contact_adder">
        <ContactAdder
          onContactAdded={addContactdata}
          childfunction={childFunctionHandler}
        />
      </div>
      <hr />
      <div className="contact_list">
        Contact List
        <hr />
        {/* <Contact data={contact[0]} />
        <Contact data={contact[1]} />
        <Contact data={contact[2]} /> */}
        {contact.map((data) => (
          <Contact key={data.id} data={data}></Contact>
        ))}
      </div>
      <button type="button" onClick={cleardata}>
        Clear All Contact
      </button>
    </>
  );
};

export default App;
