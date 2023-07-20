import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPhotos, getPhotos } from "../../store/photo";
import { getuserPhotos } from "../../store/user";
import createPost from "./createPost.png";
import "./Photoform.css";

function PhotoForm({ setShowModal }) {
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [reveal, setReveal] = useState(false);
  const images = [
    "https://images.unsplash.com/photo-1573583182490-a532db7377b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1624893578106-a98840591afc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1543332164-6e82f355badc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  ];

  const dispatch = useDispatch();

  let username = useSelector((state) => state.session?.user?.username);
  let userId = useSelector((state) => state.session?.user?.id);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("user_id", userId);
    formData.append("caption", caption);
    if (errors.length > 0) {
      setShowErrors(true);
      return;
    }
    if (errors.length === 0) {
      const data = await dispatch(postPhotos(formData));
      if (data) {
        let error = [];
        error.push(data);
        setErrors(error);
        setShowErrors(true);

        return;
      }

      setCaption("");
      setImage(null);
      setShowModal(false);
      setShowErrors(false);
      await dispatch(getPhotos());
      await dispatch(getuserPhotos(parseInt(userId)));
    }
  };
  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    const error = [];
    if (caption.length > 2200)
      error.push("Caption length must be less than 2,2000 characters");
    if (caption.length < 1)
      error.push("You must have at least 1 character in the caption field");
    if (image === null)
      error.push("You must select one of the images provided");

    if (!caption.replace(/\s/g, "").length)
      error.push("Please provide a caption that does not only contain spaces");
    setErrors(error);
  }, [caption, image]);

  return (
    <>
      <div className="PhotoFormDiv-navigation-bar">
        <form className="photoform" onSubmit={onSubmit}>
          <h2 className="postYourPhotosh2">Post Your Photo!</h2>
          {showErrors ? (
            errors.length > 0 ? (
              <>
                <h4>Please Fix These Errors:</h4>
                <ul className="errorsArray">
                  {errors.map((error) => {
                    return (
                      <>
                        <li className="PhotoFormErrorItem" key={error}>
                          {error}
                        </li>
                      </>
                    );
                  })}
                </ul>
              </>
            ) : null
          ) : null}
          <input
            className="caption-input-value-form"
            name="caption"
            type="text"
            required
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={`Add a photo as ${username}...`}
          />
          {caption.length > 2200 ? (
            <p className="number-length-comments" style={{ color: "red" }}>
              {caption.length} / 2200
            </p>
          ) : (
            <p className="number-length-comments">{caption.length} / 2200</p>
          )}
          <div className="bottom-container">
            <div className="btn-div">
              <button
                className="select-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setReveal(!reveal);
                }}
              >
                Select Photo
              </button>

              {/* <input
                        className='file-input-value-form'
                        name="image"
                        type="file"
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        onChange={updateImage}

                      /> */}

              <button className="post-submit-button-form" type="submit">
                Submit
              </button>
            </div>
            {reveal ? (
              <div className="images-container">
                {images.map((item) => {
                  return (
                    <img
                      className={`${
                        image === item ? "selected" : ""
                      } select-image`}
                      onClick={() => {
                        setImage(item);
                      }}
                      src={item}
                      alt="select_image"
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
}

export default PhotoForm;
