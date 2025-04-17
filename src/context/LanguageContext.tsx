import React, { createContext, useContext, useEffect, useState } from "react";

// Languages we support
type Language = "en" | "fr" | "es" | "de" | "zh";

// Translation keys
type TranslationKey = 
  | "dashboard" 
  | "profile" 
  | "settings" 
  | "logout" 
  | "signin" 
  | "signup" 
  | "admin" 
  | "charts"
  | "welcome"
  | "email"
  | "password"
  | "submit"
  | "forgotPassword"
  | "newAccount"
  | "alreadyHaveAccount"
  | "products"
  | "productsDescription";

// Translation dictionaries
const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    dashboard: "Dashboard",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    signin: "Sign In",
    signup: "Sign Up",
    admin: "Admin",
    charts: "Charts",
    welcome: "Welcome back",
    email: "Email",
    password: "Password",
    submit: "Submit",
    forgotPassword: "Forgot password?",
    newAccount: "Create new account",
    alreadyHaveAccount: "Already have an account?",
    products: "Our Products",
    productsDescription: "Explore our range of premium solutions"
  },
  fr: {
    dashboard: "Tableau de bord",
    profile: "Profil",
    settings: "Paramètres",
    logout: "Déconnexion",
    signin: "Connexion",
    signup: "S'inscrire",
    admin: "Admin",
    charts: "Graphiques",
    welcome: "Bienvenue",
    email: "E-mail",
    password: "Mot de passe",
    submit: "Soumettre",
    forgotPassword: "Mot de passe oublié?",
    newAccount: "Créer un nouveau compte",
    alreadyHaveAccount: "Vous avez déjà un compte?",
    products: "Nos Produits",
    productsDescription: "Découvrez notre gamme de solutions premium"
  },
  es: {
    dashboard: "Panel",
    profile: "Perfil",
    settings: "Ajustes",
    logout: "Cerrar sesión",
    signin: "Iniciar sesión",
    signup: "Registrarse",
    admin: "Admin",
    charts: "Gráficos",
    welcome: "Bienvenido de nuevo",
    email: "Correo electrónico",
    password: "Contraseña",
    submit: "Enviar",
    forgotPassword: "¿Olvidó su contraseña?",
    newAccount: "Crear nueva cuenta",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    products: "Nuestros Productos",
    productsDescription: "Explore nuestra gama de soluciones premium"
  },
  de: {
    dashboard: "Dashboard",
    profile: "Profil",
    settings: "Einstellungen",
    logout: "Abmelden",
    signin: "Anmelden",
    signup: "Registrieren",
    admin: "Admin",
    charts: "Diagramme",
    welcome: "Willkommen zurück",
    email: "E-Mail",
    password: "Passwort",
    submit: "Absenden",
    forgotPassword: "Passwort vergessen?",
    newAccount: "Neues Konto erstellen",
    alreadyHaveAccount: "Haben Sie bereits ein Konto?",
    products: "Unsere Produkte",
    productsDescription: "Entdecken Sie unsere Premium-Lösungen"
  },
  zh: {
    dashboard: "仪表板",
    profile: "个人资料",
    settings: "设置",
    logout: "登出",
    signin: "登录",
    signup: "注册",
    admin: "管理员",
    charts: "图表",
    welcome: "欢迎回来",
    email: "电子邮件",
    password: "密码",
    submit: "提交",
    forgotPassword: "忘记密码？",
    newAccount: "已有账户？",
    products: "我们的产品",
    productsDescription: "探索我们的优质解决方案"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: TranslationKey) => {
    return translations[language][key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
