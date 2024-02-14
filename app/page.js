import  {ImStatsBars} from 'react-icons/im'

export default function Home() {
  return (
    <header className="flex items-center justify-between">
      { /* User information */ }
      <div className="flex items-center gap-2">
        { /* User avatar */ }
        <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src= "/eleah.jpg" 
            alt="User avatar" 
          />
        </div>
        { /* User name */ }
        <small>Hi, Eleah!</small>
      </div>
      { /* User navigation */ }
      <nav className="flex items-center gap-2">
        <div>
          <ImStatsBars />
        </div>
        <div>
          Logout Button
        </div>
      </nav>
    </header>
  );
}
