// eslint-disable-next-line max-lines-per-function
export const useLoadScript = () => {
  function loadScript(src: string, id: string) {
    if (document.querySelector(`script#${id}`)) return;

    const script = document.createElement('script');

    script.src = src;
    script.async = true;
    script.id = id;

    document.head.appendChild(script);
  }

  return {
    loadScript,
  };
};
