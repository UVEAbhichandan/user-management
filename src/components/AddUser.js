import { useState } from "react";
import UserTable from "./UserTable";


export default function AddUser(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        weekDay: [],
        gender: '',
        DOB: ''
      });
    const [users, setUsers] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
   
    const handleRadioChange = (value) => {
        setSelectedOption(value);
        setFormData({ ...formData, gender: value });
      };


   
    const weekDays = [
        {
            value: 'Sunday',
            label: 'Sunday'
        },
        {
            value: 'Monday',
            label: 'Monday'
        },
        {
            value: 'Tuesday',
            label: 'Tuesday'
        },
        {
            value: 'Wednesday',
            label: 'Wednesday'
        },
        {
            value: 'Thursday',
            label: 'Thursday'
        },
        {
            value: 'Friday',
            label: 'Friday'
        },
        {
            value: 'Saturday',
            label: 'Saturday'
        }];


    const [checkedItems, setCheckedItems] = useState(() => {
        const initialCheckedState = {};
        weekDays.forEach((option) => {
          initialCheckedState[option.value] = false;
        });
        return initialCheckedState;
      });


      const handleCheckboxChange = (value) => {
        const newCheckedState = { ...checkedItems, [value]: !checkedItems[value] };
        setCheckedItems(newCheckedState);
        setFormData({ ...formData, weekDay: Object.keys(newCheckedState).filter((key) => newCheckedState[key]) });
      };
   
   
      const handleClick = async(e) =>{
        e.preventDefault();
        validatePhoneNumber(formData.contact)
        // Validate name
        if (!formData.name.trim()) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            name: 'Name is required'
        }));
        }


        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Invalid email format'
        }));
        }


        if(!formData.weekDays){
            setErrors((prevErrors) => ({
                ...prevErrors,
                weekDays: 'Please Select atleast one week'
            }));
        }


        if(!formData.gender.length){
            setErrors((prevErrors) => ({
                ...prevErrors,
                gender: 'Please Select Gender'
            }));
        }


        if(!formData.DOB.length){
            setErrors((prevErrors) => ({
                ...prevErrors,
                DOB: 'Please Select DOB'
            }));
        }
        if (Object.values(errors).every((error) => !error)) {
            const user = users.length ? [...users] : [];
            user.push(formData)
            setUsers(user)
            setFormData({
                name: '',
                email: '',
                contact: '',
                weekDay: [],
                gender: '',
                DOB: ''
              })
        }
      }
      const [errors, setErrors] = useState({});
   
      const gender = [
        {value: 'Male', label: 'Male'},
        {value: 'Female', label: 'Female'}
      ]
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };


      const validatePhoneNumber = (value) => {
        const regex = /^\d{9}$/; // Validation rule: exactly 9 digits
   
        if (!value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                contact: 'Phone number is required'
            }));
        } else if (!regex.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                contact: 'Phone number must be exactly 9 digits'
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                contact: ''
            }));
        }
      };
      return (
        <>
        <div className="form-container">
          <h2>User Form</h2>
          <form>
            <div className="form-group">
              <label htmlFor="itemType">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            {errors.name && <div className="error-message">{errors.name}</div>}
            </div>


            <div className="form-group">
              <label htmlFor="itemType">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
   
            <div className="form-group">
              <label htmlFor="contact">Contact Number:</label>
              <input
                type="number"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
        {errors.contact && <div className="error-message">{errors.contact}</div>}
            </div>


            <div className="form-group">
              <label htmlFor="bId">Select Week Days:</label>
              {weekDays.map((option) => (
                <label key={option.value} className="checkbox-container">
                <input
                    type="checkbox"
                    checked={checkedItems[option.value]}
                    onChange={() => handleCheckboxChange(option.value)}
                />
                <span className="checkmark"></span>
                {option.label}
                </label>
                ))}
                        {errors.weekDays && <div className="error-message">{errors.weekDays}</div>}
            </div>


            <div className="form-group">
              <label htmlFor="cId">Select Gender:</label>
              {gender.map((option) => (
                <label key={option.value} className="radio-container">
                <input
                    type="radio"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={() => handleRadioChange(option.value)}
                />
                <span className="radio-checkmark"></span>
                {option.label}
                </label>
            ))}
                    {errors.gender && <div className="error-message">{errors.gender}</div>}


            </div>


            <div className="form-group">
              <label htmlFor="DOB">Date of Birth:</label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
              />
                      {errors.DOB && <div className="error-message">{errors.DOB}</div>}


            </div>
          </form>
          <button onClick={handleClick} type="submit">Submit</button>


        </div>
        {!!users.length &&
            <UserTable users={users} setUsers={setUsers}/>}
        </>
      );
}
