import { useEffect } from "react";
import { createPortal } from "react-dom";

const Loading = (props: { loading: boolean }) => {
  const mount = document.getElementById("loading-root");
  const el = document.createElement("div");

  useEffect((): any => {
    if(mount == null) {
        return <></>
    }
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  if(!props.loading) {
      return <></>
  }

  return createPortal(<>
        <div className="loadingBG" hidden={!props.loading}>
            <div className="loader" />
        </div>
  </>, el)
};

export default Loading;