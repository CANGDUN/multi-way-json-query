import logoWhite from '../assets/logo-white.svg';

export default function HeadNav() {
  return (
    <nav className="flex items-center z-10 w-full bg-amber-600 p-4 drop-shadow-lg">
      <img className="mr-4" src={logoWhite} alt="logo" />
      <span className="text-white font-semibold text-2xl">
        Multiway JSON Query
      </span>
    </nav>
  );
}
