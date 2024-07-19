import { useState, useEffect } from "react";

export function useOutsideClick(ref) {
  const [isVisibility, setIsVisibility] = useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return [isVisibility, setIsVisibility];
}

// EJEMPLO

// export function PostCommentAsideOwnBtn() {
//     const ref = useRef(null);
//     const [isVisibility, setIsVisibility] = useOutsideClick(ref); // Usa el custom hook
  
//     const handleVisibility = () => {
//       setIsVisibility(!isVisibility);
//     };
  
//     return (
//       <div className="post-comment-aside" ref={ref}>
//         <Button className={"btn delete-post"} onClick={handleVisibility}>
//           <SvgEllipsis />
//         </Button>
  
//         <div
//           className={`post-comment-aside-own ${isVisibility ? `visibility` : ``}`}
//         >
//           <Button className={"--btn-edit-comment"} onClick={handleClick}>
//             Editar
//           </Button>
//           <Button className={"--btn-delete-comment"} onClick={handleClick}>
//             Eliminar
//           </Button>
//         </div>
//       </div>
//     );
//   }
  