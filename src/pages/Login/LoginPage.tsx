import { ModulesRoutes } from "../../router/modules-routes";
import Form from "../../components/FormLogin/Form";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "../Login/Login.module.css";

function LoginPage() {
  return (
    <div className={styles.LoginPage}>
      <Header />
      <Form />
      <Footer />
    </div>
  );
}

export default LoginPage;
