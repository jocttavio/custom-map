import dynamic from "next/dynamic";

const MyMap = dynamic(() => import(`./GeneralMap`),{ ssr: false });

export default MyMap;