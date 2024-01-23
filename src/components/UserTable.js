import { useState } from "react";


export default function UserTable({users,setUsers}){
    const [editingIndex, setEditingIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      contact: '',
      weekDay: [],
      gender: '',
      DOB: '',
    });
 
    const handleEdit = (index) => {
        const userToEdit = users[index];
        setFormData({
          name: userToEdit.name,
          email: userToEdit.email,
          contact: userToEdit.contact,
          weekDay: userToEdit.weekDay,
          gender: userToEdit.gender,
          DOB: userToEdit.DOB,
        });
        setEditingIndex(index);
        setShowModal(true);
      };
   
 
      const handleDelete = (index) => {
        // Remove the user from the array
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        // Save the updated array in the state
        setUsers(updatedUsers)
        setEditingIndex(null);
        setShowModal(false);
      };
 
    const handleSave = () => {
        // Implement save logic here
        // For simplicity, let's just log the editing index and form data for now
        console.log(`Saving changes for user at index ${editingIndex}`);
        console.log(formData);
   
        // Update the users state with the edited user
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = { ...formData };
        setEditingIndex(null);
        setShowModal(false);
        setUsers(updatedUsers)
      };
   
 
      const handleCancel = () => {
        setEditingIndex(null);
        setShowModal(false);
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
   
      const handleWeekdayChange = (e) => {
        const selectedWeekdays = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prevFormData) => ({
          ...prevFormData,
          weekDay: selectedWeekdays,
        }));
      };
   
 
    return (
        <>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Week Days</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{user.weekDay.join(', ')}</td>
              <td>{user.gender}</td>
              <td>{user.DOB}</td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            {showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={handleCancel}>&times;</span>
                    <h2>Edit User</h2>
                    <form>
                      <label>Name:</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
       
                      <label>Email:</label>
                      <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
       
                      <label>Contact:</label>
                      <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
       
                      <label>Week Days:</label>
                      <select multiple name="weekDay" value={formData.weekDay} onChange={handleWeekdayChange}>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                      </select>
       
                      <label>Gender:</label>
                      <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
       
                      <label>DOB:</label>
                      <input type="text" name="DOB" value={formData.DOB} onChange={handleInputChange} />
       
                      <div className="button-group">
                        <button type="button" onClick={handleSave}>Save</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
</>        
    );
 
}
