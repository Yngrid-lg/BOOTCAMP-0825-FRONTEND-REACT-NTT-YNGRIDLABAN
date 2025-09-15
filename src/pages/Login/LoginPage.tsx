import { useForm } from 'react-hook-form'
import Form from "../../components/FormLogin/Form";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


function LoginPage() {
  
  return (
    <div>
      <Header/>
      <Form />
      <Footer/>
    </div>
  );
}

export default LoginPage

