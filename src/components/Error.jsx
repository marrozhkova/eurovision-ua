import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navi = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navi("/", { replace: true });
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="error page-transition">
      <div className="error-text">404</div>
      <div className="error-text ">NOT FOUND</div>
      <div className="countdown">{count}</div>
    </div>
  );
}

export default Error;
