import { useState } from "react";
import Form from "../../components/FormLogin/Form";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RecoveryModal from "../../components/shared/Modal/RecoveryModal";
import styles from "./Login.module.css";

function LoginPage() {
  const [isRecoveryVisible, setIsRecoveryVisible] = useState(false);

  const openRecovery = () => setIsRecoveryVisible(true);
  const closeRecovery = () => setIsRecoveryVisible(false);

  return (
    <div className={styles.LoginPage}>
      <Header />
      <Form onOpenRecovery={openRecovery} />
      <RecoveryModal isVisible={isRecoveryVisible} onClose={closeRecovery} />
      <Footer />
    </div>
  );
}

export default LoginPage;
