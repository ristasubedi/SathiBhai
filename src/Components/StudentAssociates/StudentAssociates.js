import './StudentAssociates.css';
import logos from './logos/logos'
import {Link} from 'react-router-dom';

function StudentAssociates() {


  return (
    <div className="StudentAssociates">
      <h1> Students Associations </h1>
      <div className="assocationLogo">
        {logos.map((item, index) => (
          <div className="association" key={index}>
            <Link to="/" >
              <img src={item.logo} alt={item.name} className="logos" />
              <p>{item.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentAssociates;
