import { useEffect } from "react";
const GoogleTranslator = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <>
      <div id="google_translate_element"></div>
      {/* <h4>Start building your app. Happy Coding!</h4> */}
    </>
  );
};

export default GoogleTranslator;




















// import { useEffect } from "react";

// const GoogleTranslator = () => {
//   useEffect(() => {
//     var addScript = document.createElement("script");
//     addScript.setAttribute(
//       "src",
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//     );
//     document.body.appendChild(addScript);
//     // Define the initialization function within the useEffect hook
//     window.googleTranslateElementInit = function() {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           autoDisplay: false
//         },
//         "google_translate_element"
//       );
//     };
//   }, []);

//   return (
//     <>
//       <div id="google_translate_element"></div>
//     </>
//   );
// };

// export default GoogleTranslator;
