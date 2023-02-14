import classes from "../../styles/header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  const handleClickHotel = () => {
    router.push({
      pathname: "/MapPage",
      query: { Information: "Hoteles" },
    });
  };

  const handleClickRestaurante = () => {
    router.push({
      pathname: "/MapPage",
      query: { Information: "Restaurantes" },
    });
  };

  const handleClickAtraccion = () => {
    router.push({
      pathname: "/MapPage",
      query: { Information: "Atracciones" },
    });
  };

  return (
    <header className="flex flex-col">
      {/*  */}

      <div className="flex flex-row items-center justify-between  p-3 w-full bg-[#f45690]">
        <div className="flex items-center  bg-[#f45690]">
          {/* <div>
          <Image
            src="/logo.jpeg"
            alt="Picture of the author"
            width={100}
            height={100}
          />
          </div> */}
          <div>
          <h1 className="text_logo font-normal text-4xl text-white tracking-wide">I Experience</h1>
          </div>
        </div>

        <div className={classes.MenuDiv}>
       
          <div className="xl:hidden lg:hidden md:hidden sm:flex flex cursor-pointer">
            <svg
              className="w-10 h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>
          {/* <div className="flex justify-start items-center xl:w-3/12 lg:w-4/12 md:w-5/12 sm:w-10/12 w-10/12 h-full ml-2">
            <input
              type="text"
              className={classes.inputRounded}
              placeholder="Buscador"
            />
            <IconButton variant="contained" size="small" color="inherit">
              <SearchIcon />
            </IconButton>
          </div> */}
          <div className={classes.OptionMenu}>
            
            <div className={classes.ButtonOption} onClick={handleClickHotel}>
              Hoteles
            </div>
            <div
              className={classes.ButtonOption}
              onClick={handleClickAtraccion}
            >
              Atracciones
            </div>
            <div
              className={classes.ButtonOption}
              onClick={handleClickRestaurante}
            >
              Restaurantes
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
