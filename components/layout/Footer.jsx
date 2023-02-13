import Image from "next/image";
import styles from '../../styles/footer.module.css'
import { useRouter } from 'next/router';

function Footer() {
  const router = useRouter();


  const handleClickHotel = () => {
    router.push({
      pathname: '/MapPage',
      query: { Information: 'Hoteles' },
    });
  };

  const handleClickRestaurante = () => {
    router.push({
      pathname: '/MapPage',
      query: { Information: 'Restaurantes' },
    });
  };

  const handleClickAtraccion = () => {
    router.push({
      pathname: '/MapPage',
      query: { Information: 'Atracciones' },
    });
  };

  return (
    <footer className="flex flex-col w-full">
      <div className="flex flex-row justify-center items-center xl:h-24 h-28 bg-[#3f3e3e] text-[#CCCCCC]">
       
        <div className="flex flex-row justify-center items-center w-7/12">
          <Image src="/logo.jpeg"
            alt="Picture of the author"
            width={150}
            height={150}
          />
          <p>I Experience</p>

        </div>

        <div className="flex justify-center text-center w-5/12">
          <p>Lugar de la escuela</p>
        </div>

      </div>

      <div className=" flex flex-row justify-center items-center xl:h-28 lg:h-28 md:h-28 sm:h-32 h-36 bg-[#292929] text-[#CCCCCC]">
        
        <div className="flex justify-center text-center xl:w-5/12 lg:w-5/12 md:w-5/12 sm:w-4/12 w-7/12">
          <p>Derechos Reservados © 2023-2024</p>
        </div>

        <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col items-center justify-end xl:w-7/12 lg:w-7/12 md:w-7/12 sm:w-8/12 w-5/12">
          <div className={styles.ButtonOption} onClick={handleClickHotel}>Hoteles</div>
          <div className={styles.ButtonOption} onClick={handleClickAtraccion}>Atracciones</div>
          <div className={styles.ButtonOption} onClick={handleClickRestaurante}>Restaurantes</div>
        </div>

      </div>

    </footer>
  )
}

export default Footer