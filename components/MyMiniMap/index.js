import dynamic from "next/dynamic";

const MyMiniMap = dynamic(() => import(`./MiniMap`),{ ssr: false });

export default MyMiniMap;