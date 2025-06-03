import logoDark from '@/assets/images/logo-dark.png';
import spc from '@/assets/images/spc.png';
import logoSm from '@/assets/images/logo-sm.png';
import Image from 'next/image';
import Link from 'next/link';
const LogoBox = () => {
  return <div className="logo-box">
      <Link href="/" className="logo-dark">
        <Image src={spc} width={28} height={26} className="logo-sm" alt="logo sm" />
        <Image src={spc} height={120} width={112} 
        // className="logo-lg"
         alt="logo dark" />
      </Link>
      <Link href="/" className="logo-light">
        <Image src={spc} width={28} height={26} className="logo-sm" alt="logo sm" />
        <Image src={spc} height={120} width={112}
        // className="logo-lg" 
        alt="logo light" />
      </Link>
    </div>;
};
export default LogoBox;