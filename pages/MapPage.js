import Map from '../components/MyMap'
import { useRouter } from 'next/router';

export default function MapPage() {
  const router = useRouter();

  return (
    <div>
      <Map TypeMap = {router.query.Information}/>     
    </div>
  )
}
