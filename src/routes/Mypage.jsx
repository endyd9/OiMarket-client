import { useEffect } from "react";

const Mypage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1>아직 아무것도 엄따</h1>
    </div>
  );
};

export default Mypage;
