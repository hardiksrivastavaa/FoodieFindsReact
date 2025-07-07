import Developer from "./Developer";

const ContactUs = () => {
  return (
    <div className="container py-5 d-flex flex-column align-items-center text-center">
      <h1 className="text-danger mb-4">Contact Us</h1>
      <p className="lead text-muted" style={{ maxWidth: "600px" }}>
        Have questions, feedback, or just want to say hi? We're here to help you
        discover the best places to eat!
      </p>
      <a
        href="mailto:hardikfgp@gmail.com"
        className="btn btn-outline-danger mt-2 mb-2"
      >
        Drop us an Email
      </a>

      <Developer />
    </div>
  );
};

export default ContactUs;
