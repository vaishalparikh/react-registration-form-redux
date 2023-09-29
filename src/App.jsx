import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import Schema from "./Schema/Index";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "./redux/slices/registrationSlice";
import Table from "react-bootstrap/Table";

function Example() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const [data, setData] = useState({});
  console.log(data);

  const Registration = useSelector((state) => state.registration);

  // console.log(Registration);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formName, setFormName] = useState();
  const [buttonName, setButtonName] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [hobbie, setHobbie] = useState("");
  const [profile, setProfile] = useState("");
  const [gender, setGender] = useState("");
  const [id, setId] = useState("");

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <div>
          <h4 style={{ textAlign: "center", color: "InfoText" }}>
            Add UserData
          </h4>
        </div>
        <Button
          variant="primary"
          style={{ marginLeft: "500px", marginRight: "500px" }}
          onClick={() => {
            setFormName("Registration Form");
            setButtonName("Submit");
            handleShow();
            setName("");
            setEmail("");
            setDate("");
            setPhone("");
            setCountry("");
            setHobbie("");
            setProfile("");
            setGender("");
            setId("");
          }}
        >
          Add User Data
        </Button>
        <div>
          <h4 style={{ textAlign: "center", color: "InfoText" }}>
            All UserData
          </h4>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Hobbies</th>
              <th>Profile</th>
              <th>Gender</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Registration.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.date}</td>
                <td>{item.phone}</td>
                <td>{item.country}</td>
                <td>{item.hobbie.join(', ')}</td>
                <td>{item.profile}</td>
                <td>{item.gender}</td>
                <td>
                  <Button
                    onClick={() => {
                      setData(item);
                      handleShow();
                      setFormName("Edit Form");
                      setButtonName("Save Changes");
                      console.log(item);
                      setName(item.name);
                      setEmail(item.email);
                      setDate(item.date);
                      setPhone(item.phone);
                      setCountry(item.country);
                      setHobbie(item.hobbie);
                      setProfile(item.profile);
                      setGender(item.gender);
                      setId(item.id);
                    }}
                    variant="primary"
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this user?"
                        )
                      ) {
                        dispatch(deleteUser(item.id));
                        console.log(item.id);
                      } else {
                        return false;
                      }
                    }}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: name,
              email: email,
              date: date,
              phone: phone,
              country: country,
              hobbie: hobbie,
              profile: profile,
              gender: gender,
            }}
            validateOnChange={true}
            validationSchema={Schema}
            onSubmit={(values, actions) => {
              dispatch(addUser({ ...values, id: Math.random() }));
              actions.setSubmitting(false);
              console.log(values);
            }}
          >
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              isSubmitting,
              errors,
              touched,
              dirty,
              isValid,
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  className="form-row"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div className="form-group col-md-6 form-control">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Please Enter Your Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && <p>{errors.name}</p>}
                  </div>

                  <div className="form-group col-md-6 form-control">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Please Enter Your Email Id"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && <p>{errors.email}</p>}
                  </div>

                  <div className="form-group col-md-6 form-control">
                    <label htmlFor="date">Date Of Birth</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.date && touched.date && <p>{errors.date}</p>}
                  </div>

                  <div className="form-group col-md-6 form-control">
                    <label htmlFor="phone">Mobile Number</label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Please Enter Your Mobile Number"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phone && touched.phone && <p>{errors.phone}</p>}
                  </div>
                </div>
                <div className="form-group col-md-4 form-control">
                  <label htmlFor="country"> Country</label>
                  <select
                    id="country"
                    name="country"
                    className="form-control"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option selected>Choose Country...</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Åland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">
                      Antigua and Barbuda
                    </option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">
                      Bosnia and Herzegovina
                    </option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">
                      British Indian Ocean Territory
                    </option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">
                      Central African Republic
                    </option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">
                      Cocos (Keeling) Islands
                    </option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, The Democratic Republic of The">
                      Congo, The Democratic Republic of The
                    </option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote">Cote</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">
                      Dominican Republic
                    </option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">
                      Falkland Islands (Malvinas)
                    </option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">
                      French Southern Territories
                    </option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">
                      Heard Island and Mcdonald Islands
                    </option>
                    <option value="Holy See (Vatican City State)">
                      Holy See (Vatican City State)
                    </option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">
                      Iran, Islamic Republic of
                    </option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea">Korea</option>
                    <option value="Korea, Republic of">
                      Korea, Republic of
                    </option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao">Lao</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">
                      Libyan Arab Jamahiriya
                    </option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, The Former Yugoslav Republic of">
                      Macedonia, The Former Yugoslav Republic of
                    </option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">
                      Micronesia, Federated States of
                    </option>
                    <option value="Moldova, Republic of">
                      Moldova, Republic of
                    </option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">
                      Netherlands Antilles
                    </option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">
                      Northern Mariana Islands
                    </option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">
                      Palestinian Territory, Occupied
                    </option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">
                      Russian Federation
                    </option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">
                      Saint Kitts and Nevis
                    </option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">
                      Saint Pierre and Miquelon
                    </option>
                    <option value="Saint Vincent and The Grenadines">
                      Saint Vincent and The Grenadines
                    </option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">
                      Sao Tome and Principe
                    </option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">
                      South Georgia and The South Sandwich Islands
                    </option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">
                      Svalbard and Jan Mayen
                    </option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">
                      Syrian Arab Republic
                    </option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">
                      Tanzania, United Republic of
                    </option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-leste">Timor-leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">
                      Trinidad and Tobago
                    </option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">
                      Turks and Caicos Islands
                    </option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">
                      United States Minor Outlying Islands
                    </option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands, British">
                      Virgin Islands, British
                    </option>
                    <option value="Virgin Islands, U.S.">
                      Virgin Islands, U.S.
                    </option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                  {errors.country && touched.country && <p>{errors.country}</p>}
                </div>

                <div
                  className="form-check form-group col-md-6 form-switch form-control"
                  style={{ marginRight: "10px", display: "flex" }}
                >
                  <div style={{ marginLeft: "12px" }}>
                    <input
                      className=" form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Active Status
                    </label>
                  </div>
                </div>

                <div className="form-group col-md-6 form-control">
                  <div>
                    <label>Select Your Hobbies</label>
                  </div>
                  <div
                    className="d-flex gap-2"
                    value={values.hobbie}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="cricket"
                      id="hobbie"
                      name="hobbie"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.hobbie.includes("cricket")}
                    />
                    <label
                      value="cricket"
                      className="form-check-label"
                      htmlFor="hobbie"
                    >
                      Cricket
                    </label>

                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="basketball"
                      id="hobbie"
                      name="hobbie"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.hobbie.includes("basketball")}
                    />
                    <label className="form-check-label" htmlFor="hobbie">
                      Basketball
                    </label>

                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="chess"
                      id="hobbie"
                      name="hobbie"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.hobbie.includes("chess")}
                    />
                    <label className="form-check-label" htmlFor="chess">
                      Chess
                    </label>
                  </div>
                  {errors.hobbie && touched.hobbie && <p>{errors.hobbie}</p>}
                </div>

                <div
                  className="form-row"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div className="form-group col-md-6 form-control">
                    <label htmlFor="profile">Your Resume URL</label>
                    <input
                      placeholder="Paste Your Resume URL"
                      type="text"
                      className="form-control"
                      id="profile"
                      value={values.profile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.profile && touched.profile && (
                      <p>{errors.profile}</p>
                    )}
                  </div>

                  <div
                    className="form-group col-md-6 form-control"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <div>
                      <label>Select Your Gender</label>
                    </div>

                    <div className="d-flex gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="gender"
                        value="Male"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.gender === "Male"}
                      />
                      <label className="form-check-label" htmlFor="gender">
                        Male
                      </label>

                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="gender"
                        value="Female"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.gender === "Female"}
                      />
                      <label className="form-check-label" htmlFor="gender">
                        Female
                      </label>
                    </div>
                    {errors.gender && touched.gender && <p>{errors.gender}</p>}
                  </div>
                </div>
                <button
                  disabled={!dirty || !isValid}
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    handleClose();
                    dispatch(deleteUser(id));
                  }}
                >
                  {isSubmitting ? "Please Wait..." : buttonName}
                </button>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
