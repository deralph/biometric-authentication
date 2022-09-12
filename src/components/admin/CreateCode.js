import React, { useState } from "react";
import { fetchRequest } from "../../functions/endpointsRoute";
import styles from "../../styles/createCode.module.css";
// import style from "../../styles/home.module.css";

const Form = ({ attendance, admin }) => {
  const [inputs, setInputs] = useState({
    title: "",
    teacher: "",
    course_code: "",
    class_code: "",
    confirm_course: "",
    confirm_class: "",
  });
  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    return setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      teacher,
      course_code,
      class_code,
      confirm_course,
      confirm_class,
    } = inputs;

    if (
      !title ||
      !teacher ||
      !course_code ||
      !class_code ||
      !confirm_course ||
      !confirm_class
    ) {
      alert("enter all inputs");
    } else if (course_code !== confirm_course) {
      alert("enter correct course code");
    } else if (class_code !== confirm_class) {
      alert("enter correct class code");
    }
    const body = { title, teacher, course_code, class_code };
    const { returnData, err } = fetchRequest("post", "class", body);
    if (err) alert("an error occured, try again");
    console.log(returnData, err);
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>create course code</h3>
        <input
          type="text"
          name="title"
          onChange={handleInputs}
          value={inputs.title}
          placeholder="enter class topic"
        />
        <input
          type="text"
          name="teacher"
          onChange={handleInputs}
          value={inputs.teacher}
          placeholder="enter lecturer's name"
        />
        <input
          type="text"
          name="course_code"
          onChange={handleInputs}
          value={inputs.course_code}
          placeholder="enter course code"
        />
        <input
          type="text"
          name="confirm_course"
          onChange={handleInputs}
          value={inputs.confirm_course}
          placeholder="confirm course code"
        />
        <input
          type="text"
          name="class_code"
          onChange={handleInputs}
          value={inputs.class_code}
          placeholder="enter class code"
        />
        <input
          type="text"
          name="confirm_class"
          onChange={handleInputs}
          value={inputs.confirm_class}
          placeholder="confirm class code"
        />
        <input type="submit" value="create" />
      </form>
    </section>
  );
};

export default Form;
