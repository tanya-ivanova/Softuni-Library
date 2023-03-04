import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import {languages} from '../../languages/languages';
import styles from './Home.module.css';


const Home = ({error}) => {
    const {language} = useContext(LanguageContext);

    if(error) {
        window.location.reload(true);
    }

    return (
        <section className={styles["home-page"]}>
            <div className={styles["img-wrapper"]}>
                <div>{languages.whyReading[language]}</div>
                <img alt="library" src="data:image/jpeg;base64,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" />
            </div>

            <div className={styles["paragraphs-wrapper"]}>
                <div className={styles["home-paragraph"]}>
                    <h1>{languages.strengthensYourBrain[language]}</h1>                    
                    <p>{languages.strengthensYourBrainParagraph[language]}</p>
                </div>

                <div className={styles["home-paragraph"]}>
                    <h1>{languages.increasesAbilityEmpathize[language]}</h1>
                    <p>{languages.increasesAbilityEmpathizeParagraph[language]}</p>                    
                </div>

                <div className={styles["home-paragraph"]}>
                    <h1>{languages.buildsVocabulary[language]}</h1>
                    <p>{languages.buildsVocabularyParagraph[language]}</p>                    
                </div>

                <div className={styles["home-paragraph"]}>
                    <h1>{languages.preventCognitiveDecline[language]}</h1>
                    <p>{languages.preventCognitiveDeclineParagraph[language]}</p>
                </div>

                <div className={styles["home-paragraph"]}>
                    <h1>{languages.reducesStress[language]}</h1>
                    <p>{languages.reducesStressParagraph[language]}</p>
                </div>
            </div>
        </section>
    );
}

export default Home;
