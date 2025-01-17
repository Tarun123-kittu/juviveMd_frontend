import React, { useEffect, useState } from 'react'
import DefaultImage from '../../Images/default_user.svg'
import './settings.css'
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { change_password, clear_change_password_api_state } from '../../redux/slices/authSlice/changePassword';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
import { get_single_staff, clear_single_staff_state } from '../../redux/slices/staffSlice/getStaffByIdSlice';
import { update_staff, clear_update_staff_state } from '../../redux/slices/staffSlice/updateStaffSlice';
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { getRoutePermissions } from '../../middleware/permissionsMiddleware/getRoutePermissions';
import { permission_constants } from '../../constants/permissionConstants';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SettingsComponents = () => {
  const dispatch = useDispatch()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [currentPasswordError, setCurrentPasswordError] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [phone, setPhone] = useState('')
  const [hasImage, setHasImage] = useState(false)
  const [imageView, setImageView] = useState("")
  const [editInput, setEditInput] = useState(true)
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [data, setData] = useState({
    profilePic: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    email: "",
    address: "",
    roleId: "",
    countryCode: ""
  })


  const is_Password_changed = useSelector((store) => store.CHANGE_PASSWORD)
  const user_details = useSelector((store) => store.STAFF_DETAIL)
  const is_staff_updated = useSelector((store) => store.UPDATE_STAFF)
  const [firstPermissionSettings] = getRoutePermissions(permission_constants?.SETTINGS);

  useEffect(() => {
    dispatch(get_single_staff({ staffId: localStorage.getItem('user_id') }))
  }, [])

  useEffect(() => {
    if (user_details?.isSuccess) {
      setImageView('')
      setData({
        image: user_details?.data?.data?.image,
        firstName: user_details?.data?.data?.firstName,
        lastName: user_details?.data?.data?.lastName,
        phone: user_details?.data?.data?.phone,
        gender: user_details?.data?.data?.gender,
        email: user_details?.data?.data?.email,
        address: user_details?.data?.data?.address,
        roleId: user_details?.data?.data?.roleId,
        hasImage: false,
        countryCode: user_details?.data?.data?.countryCode
      })
      setPhone(user_details?.data?.data?.countryCode + user_details?.data?.data?.phone)
      setImageView(user_details?.data?.data?.image)

    }
  }, [user_details])


  const handleChangePassword = (e) => {
    e.preventDefault()

    if (!currentPassword && !newPassword && !confirmPassword) {
      setCurrentPasswordError("Please enter your current password")
      setNewPasswordError("Please enter your new password")
      setConfirmPasswordError("Please enter the confirm password")
      return
    }
    if (!currentPassword) {
      setCurrentPasswordError("Please enter your current password")
      return
    }
    if (!newPassword) {
      setNewPasswordError("Please enter your new password")
      return
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please enter the confirm password")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password are not matched")
      return
    }
    dispatch(change_password({ currentPassword, newPassword, confirmNewPassword: confirmPassword }))
  }

  useEffect(() => {
    if (is_Password_changed?.isSuccess) {
      toast.success("Your password changes successfully !!")
      dispatch(clear_change_password_api_state())
      setConfirmPassword('')
      setNewPassword('')
      setCurrentPassword('')
      setConfirmPasswordError('')
      setCurrentPasswordError('')
      setNewPasswordError('')
    }
    if (is_Password_changed?.isError) {
      toast.error(is_Password_changed.error.message)
      dispatch(clear_change_password_api_state())
    }
  }, [is_Password_changed])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setHasImage(true)
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      if (!fileType.includes("image/png") && !fileType.includes("image/jpeg")) {
        toast.error("Only PNG and JPG images are allowed.");
        setProfileImage("")
        setImageView(user_details?.data?.data?.image)
        return;
      }
      if (fileSize > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB.");
        setProfileImage("")
        setImageView(user_details?.data?.data?.image)
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file)
        setData({ ...data, image: file })
        setImageView(reader.result)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = (e) => {
    if (!data.firstName) {
      setFirstNameError("Please enter firstname")
      return
    }
    if (!data.lastName) {
      setLastNameError("Please enter lastname")
      return
    }
    if (!data.phone) {
      setPhoneError("Please enter phone number")
      return
    }
    if (!data.email) {
      setEmailError("Please enter your email")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    if (data?.firstName === user_details?.data?.data?.firstName && data?.lastName === user_details?.data?.data?.lastName && data?.image === user_details?.data?.data?.image && data?.email === user_details?.data?.data?.email && data?.phone === user_details?.data?.data?.phone) return
    dispatch(update_staff({ data: { ...data, hasImage }, id: localStorage.getItem('user_id') }));
  }

  const handleValidatePhone = (phone) => {
    const parsedPhone = parsePhoneNumberFromString(phone);

    if (parsedPhone) {
      setData({
        ...data,
        countryCode: parsedPhone.countryCallingCode,
        phone: parsedPhone.nationalNumber
      });
    }
  };

  useEffect(() => {
    if (is_staff_updated?.isSuccess) {
      toast.success("Profile Updated Successfully")
      setImageView('')
      dispatch(clear_single_staff_state())
      dispatch(clear_update_staff_state())
      dispatch(get_single_staff({ staffId: localStorage.getItem('user_id') }))
      setEditInput(true)
    }
    if (is_staff_updated?.isError) {
      toast.error(is_staff_updated?.error?.message)
      dispatch(clear_update_staff_state())
    }
  }, [is_staff_updated])

  const handleEdit = () => {
    setEditInput(!editInput)
    setData({
      image: user_details?.data?.data?.image,
      firstName: user_details?.data?.data?.firstName,
      lastName: user_details?.data?.data?.lastName,
      phone: user_details?.data?.data?.phone,
      gender: user_details?.data?.data?.gender,
      email: user_details?.data?.data?.email,
      address: user_details?.data?.data?.address,
      roleId: user_details?.data?.data?.roleId,
      hasImage: false,
      countryCode: user_details?.data?.data?.countryCode
    })
    setPhone(user_details?.data?.data?.countryCode + user_details?.data?.data?.phone)
    setImageView(user_details?.data?.data?.image)
  }


  return (
    <div>
      <div className="cmn_head d-flex align-items-center mb-3 position-relative gap-3">
        <h2 className="flex-grow-1">Patient List</h2>
      </div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <div className='d-flex setting_wrapper'>
          <div className='border-end setting_pills'>
            <Nav variant="pills" className="flex-column settings_tabs">
              <Nav.Item>
                <Nav.Link eventKey="first">
                  <svg className='me-2' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.83965 0.0982761C8.71552 0.196552 8.71552 0.212069 8.68966 1.42241L8.66379 2.6431L8.19828 2.84483L7.73276 3.04138L6.90517 2.21897C6.26897 1.58793 6.03621 1.39138 5.9069 1.36552C5.73103 1.32931 5.71034 1.35 3.53793 3.52241C1.65 5.41035 1.34483 5.73621 1.34483 5.86552C1.34483 5.99483 1.48448 6.16035 2.1931 6.87414L3.03621 7.73276L2.82931 8.20862L2.62241 8.68966H1.49483C0.294828 8.68966 0.155172 8.71552 0.0568966 8.93276C0.0155172 9.02069 0 9.96724 0 12.0466C0 14.9172 0.00517241 15.0466 0.0982759 15.1603C0.196552 15.2845 0.212069 15.2845 1.42241 15.3103L2.6431 15.3362L2.84483 15.8017L3.04138 16.2672L2.21897 17.0948C1.58793 17.731 1.39138 17.9638 1.36552 18.0931C1.32931 18.269 1.35 18.2897 3.52241 20.4621C5.41034 22.35 5.73621 22.6552 5.86552 22.6552C5.99483 22.6552 6.16034 22.5155 6.87414 21.8069L7.73276 20.9638L8.21379 21.1707L8.68966 21.3724V22.5052C8.68966 23.7052 8.71552 23.8448 8.93276 23.9431C9.02069 23.9845 9.96724 24 12.0569 24H15.0569L15.181 23.8707L15.3103 23.7466V22.5621V21.3776L15.7914 21.1707L16.2672 20.9638L17.0948 21.781C17.731 22.4121 17.9638 22.6086 18.0931 22.6345C18.269 22.6707 18.2897 22.65 20.4621 20.4776C22.35 18.5897 22.6552 18.2638 22.6552 18.1345C22.6552 18.0052 22.5155 17.8397 21.8069 17.1259L20.9638 16.2672L21.1707 15.7862L21.3776 15.3103H22.5052C23.7052 15.3103 23.8448 15.2845 23.9431 15.0672C23.9845 14.9793 24 14.0328 24 11.9534C24 9.08276 23.9948 8.95345 23.9017 8.83965C23.8034 8.71552 23.7879 8.71552 22.5776 8.68966L21.3569 8.66379L21.1552 8.1931L20.9586 7.71724L21.7345 6.95173C22.5362 6.15 22.681 5.95862 22.6345 5.77241C22.619 5.71552 21.6362 4.69138 20.4466 3.50172C18.5897 1.65 18.2586 1.34483 18.1293 1.34483C18.0052 1.34483 17.8345 1.48965 17.1259 2.18793L16.2672 3.03621L15.7914 2.82931L15.3103 2.62241V1.49483C15.3103 0.294828 15.2845 0.155172 15.0672 0.0568962C14.9793 0.0155182 14.0328 0 11.9534 0C9.08276 0 8.95345 0.00517273 8.83965 0.0982761ZM14.8293 6.46552C17.2707 7.06552 17.5707 7.14828 17.6793 7.26724L17.7931 7.40172V9.68793C17.7931 12.0155 17.7621 12.5328 17.5862 13.3862C17.0793 15.8017 15.4448 18.031 13.2569 19.2828C12.781 19.5569 12.1086 19.8621 11.9897 19.8621C11.8552 19.8621 10.681 19.2517 10.231 18.9466C8.41035 17.7259 7.04483 15.8017 6.49138 13.681C6.24828 12.7293 6.2069 12.1862 6.2069 9.69828V7.40172L6.32586 7.26724C6.42931 7.15345 6.73966 7.06034 9.12931 6.47069C10.6086 6.10345 11.881 5.80345 11.9586 5.79827C12.0362 5.7931 13.3293 6.0931 14.8293 6.46552Z" fill="black" />
                    <path d="M11.4568 7.90766C10.3861 8.14042 9.58439 8.86456 9.22749 9.93007C9.15508 10.137 9.12922 10.3646 9.12922 10.7577C9.12922 11.5956 9.39301 12.2318 9.97232 12.8111C10.1585 12.9921 10.2982 13.1473 10.2878 13.1525C10.2775 13.1577 10.112 13.2404 9.9206 13.3387C9.23266 13.6801 8.52922 14.3215 8.13611 14.9628L7.95508 15.2577L8.13611 15.5835C8.56542 16.3439 9.5068 17.3887 10.3085 17.9939C10.6913 18.2783 11.5189 18.7852 11.8189 18.9094C12.0051 18.987 12.0103 18.9818 12.5068 18.7232C13.6758 18.1128 14.8654 17.0525 15.5585 16.0128C15.7654 15.7077 15.9465 15.4025 15.962 15.3301C16.0396 15.0197 15.0051 13.8715 14.2447 13.4266C14.0223 13.2973 13.8103 13.1887 13.774 13.1887C13.6654 13.1887 13.6861 13.1577 14.0327 12.8111C14.612 12.2215 14.8706 11.5904 14.8706 10.7577C14.8706 10.3646 14.8447 10.137 14.7723 9.93007C14.3585 8.69904 13.3706 7.93352 12.1292 7.88697C11.8758 7.87662 11.5706 7.88697 11.4568 7.90766Z" fill="black" />
                  </svg>

                  Account</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="second"><svg className='me-2' width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.58861 0.0715656C9.49953 0.109076 9.36355 0.198162 9.29322 0.268496C9.03533 0.512312 9.00251 0.620157 8.97907 1.37506L8.95562 2.07369L8.52425 2.15808C7.69902 2.32688 6.80346 2.70668 6.02512 3.22244C5.47653 3.58817 4.53408 4.53531 4.15428 5.10266C3.65727 5.85287 3.30092 6.68748 3.10399 7.56897C3.02428 7.94408 3.01022 8.23947 2.97739 10.2416C2.93988 12.7267 2.91644 12.9845 2.62573 13.8567C2.26938 14.9351 1.73486 15.7744 0.853363 16.6559C0.0843986 17.4155 0 17.5796 0 18.2595C0 18.6768 0.0140664 18.7565 0.126598 18.9909C0.375105 19.4926 0.86743 19.863 1.4254 19.9709C1.78644 20.0365 18.1504 20.0365 18.5255 19.9662C19.06 19.8677 19.5523 19.4926 19.8008 18.9909C19.9134 18.7565 19.9274 18.6768 19.9274 18.2595C19.9274 17.5843 19.8337 17.4061 19.1163 16.6981C18.5067 16.0979 18.2348 15.7556 17.9066 15.2024C17.4939 14.5131 17.2173 13.7582 17.0673 12.9377C16.9969 12.5766 16.9782 12.0749 16.95 10.2416C16.9219 8.23478 16.9078 7.94408 16.8234 7.56897C16.5093 6.17171 15.9138 5.09797 14.8917 4.07112C13.8789 3.06303 12.7207 2.42535 11.4032 2.15808L10.9718 2.07369L10.9484 1.37506C10.9249 0.620157 10.8921 0.512312 10.6342 0.268496C10.3623 0.00592232 9.92621 -0.0737877 9.58861 0.0715656Z" fill="black" />
                  <path d="M6.30664 21.0731C6.30664 21.2278 6.59735 21.9264 6.79428 22.2406C7.60075 23.5253 9.16681 24.2193 10.6297 23.9379C11.6566 23.741 12.5146 23.169 13.096 22.2922C13.3023 21.9827 13.6165 21.2606 13.6212 21.0824C13.6212 21.0074 13.4149 21.0027 9.96391 21.0027C6.77552 21.0027 6.30664 21.0121 6.30664 21.0731Z" fill="black" />
                </svg>
                  Notification</Nav.Link>
              </Nav.Item> */}
            </Nav>
          </div>

          <Tab.Content className='settings_content flex-grow-1 '>
            <Tab.Pane eventKey="first">
              <div className=''>
                <div className='settings_head border-bottom mb-3'>
                  <h3>Account</h3>
                  <p>Update your personal details and account information.</p>
                </div>
                <h4>My Profile</h4>
                <div className='user_profile d-flex align-items-center gap-3'>
                  {user_details?.isLoading ? (
                    <Skeleton
                      width={55}
                      height={50}
                      style={{ borderRadius: '50px' }}
                    />
                  ) : (
                    <img
                      key={imageView || DefaultImage}
                      src={imageView || DefaultImage}
                      alt="profile"
                      className="round_image_user"
                    />
                  )}
                  <div className='position-relative'><input type="file" disabled={editInput} onChange={handleFileChange} className='opacity-0 position-absolute w-100 h-100 start-0 end-0 top-0 bottom-0' />
                    {!editInput && firstPermissionSettings?.canUpdate && <button className='cmn_btn' disabled={editInput}> Upload Photo</button>}
                  </div> <button className='delete_photo d-none'>Delete</button>
                  {firstPermissionSettings?.canUpdate && <button className='edit_button cmn_btn ms-auto' onClick={() => handleEdit()}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                    <path d="M10.5689 2.48828H3.81267C3.30071 2.48828 2.80972 2.69166 2.44771 3.05367C2.0857 3.41568 1.88232 3.90667 1.88232 4.41863V17.9311C1.88232 18.443 2.0857 18.934 2.44771 19.296C2.80972 19.658 3.30071 19.8614 3.81267 19.8614H17.3251C17.8371 19.8614 18.3281 19.658 18.6901 19.296C19.0521 18.934 19.2555 18.443 19.2555 17.9311V11.1749" stroke="white" stroke-width="2.0372" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16.7231 2.12703C17.1071 1.74306 17.6279 1.52734 18.1709 1.52734C18.7139 1.52734 19.2347 1.74306 19.6186 2.12703C20.0026 2.511 20.2183 3.03177 20.2183 3.57479C20.2183 4.1178 20.0026 4.63858 19.6186 5.02255L10.9195 13.7226C10.6903 13.9516 10.4072 14.1192 10.0962 14.21L7.32328 15.0208C7.24023 15.045 7.15219 15.0465 7.06838 15.025C6.98458 15.0035 6.90809 14.9599 6.84691 14.8987C6.78574 14.8376 6.74214 14.7611 6.72066 14.6773C6.69919 14.5935 6.70065 14.5054 6.72487 14.4224L7.53562 11.6494C7.62685 11.3387 7.7948 11.0559 8.024 10.8271L16.7231 2.12703Z" stroke="white" stroke-width="2.0372" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                    Edit</button>}
                  {!editInput && firstPermissionSettings?.canUpdate && <button className='edit_button cmn_btn' onClick={(e) => handleUpdateProfile(e)}>Update Profile{is_staff_updated?.isLoading && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>}</button>}
                </div>
                <div className='row authWrapper row-gap-3 pt-4'>
                  <div className='col-lg-6'>
                    <label className='d-block form-label' htmlFor="NAME">FirstName</label>
                    {user_details?.isLoading ? <Skeleton height={40} count={1} style={{ borderRadius: '10px' }} /> : <input type="text" placeholder='Name' value={data?.firstName} onChange={(e) => { setData({ ...data, firstName: e.target.value }); setFirstNameError('') }} disabled={editInput} className='form-control' />}
                    {firstNameError && <span className='error text-danger'>{firstNameError}</span>}
                  </div>
                  <div className='col-lg-6'>
                    <label className='d-block form-label' htmlFor="NAME">LastName</label>
                    {user_details?.isLoading ? <Skeleton height={40} count={1} style={{ borderRadius: '10px' }} /> : <input type="text" placeholder='Name' value={data?.lastName} onChange={(e) => { setData({ ...data, lastName: e.target.value }); setLastNameError('') }} disabled={editInput} className='form-control' />}
                    {lastNameError && <span className='error text-danger'>{lastNameError}</span>}
                  </div>
                  <div className='col-lg-6'>
                    <label className='d-block form-label' htmlFor="NAME">Email</label>
                    {user_details?.isLoading ? <Skeleton height={40} count={1} style={{ borderRadius: '10px' }} /> : <input type="email" placeholder='Email' value={data?.email} onChange={(e) => { setData({ ...data, email: e.target.value }); setEmailError('') }} disabled={editInput} className='form-control' />}
                    {emailError && <span className='error text-danger'>{emailError}</span>}
                  </div>
                  <div className='col-lg-6'>
                    <label className='d-block form-label' htmlFor="NAME">Phone Number</label>
                    <div className="w-100">
                      {user_details?.isLoading ? <Skeleton height={40} count={1} style={{ borderRadius: '10px' }} /> : <PhoneInput
                        defaultCountry="us"
                        value={phone}
                        onChange={(phone) => handleValidatePhone(phone)}
                        disabled={editInput}
                      />}
                      {phoneError && <span className='error text-danger'>{phoneError}</span>}
                    </div>
                  </div>
                </div>
                <div className='change_password mt-4 border-top mt-3 pt-3'>
                  <h4>Change Password</h4>
                  <p>You can reset or change your password <br /> by clicking here</p>
                  <div className='row authWrapper row-gap-3'>
                    <div className='col-lg-6'>
                      <label className='d-block form-label' htmlFor="NAME">Current Password</label>
                      <input
                        type="password"
                        autocomplete="new-password"
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                          setCurrentPasswordError('');
                        }}
                        placeholder="Enter Current Password"
                        className="form-control"
                      />
                      {currentPasswordError && <span className='error text-danger'>{currentPasswordError}</span>}
                    </div>
                    <div className='col-lg-6'>
                      <label className='d-block form-label' htmlFor="NAME">New Password</label>

                      <input type="password" autoComplete={false} value={newPassword} onChange={(e) => { setNewPassword(e.target.value); setNewPasswordError('') }} placeholder='Enter New Password' className='form-control' />
                      {newPasswordError && <span className='error text-danger'>{newPasswordError}</span>}
                    </div>
                    <div className='col-lg-6'>
                      <label className='d-block form-label' htmlFor="NAME">Confirm Password</label>
                      <input type="password" autoComplete={false} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError('') }} placeholder='Enter New Password' className='form-control' />
                      {confirmPasswordError && <span className='error text-danger'>{confirmPasswordError}</span>}
                    </div>
                    <div className='col-lg-6 user_profile '>
                      <label className='d-block form-label opacity-0' htmlFor="NAME">Confirm Password</label>
                      {firstPermissionSettings?.canUpdate && <button className='cmn_btn' onClick={(e) => handleChangePassword(e)}>Change Password{is_Password_changed?.isLoading && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>}</button>}
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Pane>
            {/* <Tab.Pane eventKey="second">
              <div className=''>
                <div className='settings_head border-bottom mb-3'>
                  <h3>Notification</h3>
                  <p>Customize Your Notification Settings</p>
                </div>

                <div className='d-flex gap-2 notification_card mb-3'>
                  <h5 className='flex-grow-1'>Pop up notification on desktop</h5>
                  <Form>
                    <Form.Check // prettier-ignore
                      type="switch"
                      id="custom-switch"
                    />
                  </Form>
                </div>
                <div className='d-flex gap-2 notification_card mb-3'>
                  <h5 className='flex-grow-1'>Turn on all chat notification</h5>
                  <Form>
                    <Form.Check // prettier-ignore
                      type="switch"
                      id="custom-switch"
                    />
                  </Form>
                </div>
                <div className='d-flex gap-2 notification_card mb-3'>
                  <div className='flex-grow-1'>
                    <h5>Reminders</h5>
                    <p className='mb-0'>These are notification to remind you of updates <br />
                      you might have missed.</p>
                  </div>
                  <Form>
                    <Form.Check // prettier-ignore
                      type="switch"
                      id="custom-switch"
                    />
                  </Form>
                </div>
                <div className='d-flex gap-2 notification_card mb-3'>
                  <div className='flex-grow-1'>
                    <h5>Language</h5>
                    <p className='mb-0'>Customize how you theams looks on your <br /> device</p>
                  </div>
                  <select name="" id="" className='language_selection'>
                    <option value="" >Language</option>
                  </select>
                </div>

              </div>
            </Tab.Pane> */}
          </Tab.Content>

        </div>
      </Tab.Container >
    </div >
  )
}

export default SettingsComponents