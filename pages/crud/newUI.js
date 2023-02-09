import React, { useState, useEffect } from "react";
import Index from ".";
import style from "../../styles/crud.module.css";
import { useRouter } from "next/router";
const newUI= () => {
  const [room, setRoom] = useState({
    name: "",
    description: "",
    policies: "",
    services: "",
    ubication: "",
    availability: "",
  });
  const router = useRouter();

  const handlerChange = ({ target: { name, value } }) => {
    setRoom({ ...room, [name]: value });
  };

  const createRoom = async (room) => {
    await fetch("http://localhost:3000/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    });
  };

  const updateRoom = async (id, room) => {
    await fetch("http://localhost:3000/api/rooms/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (router.query.id) {
        await updateRoom(router.query.id, room);
      } else {
        await createRoom(room);
      }
      router.push("/crud");
    } catch (error) {
      console.log(error);
    }
  };

  const loadRoom = async (id) => {
    const response = await fetch("http://localhost:3000/api/rooms/" + id);
    const room = await response.json();
    setRoom({ name: room.room_name, description: room.description });
  };
  useEffect(() => {
    if (router.query.id) loadRoom(router.query.id);
  }, [router.query]);

  return (
    <Index>
      <div className={style.container_crud}>
        <form onSubmit={handleSubmit} method="post" className="form-user">
          <h1 className="container__title">Registrar Salon</h1>
          <div className="form-user-input">
            <label htmlFor="name" className="container__label">
              name:
            </label>
            <input
              name="name"
              type="text"
              className="container__input"
              onChange={handlerChange}
              value={room.name}
            />
            <label htmlFor="description" className="container__label">
              description:
            </label>
            <textarea
              name="description"
              rows={1}
              placeholder="Write a description"
              onChange={handlerChange}
              value={room.description}
            ></textarea>
            <label htmlFor="policies" className="container__label">
              policies:
            </label>
            <input
              name="policies"
              type="text"
              className="container__input"
              onChange={handlerChange}
            />
            <label htmlFor="services" className="container__label">
              services:
            </label>
            <input
              name="services"
              type="text"
              className="container__input/"
              onChange={handlerChange}
            />
            <label htmlFor="ubication" className="container__label">
              ubication:
            </label>
            <input
              name="ubication"
              type="text"
              className="container__input"
              onChange={handlerChange}
            />
            <label htmlFor="availability" className="container__label">
              availability:
            </label>
            <input
              name="availability"
              type="text"
              className="container__input"
              onChange={handlerChange}
            />
          </div>
          <input className="container__submit" type="submit" value="Insertar" />
        </form>
        <style jsx>{`
          .form-user {
            background-color: var(--secundary-color);
            border: 2px solid var(--primary-color);
            box-shadow: 2px 2px 10px var(--primary-color-M);
            height: auto;
            width: 500px;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: rgb(0, 0, 0);
            padding: 20px;
          }
          .form-user-input {
            height: 390px;
            width: 490px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
          }
          .form-user-input1 {
            height: 410px;
            width: 490px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            margin-left: 50px;
          }
          .form-user-input-Con {
            height: 410px;
            width: 490px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 200px;
          }
          .form-user-input-ing-consul {
            height: 310px;
            width: 390px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 0;
            margin-left: 170px;
          }
          .form-user-input-citas {
            height: 290px;
            width: 490px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 0px;
          }

          .form-user-input-caja {
            height: 220px;
            width: 490px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 50px;
            margin-left: 20px;
            margin-bottom: 50px;
          }
          .container1 h1 {
            text-align: center;
            font-size: 35px;
            font-weight: bold;
            margin: 10px;
          }

          .container1 label {
            font-size: 18px;
            font-weight: bold;
            margin: 7px;
            text-align: left;
          }

          .form-user input[type="text"],
          input[type="password"],
          textarea {
            border: 0;
            margin-left: 3px;
            background: var(--secundary-color);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            text-align: center;
            border: 2px solid var(--primary-color);
            width: 190px;
            outline: none;
            color: black;
            border-radius: 7px;
            transition: 0.25s;
          }

          .form-user .container__submit {
            margin-top: 15px;
            border: 0;
            background-color: rgb(227, 42, 76);
            border-radius: 10px;
            border: 2px solid rgb(227, 42, 76);
            box-shadow: 2px 2px 10px rgb(227, 42, 76);
            color: rgb(255, 255, 255);
            font-size: 20px;
            font-weight: bold;
            padding: 10px 10px;
            width: 400px;
          }

          .form-user .container__submit:hover {
            background-color: rgb(255, 255, 255);
            color: black;
          }
        `}</style>
      </div>
    </Index>
  );
};

export default newUI;
