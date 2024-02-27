import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRegData, updateProfile } from '../redux/action';

const UpdateProfile = (props) => {
  const [formData, setFormData] = useState({
    image: '',
    username: '',
    gender: '',
    phoneNo: '',
  });
  const [formErrors, setFormErrors] = useState({
    phoneNo: '',
    image: '',
    username: '',
    gender: '',
  });

  const get_Reg_Data = useSelector((state) => state.regData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegData());
  }, []);

  useEffect(() => {
    if (FilterRegData) {
      setFormData({
        image: FilterRegData?.imageurl,
        username: FilterRegData?.username,
        gender: FilterRegData?.gender,
        phoneNo: FilterRegData?.phonenumber,
      });
    }
  }, [get_Reg_Data]);

  const getUserId = localStorage.getItem('userID');
  const FilterRegData = get_Reg_Data.find((item) => item.userid === getUserId);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: '', // Clear previous error when user starts typing
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    const requiredFields = ['image', 'username', 'gender', 'phoneNo'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());

    if (emptyFields.length > 0) {
      requiredFields.forEach(field => {
        setFormErrors({
          ...formErrors,
          [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
        });
      });
      return;
    }

    // Check if any field is changed
    const isFormChanged =
      formData.image !== FilterRegData.imageurl ||
      formData.username !== FilterRegData.username ||
      formData.gender !== FilterRegData.gender ||
      formData.phoneNo !== FilterRegData.phonenumber;

    if (!isFormChanged) {
      alert('No changes made. Please update at least one field.');
      return;
    }

    // Perform validation for phone number
    const phoneRegex = /^[0-9]*$/;
    if (!phoneRegex.test(formData.phoneNo.trim())) {
      setFormErrors({ ...formErrors, phoneNo: 'Only numbers are allowed in the phone number' });
      return;
    }

    // Perform validation for image URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(formData.image.trim())) {
      setFormErrors({ ...formErrors, image: 'Enter a valid URL' });
      return;
    }

    // If all validations pass, update the profile
    const data = {
      userid: FilterRegData.userid,
      username: formData.username,
      password: FilterRegData.password,
      firstname: FilterRegData.firstname,
      email: FilterRegData.email,
      gender: formData.gender,
      phonenumber: formData.phoneNo,
      imageurl: formData.image,
      type:'admin'
    };
    dispatch(updateProfile(data, props));
  };

  return (
    <div className='d-flex justify-content-center my-3'>
      <form
        onSubmit={handleSubmit}
        className='p-4'
        style={{
          backgroundColor: '#F5F5F5',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
          width: '50%',
        }}
      >
        <h4 className='text-center'>Update Profile</h4>

        <div className='mb-3'>
          <label htmlFor='formImage' className='form-label'>
            Profile Image URL
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter image URL'
            name='image'
            value={formData.image}
            onChange={handleChange}
          />
          <div className='text-danger'>{formErrors.image}</div>
        </div>

        <div className='mb-3'>
          <label htmlFor='formUsername' className='form-label'>
            Username
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter username'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
          <div className='text-danger'>{formErrors.username}</div>
        </div>

        <div className='mb-3'>
          <label htmlFor='formGender' className='form-label'>
            Gender
          </label>
          <div className='d-flex'>
            <label className='me-3'>
              <input
                type='radio'
                name='gender'
                value='male'
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label className='me-3'>
              <input
                type='radio'
                name='gender'
                value='female'
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type='radio'
                name='gender'
                value='other'
                checked={formData.gender === 'other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
          <div className='text-danger'>{formErrors.gender}</div>
        </div>

        <div className='mb-3'>
          <label htmlFor='formPhone' className='form-label text-center'>
            Phone Number
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter phone number'
            name='phoneNo'
            value={formData.phoneNo}
            onChange={handleChange}
          />
          <div className='text-danger'>{formErrors.phoneNo}</div>
        </div>
        <div className='d-flex justify-content-center'>
          <button type='submit' className='btn btn-primary'>
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
