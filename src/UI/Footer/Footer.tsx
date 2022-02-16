import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p className={classes.footnote}>
        Ecommerce created during Wizeline’s Academy React Bootcamp
      </p>
    </footer>
  );
};

export default Footer;
