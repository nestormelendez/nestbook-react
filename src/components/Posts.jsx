export function Posts() {
  return (
    <main>
      <article className="content post">
        <header className="post-header">
          <div className="post-header-user">
            <div className="photo-profile-avatar">
              <span>N</span>
            </div>
            <div className="data-user-post">
              <h2>Nestor</h2>
              <h2>hace un mes</h2>
            </div>
            <div className="btn-delete">
              <button className="btn delete-post">X</button>
            </div>
          </div>
        </header>
        <div className="container  post-content">
          <span>Este es el post</span>
          <div className="post-likes">
            <h5>
              <svg
                width="25px"
                height="25px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#0866ff"
                  d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
                />
              </svg>
              10
            </h5>
            <h5>5 Comentarios</h5>
          </div>
        </div>
        <footer className="btns-comment">
          <button className="btn --btn-post btn-like">Me gusta</button>
          <button className="btn --btn-post btn-comment">Comentar</button>
          <button className="btn --btn-post">Compartir</button>
        </footer>
        <article id="container-comment" className="container-comment">
          <span>Aqui va el map de los comentarios</span>
          <div className="post-contents">
            <div className="post-header-user">
              <div className="photo-profile-avatar">
                <span>N</span>
              </div>

              <input
                className="input-comment"
                type="text"
                placeholder="Comentar como Nestor"
              />
              <button className="btn --btn-comment">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="#0084ff"
                    d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </article>
    </main>
  );
}
