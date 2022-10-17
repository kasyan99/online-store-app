//if it is outside link - function return this link, but if it link from static folder on server - function return server path

//It is needed for demo

export const checkSrc = (src: string | undefined) => {
  if (src && (src.match("https") || src.match("http"))) {
    return src
  } else {
    return `${process.env.REACT_APP_API_URL}${src}`
  }
}
