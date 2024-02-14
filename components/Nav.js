//import react icons
import  {ImStatsBars} from 'react-icons/im'

function Nav (){
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
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
            <ImStatsBars className="text-2xl"/>
          </div>
          <div>
            <button className="btn btn-danger">
              Sign Out
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Nav;